'use client';

import { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const RIBBON_COLORS = [
  { name: 'Azul Royal', hex: '#1B3A8C' },
  { name: 'Vermelho',   hex: '#CC2200' },
  { name: 'Verde',      hex: '#1A6B3A' },
  { name: 'Dourado',    hex: '#C8971A' },
  { name: 'Preto',      hex: '#111111' },
];

const MEDALS = [
  { id: 1, name: 'Medalha Bronze', glb: '/medalhas3d-v3/medalha-bronze.glb' },
  { id: 2, name: 'Medalha Prata',  glb: '/medalhas3d-v3/medalha-prata.glb'  },
  { id: 3, name: 'Medalha Ouro',   glb: '/medalhas3d-v3/medalha-ouro.glb'   },
];

function hexToLinearRGB(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { r, g, b };
}

function rgbToHsv(r, g, b) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  const s = max > 0 ? d / max : 0;
  const v = max;
  let h = 0;
  if (d > 0) {
    if (r === max)      h = ((g - b) / d) % 6;
    else if (g === max) h = (b - r) / d + 2;
    else                h = (r - g) / d + 4;
    h /= 6;
    if (h < 0) h += 1;
  }
  return { h, s, v };
}

function hsvToRgb(h, s, v) {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const mod = i % 6;
  const lut = [
    [v, t, p], [q, v, p], [p, v, t],
    [p, q, v], [t, p, v], [v, p, q],
  ];
  const [r, g, b] = lut[mod];
  return { r, g, b };
}

// Recolor the fabric portion of a ribbon texture.
// Keeps design/text pixels (non-blue-hue) intact.
// Returns a canvas that can be used as a THREE.CanvasTexture.
function recolorRibbonCanvas(srcImage, newHex) {
  const W = srcImage.width || srcImage.naturalWidth;
  const H = srcImage.height || srcImage.naturalHeight;
  const canvas = document.createElement('canvas');
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(srcImage, 0, 0);
  const imgData = ctx.getImageData(0, 0, W, H);
  const data = imgData.data;

  const newRGB = hexToLinearRGB(newHex);
  const newHSV = rgbToHsv(newRGB.r, newRGB.g, newRGB.b);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]     / 255;
    const g = data[i + 1] / 255;
    const b = data[i + 2] / 255;
    const a = data[i + 3];
    if (a < 10) continue; // skip transparent

    const { h, s, v } = rgbToHsv(r, g, b);

    // Fabric: blue/indigo hue (0.50–0.82 = ~180°–295°), meaningful saturation
    const isFabric = h > 0.50 && h < 0.82 && s > 0.12 && v > 0.04;

    if (isFabric) {
      // Keep brightness from original; apply new hue and saturation
      const rgb = hsvToRgb(newHSV.h, newHSV.s, v);
      data[i]     = Math.round(rgb.r * 255);
      data[i + 1] = Math.round(rgb.g * 255);
      data[i + 2] = Math.round(rgb.b * 255);
    }
    // else: leave pixel unchanged (design, metal, etc.)
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

// Cache recolored canvases per [material uuid, color hex] to avoid redundant work
const recolorCache = new Map();

function getRecoloredTexture(originalMat, newHex) {
  const key = `${originalMat.uuid}:${newHex}`;
  if (recolorCache.has(key)) return recolorCache.get(key);

  const srcImage = originalMat.map?.image;
  if (!srcImage) return null;

  const canvas = recolorRibbonCanvas(srcImage, newHex);
  const tex = new THREE.CanvasTexture(canvas);
  // Match encoding of the original texture
  if (originalMat.map.colorSpace !== undefined) {
    tex.colorSpace = originalMat.map.colorSpace;
  }
  tex.flipY       = originalMat.map.flipY;
  tex.wrapS       = originalMat.map.wrapS;
  tex.wrapT       = originalMat.map.wrapT;
  tex.minFilter   = originalMat.map.minFilter;
  tex.magFilter   = originalMat.map.magFilter;
  recolorCache.set(key, tex);
  return tex;
}

