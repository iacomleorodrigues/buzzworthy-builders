import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleNetwork() {
  const count = 100;
  const meshRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 10;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 10;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return temp;
  }, []);

  const velocities = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 0.01;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return temp;
  }, []);

  useFrame(() => {
    const mesh = meshRef.current;
    const lines = linesRef.current;
    if (!mesh || !lines) return;

    const positionsAttr = mesh.geometry.getAttribute('position') as THREE.BufferAttribute;
    if (!positionsAttr) return;
    const positions = positionsAttr.array as Float32Array;
    
    const linePositions = new Float32Array(count * count * 6);
    let lineCount = 0;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const vX = velocities[idx];
      const vY = velocities[idx + 1];
      const vZ = velocities[idx + 2];

      if (typeof vX === 'number' && typeof vY === 'number' && typeof vZ === 'number') {
        positions[idx] += vX;
        positions[idx + 1] += vY;
        positions[idx + 2] += vZ;

        // Bounce off boundaries
        const pX = positions[idx];
        const pY = positions[idx + 1];
        const pZ = positions[idx + 2];

        if (typeof pX === 'number' && Math.abs(pX) > 5) velocities[idx] = -vX;
        if (typeof pY === 'number' && Math.abs(pY) > 5) velocities[idx + 1] = -vY;
        if (typeof pZ === 'number' && Math.abs(pZ) > 5) velocities[idx + 2] = -vZ;
      }

      // Connections
      for (let j = i + 1; j < count; j++) {
        const jdx = j * 3;
        const p1x = positions[idx];
        const p1y = positions[idx + 1];
        const p1z = positions[idx + 2];
        const p2x = positions[jdx];
        const p2y = positions[jdx + 1];
        const p2z = positions[jdx + 2];

        if (typeof p1x === 'number' && typeof p1y === 'number' && typeof p1z === 'number' &&
            typeof p2x === 'number' && typeof p2y === 'number' && typeof p2z === 'number') {
          
          const dx = p1x - p2x;
          const dy = p1y - p2y;
          const dz = p1z - p2z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 2.5) {
            linePositions[lineCount * 6] = p1x;
            linePositions[lineCount * 6 + 1] = p1y;
            linePositions[lineCount * 6 + 2] = p1z;
            linePositions[lineCount * 6 + 3] = p2x;
            linePositions[lineCount * 6 + 4] = p2y;
            linePositions[lineCount * 6 + 5] = p2z;
            lineCount++;
          }
        }
      }
    }

    positionsAttr.needsUpdate = true;
    lines.geometry.setAttribute('position', new THREE.BufferAttribute(linePositions.slice(0, lineCount * 6), 3));
  });

  return (
    <group position={[2, 0, -2]}>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particles}
            itemSize={3}
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#d5066f" transparent opacity={0.6} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#1fb3e5" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}
