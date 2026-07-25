"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Sparkles, ZoomIn, RotateCcw, Monitor, Laptop, Coffee } from "lucide-react";

export default function DeveloperRoom3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // IntersectionObserver to lazy load WebGL scene only when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Load High-Definition Screenshots via TextureLoader
    const textureLoader = new THREE.TextureLoader();

    const cs16Texture = textureLoader.load("/cs16-screen.jpg", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
    });

    const kaliTexture = textureLoader.load("/kali-screen.jpg", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
    });

    // 1. Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060911);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(11, 9, 13);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    // Clamp DPR to max 1.5 to save mobile GPU & battery
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // 2. OrbitControls (360 Drag Rotate, Scroll Zoom, Pan)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = true;
    controls.zoomSpeed = 1.2;
    controls.enableRotate = true;
    controls.rotateSpeed = 1.0;
    controls.enablePan = true;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 4;
    controls.maxDistance = 28;
    controls.target.set(0, 2.2, 0);
    controlsRef.current = controls;

    // 3. Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xf59e0b, 1.2);
    mainLight.position.set(10, 15, 10);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const cyanPointLight = new THREE.PointLight(0x38bdf8, 2.5, 15);
    cyanPointLight.position.set(-2.5, 4, -2);
    scene.add(cyanPointLight);

    const amberPointLight = new THREE.PointLight(0xf59e0b, 2.5, 12);
    amberPointLight.position.set(1, 4, -2);
    scene.add(amberPointLight);

    // 4. Room Floor & Walls
    const floorGeo = new THREE.BoxGeometry(14, 0.4, 14);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x0e1322, roughness: 0.4 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.2;
    floor.receiveShadow = true;
    scene.add(floor);

    const wallMat = new THREE.MeshStandardMaterial({ color: 0x090e1a });
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(14, 8, 0.4), wallMat);
    backWall.position.set(0, 3.8, -6.8);
    scene.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 8, 14), wallMat);
    leftWall.position.set(-6.8, 3.8, 0);
    scene.add(leftWall);

    // 5. Desk & Chair
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 });
    const desk = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.3, 3.8), deskMat);
    desk.position.set(-0.5, 2.5, -3);
    desk.castShadow = true;
    desk.receiveShadow = true;
    scene.add(desk);

    const legMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
    const legGeo = new THREE.CylinderGeometry(0.12, 0.12, 2.5);
    [
      [-4, 1.25, -4.6],
      [3, 1.25, -4.6],
      [-4, 1.25, -1.4],
      [3, 1.25, -1.4]
    ].forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, y, z);
      scene.add(leg);
    });

    const chairMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
    const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.2, 1.6), chairMat);
    chairSeat.position.set(-0.5, 1.5, -0.5);
    scene.add(chairSeat);

    const chairBack = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2, 0.2), chairMat);
    chairBack.position.set(-0.5, 2.5, 0.3);
    scene.add(chairBack);

    // 6. Sofa & Houseplant
    const sofaMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6 });
    const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(5, 1, 2.2), sofaMat);
    sofaBase.position.set(3.5, 0.5, 2.5);
    scene.add(sofaBase);

    const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(5, 1.8, 0.6), sofaMat);
    sofaBack.position.set(3.5, 1.4, 3.3);
    scene.add(sofaBack);

    const potMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc });
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.4, 1.2), potMat);
    pot.position.set(-5, 0.6, 4.5);
    scene.add(pot);

    const plantMat = new THREE.MeshStandardMaterial({ color: 0x10b981 });
    const leaves = new THREE.Mesh(new THREE.SphereGeometry(0.9, 8, 8), plantMat);
    leaves.position.set(-5, 1.8, 4.5);
    scene.add(leaves);

    // 7. 3D HP Victus Laptop with Kali Linux Screen Texture
    const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 1.4), new THREE.MeshStandardMaterial({ color: 0x0f172a }));
    laptopBase.position.set(-2.6, 2.7, -3);
    scene.add(laptopBase);

    const laptopScreenGeo = new THREE.PlaneGeometry(2.1, 1.3);
    const laptopScreenMat = new THREE.MeshBasicMaterial({ map: kaliTexture });
    const laptopScreenMesh = new THREE.Mesh(laptopScreenGeo, laptopScreenMat);
    laptopScreenMesh.position.set(-2.6, 3.4, -3.65);
    laptopScreenMesh.rotation.x = -0.15;
    scene.add(laptopScreenMesh);

    // 8. 3D Retro 2000s CRT Monitor with Counter-Strike 1.6 Screen Texture
    const crtHousing = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2, 2), new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 }));
    crtHousing.position.set(1, 3.6, -3.2);
    scene.add(crtHousing);

    const crtScreenGeo = new THREE.PlaneGeometry(2.1, 1.6);
    const crtScreenMat = new THREE.MeshBasicMaterial({ map: cs16Texture });
    const crtScreenMesh = new THREE.Mesh(crtScreenGeo, crtScreenMat);
    crtScreenMesh.position.set(1, 3.6, -2.19);
    scene.add(crtScreenMesh);

    // 9. Coffee Mug on Desk
    const mugMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3 });
    const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.4), mugMat);
    mug.position.set(-0.8, 2.85, -2.5);
    scene.add(mug);

    // Render Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isVisible]);

  const handleResetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <section ref={containerRef} id="my-room" className="py-24 border-t border-slate-800/60 bg-[#060911] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">

        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 · 3D ISOMETRIC WORKSPACE LAB</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            My Interactive 3D Room
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Full 3D WebGL isometric workspace environment. Features 3D walls, desk setup, sofa, plant, **HP Victus Laptop** (Kali Linux terminal & VS Code screen), **Retro CRT Monitor** (Counter-Strike 1.6 de_dust2 screen), and Uzbek tea mug.
          </p>
        </div>

        {/* Real 3D Three.js Viewport */}
        <div className="glass-card rounded-3xl border border-slate-800 p-4 sm:p-6 bg-[#090d18] shadow-2xl relative space-y-4">

          {/* Viewport Control Instructions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2.5 bg-slate-900/90 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ZoomIn className="w-4 h-4 text-cyan-400" />
              <span>Drag to Rotate 360° • Scroll Wheel to Zoom • Touch Pinch Enabled</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleResetView}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                title="Reset Camera View"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Reset View</span>
              </button>
              <span className="text-amber-400 font-bold hidden sm:inline">Three.js WebGL</span>
            </div>
          </div>

          {/* Interactive Object Hotspot Chips */}
          <div className="flex flex-wrap items-center gap-2 px-1">
            <button
              onClick={() => setActiveItem("HP Victus Laptop — Running Kali Linux & VS Code")}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <Laptop className="w-3.5 h-3.5 text-cyan-400" />
              <span>HP Victus Laptop</span>
            </button>

            <button
              onClick={() => setActiveItem("CRT Monitor — Running Counter-Strike 1.6 de_dust2")}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <Monitor className="w-3.5 h-3.5 text-amber-400" />
              <span>CRT Monitor (CS 1.6)</span>
            </button>

            <button
              onClick={() => setActiveItem("Uzbek Tea Mug — Fueling late-night backend deploys")}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-slate-900 border border-slate-800 hover:border-emerald-500 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <Coffee className="w-3.5 h-3.5 text-emerald-400" />
              <span>Uzbek Tea Mug</span>
            </button>

            {activeItem && (
              <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800 px-3 py-1 rounded-full animate-fade-in">
                {activeItem}
              </span>
            )}
          </div>

          {/* Three.js Interactive Canvas Container */}
          <div
            ref={mountRef}
            className="w-full h-[540px] rounded-2xl overflow-hidden border border-slate-800/80 bg-[#050810] touch-none cursor-grab active:cursor-grabbing relative"
          >
            {!isVisible && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#060911] text-slate-400 font-mono text-xs">
                <span>Loading 3D WebGL Room Scene...</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
