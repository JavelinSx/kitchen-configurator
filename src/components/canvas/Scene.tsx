'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Grid, Stats } from '@react-three/drei';
import * as THREE from 'three';
import { KitchenModel } from './KitchenModel';
import { Lights } from './Lights';
import { useCamera } from '@/hooks';

export default function Scene() {
  const { position, target, zoom } = useCamera();
  const [showHelpers, setShowHelpers] = React.useState(false);
  const [showStats, setShowStats] = React.useState(false);

  return (
    <>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{
          position: [position.x, position.y, position.z],
          fov: 50,
          near: 0.1,
          far: 1000,
          zoom: zoom,
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[position.x, position.y, position.z]} fov={50} />
          <OrbitControls
            target={[target.x, target.y, target.z]}
            enableDamping
            dampingFactor={0.05}
            minDistance={2}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2 - 0.1}
          />
          <Lights showHelpers={showHelpers} />
          <Environment preset='apartment' background blur={0.8} />
          {showHelpers && <Grid />}
          <KitchenModel />
          {showStats && <Stats />}
        </Suspense>
      </Canvas>
      <div className='fixed bottom-4 left-4 flex gap-2'>
        <button className='px-3 py-1 bg-white/80 rounded-md text-sm' onClick={() => setShowHelpers(!showHelpers)}>
          {showHelpers ? 'Скрыть' : 'Показать'} помощники
        </button>
        <button className='px-3 py-1 bg-white/80 rounded-md text-sm' onClick={() => setShowStats(!showStats)}>
          {showStats ? 'Скрыть' : 'Показать'} статистику
        </button>
      </div>
    </>
  );
}
