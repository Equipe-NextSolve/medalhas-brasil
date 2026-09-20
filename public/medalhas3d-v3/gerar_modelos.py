import numpy as np, json, struct, shutil, zipfile
from pathlib import Path
from PIL import Image
from scipy.spatial import Delaunay
from matplotlib.path import Path as Poly
ROOT=Path(__file__).parent
SRC=ROOT.parent/'generated_images'
# Coordinates traced on the supplied front photographs; dimensions assumed.
body=np.array([(0.50,.244),(.925,.402),(.932,.43),(.891,.603),(.944,.607),(.99,.635),(.988,.697),(.958,.759),(.962,.808),(.934,.856),(.866,.89),(.796,.891),(.50,.945),(.216,.896),(.133,.889),(.071,.869),(.043,.837),(.036,.783),(.047,.747),(.016,.693),(.012,.65),(.044,.624),(.085,.605),(.12,.61),(.077,.445),(.083,.417)])
ribbon=np.array([(.25,0),(.80,0),(.622,.24),(.36,.24)])
loop=np.array([(.30,.19),(.73,.19),(.745,.30),(.69,.29),(.685,.214),(.335,.214),(.335,.30),(.295,.32)])
files=[('bronze','exec-1026bd41-47ad-47d9-a766-d5ca2543f2ac.png',[.65,.32,.13,1]),('prata','exec-bbb708f8-a144-43e0-816e-2f04fb74e0ef.png',[.7,.72,.75,1]),('ouro','exec-9fc7c137-770a-4682-9ba5-31238ef24d26.png',[.85,.57,.16,1])]
for name,source,color in files:
 im=Image.open(SRC/source).convert('RGB'); w,h=im.size
 doc={'asset':{'version':'2.0','generator':'Medalhas - geometric approximation from front photos'},'scene':0,'scenes':[{'nodes':[0]}],'nodes':[{'mesh':0,'name':'Medalha '+name}],'meshes':[{'primitives':[]}], 'buffers':[{}], 'bufferViews':[], 'accessors':[], 'images':[], 'textures':[{'source':0}], 'samplers':[], 'materials':[{'name':'Foto frontal','pbrMetallicRoughness':{'baseColorTexture':{'index':0},'metallicFactor':.18,'roughnessFactor':.6},'doubleSided':True},{'name':'Metal verso e bordas','pbrMetallicRoughness':{'baseColorFactor':color,'metallicFactor':.8,'roughnessFactor':.35}}]}
 doc['materials'].append({'name':'Fita azul-marinho - verso e bordas','pbrMetallicRoughness':{'baseColorFactor':[.008,.02,.055,1],'metallicFactor':0,'roughnessFactor':.9}})
 doc['materials'].append({'name':'Fita tecido frontal','pbrMetallicRoughness':{'baseColorTexture':{'index':0},'metallicFactor':0,'roughnessFactor':.9}})
 binary=bytearray(); obj=[]; off=1
 def view(data,target=None):
  while len(binary)%4:binary.append(0)
  v={'buffer':0,'byteOffset':len(binary),'byteLength':len(data)}
  if target:v['target']=target
  binary.extend(data);doc['bufferViews'].append(v);return len(doc['bufferViews'])-1
 def acc(a,typ,component):
  a=np.asarray(a,dtype='<f4' if component==5126 else '<u4');v=view(a.tobytes(),34963 if component!=5126 else 34962)
  d={'bufferView':v,'componentType':component,'count':len(a),'type':typ}
  if typ=='VEC3':d.update(min=a.min(axis=0).tolist(),max=a.max(axis=0).tolist())
  doc['accessors'].append(d);return len(doc['accessors'])-1
 def emit(pos,faces,uv,mat):
  global off
  pos=np.array(pos);faces=np.array(faces)
  norm=np.zeros_like(pos);cross=np.cross(pos[faces[:,1]]-pos[faces[:,0]],pos[faces[:,2]]-pos[faces[:,0]])
  for j in range(3):np.add.at(norm,faces[:,j],cross)
  norm/=np.maximum(np.linalg.norm(norm,axis=1,keepdims=True),1e-12)
  attrs={'POSITION':acc(pos,'VEC3',5126),'NORMAL':acc(norm,'VEC3',5126),'TEXCOORD_0':acc(uv,'VEC2',5126)}
  doc['meshes'][0]['primitives'].append({'attributes':attrs,'indices':acc(faces.reshape(-1),'SCALAR',5125),'material':mat})
  obj.append('usemtl '+({0:'frente',1:'metal',2:'fita',3:'frente'}[mat]))
  obj.extend('v %.7f %.7f %.7f'%tuple(p) for p in pos)
  obj.extend('vt %.7f %.7f'%(p[0],1-p[1]) for p in uv)
  obj.extend('f '+' '.join(f'{i+off}/{i+off}' for i in f) for f in faces);off+=len(pos)
 for poly,depth,zbase in [(body,.004,0),(loop,.003,-.001)]:
  edges=np.vstack([a+(b-a)*t for a,b in zip(poly,np.roll(poly,-1,axis=0)) for t in np.linspace(0,1,max(2,int(np.linalg.norm(b-a)*300)),endpoint=False)])
  grid=np.array([(x,y) for y in np.arange(poly[:,1].min()+.004,poly[:,1].max(),.004) for x in np.arange(poly[:,0].min()+.004,poly[:,0].max(),.004)])
  inside=Poly(poly).contains_points(grid); pts=np.vstack([edges,grid[inside]])
  faces=Delaunay(pts).simplices;faces=faces[Poly(poly).contains_points(pts[faces].mean(axis=1))]
  p=np.column_stack([(pts[:,0]-.5)*.1,(.57-pts[:,1])*.15,np.full(len(pts),zbase)])
  if depth>.003:
   lum=np.array(im.convert('L'));s=lum[np.clip((pts[:,1]*h).astype(int),0,h-1),np.clip((pts[:,0]*w).astype(int),0,w-1)]/255
   p[:,2]+=.00065*s
  if depth<.001:
   anchor=(.57-.24)*.15
   p[:,1]=anchor+(p[:,1]-anchor)*1.25
  # Delaunay is CCW in image coordinates; reverse for +Z.
  faces=faces[:,[0,2,1]];emit(p,faces,pts,0 if depth>.003 else 1)
  back=p.copy();back[:,2]=zbase-depth-(p[:,2]-zbase)
  backuv=pts.copy();backuv[:,0]=1-backuv[:,0]
  emit(back,faces[:,[0,2,1]],backuv,0 if depth>.003 else 1)
  n=len(edges);sides=np.vstack([p[:n],back[:n]]);sf=[]
  for i in range(n):j=(i+1)%n;sf.extend([(i,j,n+j),(i,n+j,n+i)])
  emit(sides,sf,np.vstack([edges,edges]),2 if depth<.001 else 1)
 # Two separate closed, curved ribbon loops with thickness and texture on both sides.
 for branch in [-1,1]:
  N=160; W=12; verts=[]; uvs=[]; fs=[]
  for layer in [0,1]:
   for i in range(N+1):
    t=2*np.pi*i/N
    rise=(1-np.cos(t))*.5
    y=.053+.062*rise
    cx=branch*(.005+.012*rise)
    z=.009*np.sin(t)-.001
    for j in range(W+1):
     q=j/W-.5
     x=cx+q*.017
     yy=y+branch*q*.006*rise
     zz=z+.0012*np.sin(q*np.pi)*np.sin(t)+(layer-.5)*.0006
     verts.append([x,yy,zz])
     # Sample only fabric in the reference photograph, excluding background.
     v=.015+.195*(1-rise)
     center=.62-.14*(v/.21)
     uvs.append([center+q*.125,v])
  stride=W+1;size=(N+1)*stride
  for layer in [0,1]:
   for i in range(N):
    for j in range(W):
     a=layer*size+i*stride+j;b=a+stride
     pair=[(a,b,a+1),(a+1,b,b+1)]
     fs.extend(pair if layer==0 else [tuple(reversed(f)) for f in pair])
  for i in range(N):
   for j in [0,W]:
    a=i*stride+j;b=a+stride
    fs.extend([(a,a+size,b),(b,a+size,b+size)])
  emit(verts,fs,uvs,3)
 data=(SRC/source).read_bytes(); doc['images']=[{'bufferView':view(data),'mimeType':'image/png'}]
 doc['buffers'][0]['byteLength']=len(binary)
 js=json.dumps(doc,separators=(',',':')).encode();js+=b' '*((-len(js))%4);binary.extend(b'\0'*((-len(binary))%4))
 glb=struct.pack('<III',0x46546c67,2,28+len(js)+len(binary))+struct.pack('<II',len(js),0x4e4f534a)+js+struct.pack('<II',len(binary),0x004e4942)+binary
 (ROOT/f'medalha-{name}.glb').write_bytes(glb)
 (ROOT/f'medalha-{name}.obj').write_text('mtllib medalha-'+name+'.mtl\n'+'\n'.join(obj))
 (ROOT/f'medalha-{name}.mtl').write_text('newmtl frente\nKd 1 1 1\nmap_Kd textura-'+name+'.png\n\nnewmtl metal\nKd '+' '.join(map(str,color[:3]))+'\nNs 80\n\nnewmtl fita\nKd 0.086 0.152 0.260\nKs 0 0 0\nNs 2\n')
 shutil.copyfile(SRC/source,ROOT/f'textura-{name}.png')
 print(name,'GLB bytes',len(glb),'vertices',off-1)
