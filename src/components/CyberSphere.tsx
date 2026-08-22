import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

export function CyberSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.x = Math.cos(t / 4) * 0.2;
      sphereRef.current.rotation.y = Math.sin(t / 4) * 0.2;
    }
  });

  return (
    <>
      {/* Câmera configurada via props no Canvas */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#d5066f" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#1fb3e5" />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere ref={sphereRef} args={[1, 64, 64]} scale={1.5}>
          <MeshDistortMaterial
            color="#050505"
            roughness={0.1}
            metalness={1}
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Float>

      {/* Wireframe outer shell */}
      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[1.6, 32, 32]}>
          <meshBasicMaterial 
            color="#d5066f" 
            wireframe 
            transparent 
            opacity={0.15} 
          />
        </Sphere>
      </Float>

      {/* Floating particles/bits */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={Math.random() * 5} position={[
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6
        ]}>
          <mesh>
            <boxGeometry args={[0.05, 0.05, 0.05]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#d5066f" : "#1fb3e5"} />
          </mesh>
        </Float>
      ))}
    </>
  );
}
