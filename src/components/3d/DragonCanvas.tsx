"use client";

import { Canvas } from "@react-three/fiber";
import { useDragonStore } from "@/lib/store/dragonStore";
import DragonCreature from "./DragonCreature";

export default function DragonCanvas() {
  const { enabled } = useDragonStore();

  if (!enabled) return null;

  return (
    <div className="hidden md:block fixed inset-0 z-30 pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 15, 10]} intensity={1.2} />
        <pointLight position={[-5, 5, 5]} intensity={2} color="#38bdf8" />
        <pointLight position={[5, -5, 5]} intensity={2} color="#f59e0b" />

        <DragonCreature />
      </Canvas>
    </div>
  );
}