function MedalModel({ glbPath, ribbonColor }) {
  const { scene } = useGLTF(glbPath);

  const { modelScale, modelOffset } = useMemo(() => {
    scene.updateWorldMatrix(true, true);
    const box = new THREE.Box3().setFromObject(scene);
    if (box.isEmpty()) return { modelScale: 1, modelOffset: [0, 0, 0] };
    const size   = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const s = maxDim > 0 ? 3 / maxDim : 1;
    return {
      modelScale: s,
      modelOffset: [-center.x * s, -center.y * s, -center.z * s],
    };
  }, [scene]);

  const cloned = useMemo(() => scene.clone(true), [scene]);

  // { mat, originalMat, isTextured }
  const ribbonMatsRef = useRef([]);

  useEffect(() => {
    ribbonMatsRef.current = [];
    const seenMats = new Set();

    cloned.traverse(obj => {
      if (!obj.isMesh) return;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach(mat => {
        if (!mat || seenMats.has(mat.uuid)) return;
        seenMats.add(mat.uuid);

        const name = (mat.name || '').toLowerCase();
        const isRibbon =
          name.includes('fita') ||
          name.includes('ribbon') ||
          name.includes('strap') ||
          name.includes('fabric') ||
          name.includes('lanyard') ||
          name.includes('band') ||
          name.includes('tape') ||
          name.includes('cord') ||
          name.includes('tec') ||
          (mat.color &&
            mat.color.b > 0.15 &&
            mat.color.b > mat.color.r * 1.5 &&
            mat.color.g < 0.6);

        if (!isRibbon) return;

        const originalMat = mat; // keep reference to the shared original (with image data)
        const clonedMat   = mat.clone();

        if (mat.map?.image) {
          // Textured face — apply CPU-side hue replacement on the texture pixels
          const tex = getRecoloredTexture(originalMat, ribbonColor);
          if (tex) {
            clonedMat.map = tex;
            clonedMat.needsUpdate = true;
          }
          ribbonMatsRef.current.push({ mat: clonedMat, originalMat, isTextured: true });
        } else {
          // Solid face — direct color set
          clonedMat.color.set(ribbonColor);
          ribbonMatsRef.current.push({ mat: clonedMat, originalMat, isTextured: false });
        }

        cloned.traverse(o => {
          if (!o.isMesh) return;
          if (Array.isArray(o.material)) {
            o.material = o.material.map(m2 => (m2 === mat ? clonedMat : m2));
          } else if (o.material === mat) {
            o.material = clonedMat;
          }
        });
      });
    });
  }, [cloned]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    ribbonMatsRef.current.forEach(({ mat, originalMat, isTextured }) => {
      if (isTextured) {
        const tex = getRecoloredTexture(originalMat, ribbonColor);
        if (tex) {
          mat.map = tex;
          mat.needsUpdate = true;
        }
      } else {
        mat.color.set(ribbonColor);
        mat.needsUpdate = true;
      }
    });
  }, [ribbonColor]);

  return (
    <group scale={[modelScale, modelScale, modelScale]} position={modelOffset}>
      <primitive object={cloned} />
    </group>
  );
}

function MedalCanvas({ medal, ribbonColor }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={0.9} />
      <directionalLight position={[-3, -2, -4]} intensity={0.25} />
      <pointLight position={[0, 4, 4]} intensity={0.35} />

      <Suspense fallback={null}>
        <Environment preset="studio" />
        <MedalModel glbPath={medal.glb} ribbonColor={ribbonColor} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.75}
        autoRotate
        autoRotateSpeed={1.2}
      />
    </Canvas>
  );
}

export default function MedalViewer() {
  const [ribbonColor, setRibbonColor] = useState(RIBBON_COLORS[0].hex);

  return (
    <div
      className="min-h-screen flex"
      style={{ background: 'radial-gradient(ellipse at top, #1a1a2e 0%, #0D0D0D 70%)' }}
    >
      <div className="flex-1 flex flex-col overflow-hidden" style={{ padding: '170px 2rem 1.5rem' }}>
        <div className="text-center mb-6">
          <h1
            className="text-4xl font-bold text-white mb-2"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Visualizador <span style={{ color: '#D99923' }}>3D</span>
          </h1>
          <p className="text-gray-400 text-sm">
            Arraste para girar as medalhas em todas as direções
          </p>
        </div>

        <div className="flex-1 grid grid-cols-3 gap-6 min-h-0">
          {MEDALS.map((medal) => (
            <div key={medal.id} className="flex flex-col min-h-0">
              <div
                className="flex-1 rounded-2xl overflow-hidden border cursor-grab active:cursor-grabbing"
                style={{
                  borderColor: 'rgba(255,255,255,0.08)',
                  background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.3) 100%)',
                  minHeight: 380,
                }}
              >
                <MedalCanvas medal={medal} ribbonColor={ribbonColor} />
              </div>
              <p
                className="text-center text-white font-semibold mt-4 text-lg tracking-wide"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {medal.name}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 text-sm mt-5">
          Clique e arraste para girar · Os botões laterais alteram a cor da fita
        </p>
      </div>

      <div className="w-[76px] flex flex-col items-center justify-center gap-5 pr-4">
        <div
          className="text-gray-500 text-[10px] font-semibold tracking-widest mb-1 select-none"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          COR DA FITA
        </div>

        {RIBBON_COLORS.map((rc) => {
          const isActive = ribbonColor === rc.hex;
          return (
            <button
              key={rc.hex}
              onClick={() => setRibbonColor(rc.hex)}
              title={rc.name}
              className="rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                width: 44,
                height: 44,
                backgroundColor: rc.hex,
                outline: isActive ? '3px solid #ffffff' : '3px solid rgba(255,255,255,0.15)',
                outlineOffset: 3,
                boxShadow: isActive
                  ? `0 0 16px ${rc.hex}99, 0 0 4px ${rc.hex}`
                  : '0 2px 6px rgba(0,0,0,0.4)',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
