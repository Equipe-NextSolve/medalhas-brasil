'use client';

import dynamic from 'next/dynamic';

const MedalViewer = dynamic(
  () => import('./MedalViewer'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{ background: '#0D0D0D', minHeight: '100vh' }}
        className="flex items-center justify-center"
      >
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-full border-4 mx-auto mb-4 animate-spin"
            style={{ borderColor: '#D99923', borderTopColor: 'transparent' }}
          />
          <p className="text-gray-400">Carregando visualizador 3D…</p>
        </div>
      </div>
    ),
  }
);

export default function MedalViewerClient() {
  return <MedalViewer />;
}
