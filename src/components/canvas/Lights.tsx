// src/components/ui/canvas/Lights.tsx
'use client';
import React from 'react';
import { useHelper } from '@react-three/drei';
import * as THREE from 'three';

interface LightsProps {
  showHelpers?: boolean;
}

export const Lights: React.FC<LightsProps> = ({ showHelpers = false }) => {
  const directionalLightRef = React.useRef<THREE.DirectionalLight>(null!);
  const spotLightRef = React.useRef<THREE.SpotLight>(null!);

  // Хелперы создаются напрямую, а не внутри useEffect
  useHelper(showHelpers && directionalLightRef, THREE.DirectionalLightHelper, 1, 'red');
  useHelper(showHelpers && spotLightRef, THREE.SpotLightHelper, 'green');

  return (
    <>
      <ambientLight intensity={0.5} color='#ffffff' />

      <directionalLight
        ref={directionalLightRef}
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      >
        <orthographicCamera attach='shadow-camera' args={[-10, 10, 10, -10, 0.1, 20]} />
      </directionalLight>

      <directionalLight position={[-5, 5, -5]} intensity={0.3} color='#b9d5ff' />

      <spotLight
        ref={spotLightRef}
        position={[0, 5, 0]}
        intensity={0.5}
        angle={Math.PI / 4}
        penumbra={0.1}
        castShadow
      />

      <hemisphereLight intensity={0.3} color='#ffffff' groundColor='#b9d5ff' />
    </>
  );
};
