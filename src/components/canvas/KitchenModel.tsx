// src/components/ui/canvas/KitchenModel.tsx
import * as THREE from 'three';
import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import { useModules, useMaterials, useAnimations } from '@/hooks';
import type { KitchenModule, Material } from '@/types';

// Определяем тип для узлов модели
interface ModelNodes {
  main: THREE.Mesh;
  door?: THREE.Mesh;
  drawer?: THREE.Mesh;
  surface?: THREE.Mesh;
}

interface ModelMaterials {
  body: THREE.Material;
  front?: THREE.Material;
  top?: THREE.Material;
}

interface ModuleMeshProps {
  module: KitchenModule;
  materials: Map<string, Material>;
  isAnimating: boolean;
}

const ModuleMesh: React.FC<ModuleMeshProps> = ({ module, materials, isAnimating }) => {
  const meshRef = React.useRef<THREE.Mesh>(null);

  // Добавляем правильную типизацию для useGLTF
  const { nodes, materials: defaultMaterials } = useGLTF(`/models/${module.type}.glb`) as unknown as {
    nodes: ModelNodes;
    materials: ModelMaterials;
  };

  const moduleMaterials = React.useMemo(() => {
    const result: { [key: string]: THREE.Material } = {};

    materials.forEach((material, slotId) => {
      if (material.type === 'color') {
        result[slotId] = new THREE.MeshStandardMaterial({
          color: new THREE.Color(material.color),
          metalness: material.metalness,
          roughness: material.roughness,
        });
      } else {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(material.textureUrl);
        texture.repeat.set(material.repeatX || 1, material.repeatY || 1);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

        result[slotId] = new THREE.MeshStandardMaterial({
          map: texture,
        });
      }
    });

    return result;
  }, [materials]);

  useFrame((state, delta) => {
    if (isAnimating && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  if (!nodes.main) return null;

  return (
    <group position={[module.position.x, module.position.y, module.position.z]} scale={[1, 1, 1]}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.main.geometry}
        material={moduleMaterials.body || defaultMaterials.body}
      >
        {module.type === 'cabinet' && nodes.door && (
          <mesh geometry={nodes.door.geometry} material={moduleMaterials.front || defaultMaterials.front} />
        )}
        {module.type === 'drawer' && nodes.drawer && (
          <mesh geometry={nodes.drawer.geometry} material={moduleMaterials.front || defaultMaterials.front} />
        )}
        {module.type === 'countertop' && nodes.surface && (
          <mesh geometry={nodes.surface.geometry} material={moduleMaterials.top || defaultMaterials.top} />
        )}
      </mesh>
    </group>
  );
};

export const KitchenModel = () => {
  const { selectedModules } = useModules();
  const { selectedMaterials } = useMaterials();
  const { activeAnimations } = useAnimations();

  return (
    <Center>
      <group>
        {Array.from(selectedModules.values()).map((module) => (
          <ModuleMesh
            key={module.id}
            module={module}
            materials={selectedMaterials.get(module.id) || new Map()}
            isAnimating={activeAnimations.has(module.id)}
          />
        ))}
      </group>
    </Center>
  );
};

// Предзагрузка моделей
useGLTF.preload('/models/cabinet.glb');
useGLTF.preload('/models/drawer.glb');
useGLTF.preload('/models/countertop.glb');
