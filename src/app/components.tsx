'use client';

import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/components/canvas/Scene'), {
  ssr: false,
  loading: () => <div>Loading 3D Scene...</div>,
});

export function CanvasWrapper() {
  return (
    <div className='h-screen w-full'>
      <Scene />
    </div>
  );
}
