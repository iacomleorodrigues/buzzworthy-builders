import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';
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
      <ambientLight intensity={10} />
      <pointLight position={[10, 10, 10]} intensity={20} color="#d5066f" />
      <pointLight position={[-10, -10, -10]} intensity={20} color="#1fb3e5" />
      <directionalLight position={[0, 5, 5]} intensity={5} />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere ref={sphereRef} args={[1, 64, 64]} scale={1.5}>
          <meshStandardMaterial
            color="#080808"
            roughness={0}
            metalness={0.2}
            emissive="#000000"
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

      {/* Floating particles/bits removed per request */}
    </>
  );
}
