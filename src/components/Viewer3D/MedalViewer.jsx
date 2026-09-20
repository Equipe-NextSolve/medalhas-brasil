'use client';

import { useState, useEffect, useRef, Suspense, useMemo, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { X, RotateCcw, ShoppingCart } from 'lucide-react';

const RIBBON_COLORS = [
  { name: 'Azul Royal', hex: '#1B3A8C' },
  { name: 'Vermelho',   hex: '#CC2200' },
  { name: 'Verde',      hex: '#1A6B3A' },
  { name: 'Dourado',    hex: '#C8971A' },
  { name: 'Preto',      hex: '#111111' },
];

const MEDALS = [
  {
    id: 1,
    name: 'Medalha Bronze',
    glb: '/medalhas3d-v3/medalha-bronze.glb',
    desc: 'Medalha de bronze com acabamento premium, ideal para premiações de 3º lugar e eventos esportivos. Personalização total de fita e gravação.',
    material: 'Liga de Zinco',
    acabamento: 'Bronze polido',
    diametro: '70 mm',
  },
  {
    id: 2,
    name: 'Medalha Prata',
    glb: '/medalhas3d-v3/medalha-prata.glb',
    desc: 'Medalha de prata com brilho refinado, perfeita para 2º lugar em campeonatos e competições corporativas. Alta durabilidade e detalhes precisos.',
    material: 'Liga de Zinco',
    acabamento: 'Prata brilhante',
    diametro: '70 mm',
  },
  {
    id: 3,
    name: 'Medalha Ouro',
    glb: '/medalhas3d-v3/medalha-ouro.glb',
    desc: 'Medalha de ouro com acabamento dourado de alta qualidade, símbolo máximo de conquista. Destaque total para os campeões do seu evento.',
    material: 'Liga de Zinco',
    acabamento: 'Ouro reluzente',
    diametro: '70 mm',
  },
];

// ─── texture recolor helpers ────────────────────────────────────────────────

function rgbToHsv(r, g, b) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  const s = max > 0 ? d / max : 0;
  let h = 0;
  if (d > 0) {
    if (r === max)      h = ((g - b) / d) % 6;
    else if (g === max) h = (b - r) / d + 2;
    else                h = (r - g) / d + 4;
    h /= 6;
    if (h < 0) h += 1;
  }
  return { h, s, v: max };
}

function hsvToRgb(h, s, v) {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const lut = [[v,t,p],[q,v,p],[p,v,t],[p,q,v],[t,p,v],[v,p,q]];
  const [r, g, b] = lut[i % 6];
  return { r, g, b };
}

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16) / 255,
    g: parseInt(hex.slice(3, 5), 16) / 255,
    b: parseInt(hex.slice(5, 7), 16) / 255,
  };
}

function recolorRibbonCanvas(srcImage, newHex) {
  const W = srcImage.width || srcImage.naturalWidth;
  const H = srcImage.height || srcImage.naturalHeight;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(srcImage, 0, 0);
  const imgData = ctx.getImageData(0, 0, W, H);
  const data = imgData.data;
  const newRgb = hexToRgb(newHex);
  const newHsv = rgbToHsv(newRgb.r, newRgb.g, newRgb.b);
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 10) continue;
    const r = data[i] / 255, g = data[i+1] / 255, b = data[i+2] / 255;
    const { h, s, v } = rgbToHsv(r, g, b);
    if (h > 0.50 && h < 0.82 && s > 0.12 && v > 0.04) {
      const rgb = hsvToRgb(newHsv.h, newHsv.s, v);
      data[i]   = Math.round(rgb.r * 255);
      data[i+1] = Math.round(rgb.g * 255);
      data[i+2] = Math.round(rgb.b * 255);
    }
  }
  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

const recolorCache = new Map();
function getRecoloredTexture(originalMat, newHex) {
  const key = `${originalMat.uuid}:${newHex}`;
  if (recolorCache.has(key)) return recolorCache.get(key);
  const srcImage = originalMat.map?.image;
  if (!srcImage) return null;
  const canvas = recolorRibbonCanvas(srcImage, newHex);
  const tex = new THREE.CanvasTexture(canvas);
  if (originalMat.map.colorSpace !== undefined) tex.colorSpace = originalMat.map.colorSpace;
  tex.flipY     = originalMat.map.flipY;
  tex.wrapS     = originalMat.map.wrapS;
  tex.wrapT     = originalMat.map.wrapT;
  tex.minFilter = originalMat.map.minFilter;
  tex.magFilter = originalMat.map.magFilter;
  recolorCache.set(key, tex);
  return tex;
}

