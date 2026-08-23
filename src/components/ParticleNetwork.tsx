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

  useFrame((state) => {
    if (!meshRef.current || !linesRef.current) return;

    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const linePositions = new Float32Array(count * count * 6);
    let lineCount = 0;

    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      // Bounce off boundaries
      if (Math.abs(positions[i * 3]) > 5) velocities[i * 3] *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 5) velocities[i * 3 + 1] *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;

      // Connections
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 2.5) {
          linePositions[lineCount * 6] = positions[i * 3];
          linePositions[lineCount * 6 + 1] = positions[i * 3 + 1];
          linePositions[lineCount * 6 + 2] = positions[i * 3 + 2];
          linePositions[lineCount * 6 + 3] = positions[j * 3];
          linePositions[lineCount * 6 + 4] = positions[j * 3 + 1];
          linePositions[lineCount * 6 + 5] = positions[j * 3 + 2];
          lineCount++;
        }
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(linePositions.slice(0, lineCount * 6), 3));
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
