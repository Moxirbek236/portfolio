"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDragonStore } from "@/lib/store/dragonStore";
import DragonParticles from "./DragonParticles";

export default function DragonCreature() {
  const dragonGroupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const whiskerLeftRef = useRef<THREE.Mesh>(null);
  const whiskerRightRef = useRef<THREE.Mesh>(null);

  const { targetPos, mouseSpeed } = useDragonStore();

  // Damped position chasing target cursor tightly
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  const segmentPositions = useRef<THREE.Vector3[]>(
    Array.from({ length: 14 }, () => new THREE.Vector3(0, 0, 0))
  );

  useFrame((state, delta) => {
    if (!dragonGroupRef.current) return;

    // 1. Tight pursuit toward mouse cursor (targetPos)
    const targetVector = new THREE.Vector3(targetPos[0], targetPos[1], 0);
    currentPos.current.lerp(targetVector, 0.14); // Tight chase factor

    // 2. Compute motion velocity & rotation
    const vel = new THREE.Vector3().subVectors(targetVector, currentPos.current);
    const yawAngle = Math.atan2(vel.x, vel.y > 0 ? vel.y : 1);
    const pitchAngle = THREE.MathUtils.clamp(-vel.y * 0.2, -Math.PI / 4, Math.PI / 4);
    const rollAngle = THREE.MathUtils.clamp(-vel.x * 0.3, -Math.PI / 4, Math.PI / 4);

    dragonGroupRef.current.position.copy(currentPos.current);
    dragonGroupRef.current.rotation.set(pitchAngle, yawAngle, rollAngle, "YXZ");

    // 3. Floating Dragon Whiskers Wave Animation
    const time = state.clock.elapsedTime;
    if (whiskerLeftRef.current) {
      whiskerLeftRef.current.rotation.z = Math.sin(time * 6) * 0.2 - 0.3;
    }
    if (whiskerRightRef.current) {
      whiskerRightRef.current.rotation.z = -Math.sin(time * 6) * 0.2 + 0.3;
    }

    // 4. Update 14 Serpentine Body Segments (Organic Sinusoidal Wave)
    let head = currentPos.current;
    segmentPositions.current.forEach((seg, idx) => {
      if (idx === 0) {
        seg.copy(head);
      } else {
        const prev = segmentPositions.current[idx - 1];
        const dir = new THREE.Vector3().subVectors(seg, prev);
        const dist = dir.length();
        if (dist > 0.01) {
          dir.normalize();
          seg.copy(prev).add(dir.multiplyScalar(0.28));
        }
        // Serpentine S-curve wave offset
        const wave = Math.sin(time * 5 - idx * 0.4) * 0.12;
        seg.x += wave;
      }
    });
  });

  return (
    <>
      {/* Volumetric Flame Particles */}
      <DragonParticles headPos={currentPos.current} />

      {/* Main 3D Oriental Chinese Serpentine Dragon */}
      <group ref={dragonGroupRef} scale={[0.4, 0.4, 0.4]}>
        
        {/* Chinese Dragon Head & Snout */}
        <group ref={headRef}>
          {/* Main Skull */}
          <mesh position={[0, 0, 0.4]}>
            <boxGeometry args={[0.7, 0.6, 1.1]} />
            <meshStandardMaterial
              color="#0f172a"
              metalness={0.9}
              roughness={0.2}
              emissive="#f59e0b"
              emissiveIntensity={0.3}
            />
          </mesh>

          {/* Snout */}
          <mesh position={[0, -0.1, 1.1]}>
            <boxGeometry args={[0.5, 0.4, 0.7]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>

          {/* Glowing Eyes */}
          <mesh position={[-0.28, 0.2, 0.6]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[0.28, 0.2, 0.6]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>

          {/* Stag Antler Horns */}
          <mesh position={[-0.3, 0.45, -0.1]} rotation={[0.2, 0, -0.4]}>
            <cylinderGeometry args={[0.04, 0.08, 1.2]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.9} />
          </mesh>
          <mesh position={[0.3, 0.45, -0.1]} rotation={[0.2, 0, 0.4]}>
            <cylinderGeometry args={[0.04, 0.08, 1.2]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.9} />
          </mesh>

          {/* Oriental Dragon Floating Whiskers (Barbels) */}
          <mesh ref={whiskerLeftRef} position={[-0.25, -0.15, 1.3]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.02, 0.01, 1.4]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
          <mesh ref={whiskerRightRef} position={[0.25, -0.15, 1.3]} rotation={[0, 0, 0.3]}>
            <cylinderGeometry args={[0.02, 0.01, 1.4]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
        </group>

        {/* 14 Articulated Serpentine Body Segments with Crest Fins */}
        {segmentPositions.current.map((_, idx) => (
          <group key={idx} position={[0, 0, -idx * 0.35]}>
            {/* Body Segment Sphere */}
            <mesh>
              <sphereGeometry args={[0.42 - idx * 0.02, 12, 12]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? "#0f172a" : "#1e293b"}
                metalness={0.85}
                roughness={0.25}
              />
            </mesh>
            {/* Dorsal Crest Fin */}
            <mesh position={[0, 0.4 - idx * 0.02, 0]}>
              <coneGeometry args={[0.08, 0.35, 4]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.9} />
            </mesh>
          </group>
        ))}

      </group>
    </>
  );
}