// ─── 3-D medal model ────────────────────────────────────────────────────────

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
    return { modelScale: s, modelOffset: [-center.x*s, -center.y*s, -center.z*s] };
  }, [scene]);

  const cloned = useMemo(() => scene.clone(true), [scene]);
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
          name.includes('fita') || name.includes('ribbon') || name.includes('strap') ||
          name.includes('fabric') || name.includes('lanyard') || name.includes('band') ||
          name.includes('tape') || name.includes('cord') || name.includes('tec') ||
          (mat.color && mat.color.b > 0.15 && mat.color.b > mat.color.r * 1.5 && mat.color.g < 0.6);
        if (!isRibbon) return;
        const originalMat = mat;
        const clonedMat   = mat.clone();
        if (mat.map?.image) {
          const tex = getRecoloredTexture(originalMat, ribbonColor);
          if (tex) { clonedMat.map = tex; clonedMat.needsUpdate = true; }
          ribbonMatsRef.current.push({ mat: clonedMat, originalMat, isTextured: true });
        } else {
          clonedMat.color.set(ribbonColor);
          ribbonMatsRef.current.push({ mat: clonedMat, originalMat, isTextured: false });
        }
        cloned.traverse(o => {
          if (!o.isMesh) return;
          if (Array.isArray(o.material)) o.material = o.material.map(m2 => m2 === mat ? clonedMat : m2);
          else if (o.material === mat) o.material = clonedMat;
        });
      });
    });
  }, [cloned]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    ribbonMatsRef.current.forEach(({ mat, originalMat, isTextured }) => {
      if (isTextured) {
        const tex = getRecoloredTexture(originalMat, ribbonColor);
        if (tex) { mat.map = tex; mat.needsUpdate = true; }
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

// ─── loading overlay ──────────────────────────────────────────────────────────

function CardLoader() {
  return (
    <div
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 14, zIndex: 10,
        background: 'radial-gradient(ellipse at center, #ffffff 0%, #f0f0f0 100%)',
        borderRadius: 'inherit',
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        border: '3px solid rgba(217,153,35,0.2)',
        borderTopColor: '#D99923',
        animation: 'spin 0.85s linear infinite',
      }} />
      <p style={{ color: '#aaa', fontSize: 11, fontFamily: 'sans-serif', letterSpacing: '0.08em' }}>
        Carregando modelo…
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// fires once when Suspense resolves and the model mounts
function ModelReady({ onReady }) {
  useEffect(() => { onReady(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

// ─── shared canvas component ─────────────────────────────────────────────────

function MedalCanvas({ medal, ribbonColor, autoRotate = false, zoom = false, interactive = true }) {
  const [ready, setReady] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!ready && <CardLoader />}
      <Canvas
        camera={{ position: [0, 0, 5], fov: zoom ? 38 : 45 }}
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
          <ModelReady onReady={() => setReady(true)} />
        </Suspense>
        <OrbitControls
          enabled={interactive}
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.06}
          rotateSpeed={0.75}
          autoRotate={autoRotate}
          autoRotateSpeed={1.2}
        />
      </Canvas>
    </div>
  );
}

// ─── detail modal ─────────────────────────────────────────────────────────────

function MedalDetailModal({ medal, onClose }) {
  const [ribbonColor, setRibbonColor] = useState(RIBBON_COLORS[0].hex);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-5xl rounded-3xl overflow-hidden flex flex-col md:flex-row"
        style={{ background: '#ffffff', maxHeight: '90vh', border: '1px solid #E0E0E0', boxShadow: '0 24px 60px rgba(0,0,0,0.18)' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full p-2 transition-colors hover:bg-black/08"
          style={{ color: '#999' }}
        >
          <X size={20} />
        </button>

        {/* LEFT — 3-D viewer */}
        <div
          className="flex-1 flex items-center justify-center"
          style={{
            minHeight: 420,
            background: 'radial-gradient(ellipse at center, #ffffff 0%, #f0f0f0 100%)',
            borderRight: '1px solid #E8E8E8',
          }}
        >
          <div style={{ width: '100%', height: 460 }}>
            <MedalCanvas medal={medal} ribbonColor={ribbonColor} autoRotate={false} zoom />
          </div>
        </div>

        {/* RIGHT — product info */}
        <div className="w-full md:w-[360px] flex flex-col justify-between p-8 overflow-y-auto" style={{ background: '#fff' }}>
          {/* Title */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#D99923' }}>
              Visualizador 3D
            </p>
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#111' }}>
              {medal.name}
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#777' }}>
              {medal.desc}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 mb-7">
              {[
                ['Material', medal.material],
                ['Acabamento', medal.acabamento],
                ['Diâmetro', medal.diametro],
                ['Fita', 'Personalizável'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl px-4 py-3" style={{ background: '#F5F5F7', border: '1px solid #E8E8E8' }}>
                  <p className="text-[10px] font-semibold tracking-widest uppercase mb-0.5" style={{ color: '#aaa' }}>{label}</p>
                  <p className="text-sm font-medium" style={{ color: '#222' }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Ribbon color picker */}
            <div className="mb-7">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#aaa' }}>
                Cor da Fita
              </p>
              <div className="flex gap-3">
                {RIBBON_COLORS.map((rc) => {
                  const isActive = ribbonColor === rc.hex;
                  return (
                    <div key={rc.hex} style={{ position: 'relative', width: 30, paddingBottom: 16 }}>
                      <button
                        onClick={() => setRibbonColor(rc.hex)}
                        title={rc.name}
                        className="rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
                        style={{
                          width: 30, height: 30,
                          backgroundColor: rc.hex,
                          display: 'block',
                          boxShadow: isActive
                            ? `0 0 0 2px #fff, 0 0 0 4px ${rc.hex}, 0 4px 12px ${rc.hex}55`
                            : '0 1px 4px rgba(0,0,0,0.15)',
                        }}
                      />
                      <span style={{
                        position: 'absolute',
                        top: 34,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: 9,
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: isActive ? '#444' : 'transparent',
                        userSelect: 'none',
                        whiteSpace: 'nowrap',
                      }}>
                        {rc.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3">
            <a
              href="https://api.whatsapp.com/send/?phone=5585986990288&text=Ol%C3%A1!%20Tenho%20interesse%20em%20solicitar%20um%20or%C3%A7amento%20de%20medalhas."
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold tracking-wide transition-all duration-200 hover:brightness-105 active:scale-95"
              style={{ background: '#D99923', color: '#000' }}
            >
              <ShoppingCart size={16} />
              Solicitar Orçamento
            </a>
            <button
              onClick={onClose}
              className="rounded-full py-3 text-sm font-medium transition-colors hover:bg-black/5"
              style={{ color: '#999', border: '1px solid #E8E8E8' }}
            >
              Voltar ao visualizador
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function MedalViewer() {
  const [activeMedal, setActiveMedal] = useState(null);
  const handleOpen  = useCallback((medal) => setActiveMedal(medal), []);
  const handleClose = useCallback(() => setActiveMedal(null), []);

  return (
    <>
      {activeMedal && (
        <MedalDetailModal medal={activeMedal} onClose={handleClose} />
      )}

      <div
        className="min-h-screen"
        style={{ background: 'linear-gradient(160deg, #f0f0f5 0%, #e8e8ee 100%)' }}
      >
        <div style={{ padding: '170px 3rem 4rem' }}>
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#D99923' }}>
              Personalização em tempo real
            </p>
            <h1 className="text-5xl font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#111' }}>
              Visualizador <span style={{ color: '#D99923' }}>3D</span>
            </h1>
            <p className="text-sm" style={{ color: '#999' }}>
              Clique em uma medalha para ver os detalhes e personalizar a cor da fita
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
            {MEDALS.map((medal) => (
              <div key={medal.id} className="flex flex-col group">
                <button
                  onClick={() => handleOpen(medal)}
                  className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 group-hover:scale-[1.03] group-hover:-translate-y-1 active:scale-[0.98]"
                  style={{
                    height: 400,
                    border: '1px solid rgba(255,255,255,0.8)',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f8 100%)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
                  }}
                >
                  <MedalCanvas medal={medal} ribbonColor={RIBBON_COLORS[0].hex} autoRotate={false} interactive={false} />
                </button>
                <div className="text-center mt-5">
                  <p
                    className="font-bold text-lg mb-1"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: '#111' }}
                  >
                    {medal.name}
                  </p>
                  <p className="text-xs" style={{ color: '#bbb' }}>Clique para personalizar →</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
