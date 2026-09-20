import MedalViewerClient from '@/components/Viewer3D/MedalViewerClient';

export const metadata = {
  title: 'Visualizador 3D | Medalhas Brasil',
  description: 'Veja nossas medalhas em 3D e personalize a cor da fita em tempo real.',
};

export default function Visualizador3DPage() {
  return <MedalViewerClient />;
}
