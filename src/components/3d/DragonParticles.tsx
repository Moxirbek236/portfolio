"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DragonParticlesProps {
  headPos: THREE.Vector3;
}

export default function DragonParticles({ headPos }: DragonParticlesProps) {
  const count = 60;
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, scales] = useMemo(() => {
    const posArr = new Float32Array(count * 3);
    const scaleArr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      posArr[i * 3] = (Math.random() - 0.5) * 10;
      posArr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      posArr[i * 3 + 2] = (Math.random() - 0.5) * 10;
      scaleArr[i] = Math.random() * 0.15 + 0.05;
    }
    return [posArr, scaleArr];
  }, [count]);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;
    const geo = particlesRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Drift upwards & backward from headPos
      pos[i * 3 + 1] += delta * 0.8;
      pos[i * 3] += (Math.random() - 0.5) * 0.02;

      // Reset particles when drifting out of range
      if (pos[i * 3 + 1] > headPos.y + 4 || Math.abs(pos[i * 3] - headPos.x) > 5) {
        pos[i * 3] = headPos.x + (Math.random() - 0.5) * 1.2;
        pos[i * 3 + 1] = headPos.y - 1 + (Math.random() - 0.5) * 0.5;
        pos[i * 3 + 2] = headPos.z - 0.5;
      }
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#f59e0b"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
