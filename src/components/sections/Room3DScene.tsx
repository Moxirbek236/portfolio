"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, SMAA } from "@react-three/postprocessing";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface Room3DSceneProps {
  focusTarget: string | null;
  onFocusDone: () => void;
}

// === CAMERA CONTROLLER: handles focus & reset ===
function CameraController({ focusTarget, onFocusDone }: { focusTarget: string | null; onFocusDone: () => void }) {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const isAnimating = useRef(false);
  const targetCam = useRef(new THREE.Vector3(11, 9, 13));
  const targetLook = useRef(new THREE.Vector3(0, 2.2, 0));
  const lerpSpeed = 0.07;

  const FOCUS_TARGETS: Record<string, { cam: THREE.Vector3; look: THREE.Vector3 }> = useMemo(() => ({
    laptop: { cam: new THREE.Vector3(-1, 4.5, -0.5), look: new THREE.Vector3(-2.6, 3.3, -3.5) },
    crt: { cam: new THREE.Vector3(4, 5, 1), look: new THREE.Vector3(1, 3.6, -2.5) },
    mug: { cam: new THREE.Vector3(0.5, 4, 0), look: new THREE.Vector3(-0.8, 2.85, -2.5) },
    plant: { cam: new THREE.Vector3(-3, 4, 7), look: new THREE.Vector3(-5, 1.5, 4.5) },
    reset: { cam: new THREE.Vector3(11, 9, 13), look: new THREE.Vector3(0, 2.2, 0) },
  }), []);

  useEffect(() => {
    if (focusTarget && FOCUS_TARGETS[focusTarget]) {
      const { cam, look } = FOCUS_TARGETS[focusTarget];
      targetCam.current.copy(cam);
      targetLook.current.copy(look);
      isAnimating.current = true;
      // Stop animating after ~1.4s (lerp will have settled)
      const timer = setTimeout(() => {
        isAnimating.current = false;
        onFocusDone();
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [focusTarget, FOCUS_TARGETS, onFocusDone]);

  useFrame(() => {
    if (!isAnimating.current || !controlsRef.current) return;
    camera.position.lerp(targetCam.current, lerpSpeed);
    controlsRef.current.target.lerp(targetLook.current, lerpSpeed);
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      minDistance={4}
      maxDistance={28}
      maxPolarAngle={Math.PI / 2 - 0.02}
      target={[0, 2.2, 0]}
    />
  );
}

// === HOVERABLE MESH ===
function HoverMesh({
  geometry,
  material,
  position,
  rotation,
  castShadow = true,
  receiveShadow = false,
}: {
  geometry: THREE.BufferGeometry;
  material: THREE.Material | THREE.Material[];
  position: [number, number, number];
  rotation?: [number, number, number];
  castShadow?: boolean;
  receiveShadow?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!meshRef.current) return;
    const mat = Array.isArray(meshRef.current.material)
      ? meshRef.current.material[0]
      : meshRef.current.material;
    if (mat && "emissiveIntensity" in mat) {
      (mat as THREE.MeshStandardMaterial).emissiveIntensity = THREE.MathUtils.lerp(
        (mat as THREE.MeshStandardMaterial).emissiveIntensity,
        hovered ? 0.25 : 0,
        0.1
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={position}
      rotation={rotation}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
    />
  );
}

// === SCREEN MESH with emissive glow ===
function ScreenMesh({ texture, position, size, rotation, glowColor }: {
  texture: THREE.Texture;
  position: [number, number, number];
  size: [number, number];
  rotation?: [number, number, number];
  glowColor: string;
}) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.5 + Math.sin(clock.elapsedTime * 1.5) * 0.06;
    }
  });
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshStandardMaterial
        ref={matRef}
        map={texture}
        emissive={new THREE.Color(glowColor)}
        emissiveIntensity={0.5}
        emissiveMap={texture}
        toneMapped={false}
      />
    </mesh>
  );
}

// === SCANLINE SHADER for CRT effect ===
function CRTOverlay({ position, size }: { position: [number, number, number]; size: [number, number] }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.time.value = clock.elapsedTime;
  });
  const shader = useMemo(() => ({
    uniforms: { time: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      varying vec2 vUv;
      uniform float time;
      void main() {
        float line = mod(vUv.y * 80.0 + time * 10.0, 1.0);
        float scan = step(0.5, line) * 0.08;
        gl_FragColor = vec4(0.0, 0.0, 0.0, scan);
      }
    `,
    transparent: true,
    depthWrite: false,
  }), []);
  return (
    <mesh position={position}>
      <planeGeometry args={size} />
      <shaderMaterial ref={matRef} args={[shader]} />
    </mesh>
  );
}

// === SCENE CONTENT ===
function RoomScene() {
  const cs16Texture = useTexture("/cs16-screen.jpg");
  const kaliTexture = useTexture("/kali-screen.jpg");

  useMemo(() => {
    [cs16Texture, kaliTexture].forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
    });
  }, [cs16Texture, kaliTexture]);

  const floorMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x0d1424, roughness: 0.6, metalness: 0.1 }), []);
  const wallMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x0c111f, roughness: 0.8 }), []);
  const deskMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.2, emissive: new THREE.Color(0x1e293b), emissiveIntensity: 0 }), []);
  const legMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 }), []);
  const chairMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x1e3a5f, roughness: 0.6, emissive: new THREE.Color(0x1e3a5f), emissiveIntensity: 0 }), []);
  const sofaMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x1d3048, roughness: 0.7, emissive: new THREE.Color(0x1d3048), emissiveIntensity: 0 }), []);
  const mugMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3, emissive: new THREE.Color(0xf59e0b), emissiveIntensity: 0 }), []);
  const laptopMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4, metalness: 0.6, emissive: new THREE.Color(0x0f172a), emissiveIntensity: 0 }), []);
  const crtMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5, emissive: new THREE.Color(0x334155), emissiveIntensity: 0 }), []);
  const potMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xd4c5a9, roughness: 0.8 }), []);
  const plantMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.7, emissive: new THREE.Color(0x16a34a), emissiveIntensity: 0 }), []);
  const cactusBodyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.6 }), []);
  const floorGeo = useMemo(() => new THREE.BoxGeometry(16, 0.4, 16), []);
  const wallGeo = useMemo(() => new THREE.BoxGeometry(16, 10, 0.4), []);
  const sideWallGeo = useMemo(() => new THREE.BoxGeometry(0.4, 10, 16), []);

  const legPositions: [number, number, number][] = [
    [-4, 1.25, -4.6], [3, 1.25, -4.6], [-4, 1.25, -1.4], [3, 1.25, -1.4]
  ];

  return (
    <>
      {/* === LIGHTING === */}
      <ambientLight intensity={0.35} color={0xdce6ff} />

      {/* Main warm directional with shadows */}
      <directionalLight
        position={[8, 14, 10]}
        intensity={1.6}
        color={0xfff5e4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0002}
      />

      {/* Cool ceiling fill */}
      <directionalLight position={[-8, 12, -6]} intensity={0.4} color={0xc8d8ff} />

      {/* Monitor glow — cyan */}
      <pointLight position={[-2.5, 4.5, -2.5]} intensity={3.5} color={0x22d3ee} distance={10} decay={2} />

      {/* CRT monitor glow — amber/green */}
      <pointLight position={[1.2, 4.2, -1.8]} intensity={3} color={0xfbbf24} distance={9} decay={2} />

      {/* Room fill warm */}
      <pointLight position={[4, 2, 3]} intensity={0.8} color={0xff9933} distance={12} decay={2} />

      {/* === ROOM GEOMETRY === */}
      <mesh geometry={floorGeo} material={floorMat} position={[0, -0.2, 0]} receiveShadow />
      <mesh geometry={wallGeo} material={wallMat} position={[0, 4.8, -8]} receiveShadow />
      <mesh geometry={sideWallGeo} material={wallMat} position={[-8, 4.8, 0]} receiveShadow />

      {/* Window on back wall */}
      <mesh position={[2.5, 5.5, -7.6]}>
        <boxGeometry args={[3.5, 2.5, 0.12]} />
        <meshStandardMaterial color={0x1a2744} metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh position={[2.5, 5.5, -7.5]}>
        <planeGeometry args={[3.2, 2.2]} />
        <meshStandardMaterial color={0xf4923a} emissive={new THREE.Color(0xf4923a)} emissiveIntensity={0.15} transparent opacity={0.3} toneMapped={false} />
      </mesh>
      {/* Window glow */}
      <pointLight position={[2.5, 5.5, -7]} intensity={1.2} color={0xf97316} distance={8} decay={2} />

      {/* === DESK === */}
      <HoverMesh
        geometry={useMemo(() => new THREE.BoxGeometry(8, 0.3, 4), [])}
        material={deskMat}
        position={[-0.5, 2.5, -3]}
        castShadow receiveShadow
      />
      {legPositions.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 2.5]} />
          <primitive object={legMat} />
        </mesh>
      ))}

      {/* Keyboard on desk */}
      <mesh position={[-0.5, 2.68, -2.3]} castShadow>
        <boxGeometry args={[2.4, 0.08, 0.9]} />
        <meshStandardMaterial color={0x1e293b} roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Mouse */}
      <mesh position={[1.5, 2.67, -2.2]} castShadow>
        <capsuleGeometry args={[0.12, 0.3, 4, 8]} />
        <meshStandardMaterial color={0x0f172a} roughness={0.3} metalness={0.5} />
      </mesh>

      {/* === CHAIR === */}
      <HoverMesh
        geometry={useMemo(() => new THREE.BoxGeometry(1.6, 0.2, 1.6), [])}
        material={chairMat}
        position={[-0.5, 1.5, -0.5]}
        castShadow
      />
      <HoverMesh
        geometry={useMemo(() => new THREE.BoxGeometry(1.6, 2.2, 0.2), [])}
        material={chairMat}
        position={[-0.5, 2.6, 0.3]}
        castShadow
      />

      {/* === SOFA === */}
      <HoverMesh
        geometry={useMemo(() => new THREE.BoxGeometry(5, 1, 2.2), [])}
        material={sofaMat}
        position={[3.5, 0.5, 2.5]}
        castShadow receiveShadow
      />
      <HoverMesh
        geometry={useMemo(() => new THREE.BoxGeometry(5, 1.8, 0.6), [])}
        material={sofaMat}
        position={[3.5, 1.4, 3.3]}
        castShadow
      />
      {/* Sofa armrests */}
      {[-0.8, 0.8].map((side, i) => (
        <mesh key={i} position={[3.5 + side * 3, 0.9, 2.5]} castShadow>
          <boxGeometry args={[0.5, 0.7, 2.2]} />
          <primitive object={sofaMat} />
        </mesh>
      ))}

      {/* === LAPTOP (HP Victus) === */}
      <HoverMesh
        geometry={useMemo(() => new THREE.BoxGeometry(2.4, 0.12, 1.6), [])}
        material={laptopMat}
        position={[-2.6, 2.68, -3]}
        castShadow
      />
      <mesh position={[-2.6, 3.42, -3.72]} rotation={[-0.22, 0, 0]} castShadow>
        <boxGeometry args={[2.4, 1.5, 0.1]} />
        <primitive object={laptopMat} />
      </mesh>
      <ScreenMesh
        texture={kaliTexture}
        position={[-2.6, 3.42, -3.66]}
        size={[2.2, 1.35]}
        rotation={[-0.22, 0, 0]}
        glowColor="#22d3ee"
      />

      {/* === CRT MONITOR (Retro) === */}
      <HoverMesh
        geometry={useMemo(() => new THREE.BoxGeometry(2.6, 2.2, 2.1), [])}
        material={crtMat}
        position={[1, 3.65, -3.2]}
        castShadow
      />
      {/* CRT bevel */}
      <mesh position={[1, 3.65, -2.14]} castShadow>
        <boxGeometry args={[2.3, 1.8, 0.08]} />
        <meshStandardMaterial color={0x475569} roughness={0.3} />
      </mesh>
      <ScreenMesh
        texture={cs16Texture}
        position={[1, 3.65, -2.1]}
        size={[2.05, 1.6]}
        glowColor="#fbbf24"
      />
      <CRTOverlay position={[1, 3.65, -2.09]} size={[2.05, 1.6]} />
      {/* CRT neck */}
      <mesh position={[1, 2.6, -3.5]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 0.5]} />
        <primitive object={crtMat} />
      </mesh>
      {/* CRT base */}
      <mesh position={[1, 2.5, -3]} castShadow>
        <boxGeometry args={[1.8, 0.15, 1.2]} />
        <primitive object={crtMat} />
      </mesh>

      {/* === MUG === */}
      <HoverMesh
        geometry={useMemo(() => new THREE.CylinderGeometry(0.2, 0.18, 0.45, 16), [])}
        material={mugMat}
        position={[-0.8, 2.85, -2.5]}
        castShadow
      />
      {/* Mug handle */}
      <mesh position={[-0.55, 2.85, -2.5]} castShadow>
        <torusGeometry args={[0.15, 0.04, 8, 12, Math.PI]} />
        <primitive object={mugMat} />
      </mesh>

      {/* === CACTUS === */}
      <mesh position={[-5, 0.6, 4.5]} castShadow>
        <cylinderGeometry args={[0.55, 0.4, 1.1, 8]} />
        <primitive object={potMat} />
      </mesh>
      <HoverMesh
        geometry={useMemo(() => new THREE.CylinderGeometry(0.22, 0.22, 1.4, 8), [])}
        material={cactusBodyMat}
        position={[-5, 1.7, 4.5]}
        castShadow
      />
      {/* Cactus arms */}
      <mesh position={[-4.6, 2.0, 4.5]} rotation={[0, 0, -0.8]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.7, 8]} />
        <primitive object={cactusBodyMat} />
      </mesh>
      <mesh position={[-5.4, 2.1, 4.5]} rotation={[0, 0, 0.8]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.7, 8]} />
        <primitive object={cactusBodyMat} />
      </mesh>

      {/* === POST PROCESSING === */}
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.6}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          height={300}
        />
        <SMAA />
      </EffectComposer>
    </>
  );
}

// === ROOT CANVAS EXPORT ===
export default function Room3DScene({ focusTarget, onFocusDone }: Room3DSceneProps) {
  return (
    <Canvas
      camera={{ position: [11, 9, 13], fov: 45, near: 0.1, far: 1000 }}
      shadows={{ type: THREE.PCFSoftShadowMap }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false, // SMAA handles this
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      style={{ width: "100%", height: "100%", background: "#060911" }}
    >
      <CameraController focusTarget={focusTarget} onFocusDone={onFocusDone} />
      <RoomScene />
    </Canvas>
  );
}
