'use client';

import dynamic from 'next/dynamic';

const MedalViewer = dynamic(
  () => import('./MedalViewer'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{ background: 'linear-gradient(160deg, #f0f0f5 0%, #e8e8ee 100%)', minHeight: '100vh' }}
        className="flex items-center justify-center"
      >
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-full border-4 mx-auto mb-4 animate-spin"
            style={{ borderColor: '#D99923', borderTopColor: 'transparent' }}
          />
          <p style={{ color: '#999' }}>Carregando visualizador 3D…</p>
        </div>
      </div>
    ),
  }
);

export default function MedalViewerClient() {
  return <MedalViewer />;
}
