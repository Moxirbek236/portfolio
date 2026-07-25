"use client";

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Laptop, Gamepad2, Sparkles, RefreshCw, ZoomIn, RotateCcw } from "lucide-react";

export default function DeveloperRoom3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [kaliLogs, setKaliLogs] = useState<string[]>([
    "root@kali-linux:~# nmap -sV -sC 192.168.1.100",
    "Starting Nmap 7.94 ( https://nmap.org ) at 2026-07-26 00:30 UZT",
    "Nmap scan report for dev-node-internal (192.168.1.100)",
    "Host is up (0.00042s latency).",
    "PORT     STATE SERVICE VERSION",
    "22/tcp   open  ssh     OpenSSH 9.6p1",
    "80/tcp   open  http    nginx/1.24.0",
    "3000/tcp open  http    Node.js (Next.js App Router)",
    "5432/tcp open  pgsql   PostgreSQL 16.2 (Multi-Tenant)",
    "6379/tcp open  redis   Redis 7.2 (OTP & Session Cache)",
    "root@kali-linux:~# nest start --watch"
  ]);

  const [gameScore, setGameScore] = useState(1840);
  const crtCanvasRef = useRef<HTMLCanvasElement>(null);

  // 2D Retro Game Animation Loop for CRT screen
  useEffect(() => {
    const canvas = crtCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let playerX = 140;
    let dx = 2;
    let bullets: { x: number; y: number }[] = [];
    let aliens = Array.from({ length: 12 }, (_, i) => ({
      x: (i % 6) * 45 + 20,
      y: Math.floor(i / 6) * 25 + 20,
      alive: true
    }));

    const loop = () => {
      ctx.fillStyle = "#050b14";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Retro Grid
      ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Player Movement
      playerX += dx;
      if (playerX > canvas.width - 30 || playerX < 10) dx = -dx;

      // Player Ship
      ctx.fillStyle = "#10b981";
      ctx.fillRect(playerX, canvas.height - 25, 24, 10);
      ctx.fillRect(playerX + 8, canvas.height - 32, 8, 8);

      // Bullets
      if (Math.random() > 0.85) bullets.push({ x: playerX + 10, y: canvas.height - 32 });
      ctx.fillStyle = "#f59e0b";
      bullets.forEach((b, index) => {
        b.y -= 4;
        ctx.fillRect(b.x, b.y, 4, 8);
        aliens.forEach((a) => {
          if (a.alive && Math.abs(b.x - a.x) < 15 && Math.abs(b.y - a.y) < 15) {
            a.alive = false;
            setGameScore((prev) => prev + 100);
          }
        });
        if (b.y < 0) bullets.splice(index, 1);
      });

      if (aliens.every((a) => !a.alive)) aliens.forEach((a) => (a.alive = true));

      // Aliens
      aliens.forEach((a) => {
        if (a.alive) {
          ctx.fillStyle = "#ec4899";
          ctx.fillRect(a.x, a.y, 18, 12);
        }
      });

      // Scanlines
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 2);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Three.js 3D Room Scene Initialization
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060911);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(12, 10, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Keep above floor
    controls.minDistance = 6;
    controls.maxDistance = 25;
    controls.target.set(0, 2, 0);

    // 3. Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x6366f1, 1.2);
    mainLight.position.set(10, 15, 10);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const cyanPointLight = new THREE.PointLight(0x38bdf8, 2, 15);
    cyanPointLight.position.set(-2, 4, 0);
    scene.add(cyanPointLight);

    // 4. Room Floor & Walls
    const floorGeo = new THREE.BoxGeometry(14, 0.4, 14);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x0e1322, roughness: 0.4 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Back Wall
    const backWallGeo = new THREE.BoxGeometry(14, 8, 0.4);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x090e1a });
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.set(0, 3.8, -6.8);
    scene.add(backWall);

    // Left Wall
    const leftWallGeo = new THREE.BoxGeometry(0.4, 8, 14);
    const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
    leftWall.position.set(-6.8, 3.8, 0);
    scene.add(leftWall);

    // 5. Furniture: Developer Desk & Chair
    const deskGeo = new THREE.BoxGeometry(7, 0.3, 3.5);
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.set(-1, 2.5, -3);
    desk.castShadow = true;
    desk.receiveShadow = true;
    scene.add(desk);

    // Desk Legs
    const legGeo = new THREE.CylinderGeometry(0.12, 0.12, 2.5);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
    [
      [-4.2, 1.25, -4.5],
      [2.2, 1.25, -4.5],
      [-4.2, 1.25, -1.5],
      [2.2, 1.25, -1.5]
    ].forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, y, z);
      scene.add(leg);
    });

    // Ergonomic Chair
    const chairSeatGeo = new THREE.BoxGeometry(1.6, 0.2, 1.6);
    const chairMat = new THREE.MeshStandardMaterial({ color: 0x475569 });
    const chairSeat = new THREE.Mesh(chairSeatGeo, chairMat);
    chairSeat.position.set(-1, 1.5, -0.5);
    scene.add(chairSeat);

    const chairBackGeo = new THREE.BoxGeometry(1.6, 2, 0.2);
    const chairBack = new THREE.Mesh(chairBackGeo, chairMat);
    chairBack.position.set(-1, 2.5, 0.3);
    scene.add(chairBack);

    // 6. Furniture: 3D Sofa / Couch
    const sofaBaseGeo = new THREE.BoxGeometry(5, 1, 2.2);
    const sofaMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 });
    const sofaBase = new THREE.Mesh(sofaBaseGeo, sofaMat);
    sofaBase.position.set(3, 0.5, 2.5);
    scene.add(sofaBase);

    const sofaBackGeo = new THREE.BoxGeometry(5, 1.8, 0.6);
    const sofaBack = new THREE.Mesh(sofaBackGeo, sofaMat);
    sofaBack.position.set(3, 1.4, 3.3);
    scene.add(sofaBack);

    // 7. Furniture: 3D Plant in Pot
    const potGeo = new THREE.CylinderGeometry(0.6, 0.4, 1.2);
    const potMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0 });
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.position.set(-5, 0.6, 4.5);
    scene.add(pot);

    const plantLeavesGeo = new THREE.SphereGeometry(0.9, 8, 8);
    const plantMat = new THREE.MeshStandardMaterial({ color: 0x10b981 });
    const leaves = new THREE.Mesh(plantLeavesGeo, plantMat);
    leaves.position.set(-5, 1.8, 4.5);
    scene.add(leaves);

    // 8. 3D HP Victus Gaming Laptop on Desk
    const laptopBaseGeo = new THREE.BoxGeometry(1.8, 0.1, 1.2);
    const laptopMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
    const laptopBase = new THREE.Mesh(laptopBaseGeo, laptopMat);
    laptopBase.position.set(-2.5, 2.7, -3);
    scene.add(laptopBase);

    const laptopScreenGeo = new THREE.BoxGeometry(1.8, 1.2, 0.08);
    const laptopScreenMat = new THREE.MeshStandardMaterial({ color: 0x020617, emissive: 0x38bdf8, emissiveIntensity: 0.6 });
    const laptopScreen = new THREE.Mesh(laptopScreenGeo, laptopScreenMat);
    laptopScreen.position.set(-2.5, 3.3, -3.5);
    laptopScreen.rotation.x = -0.15;
    scene.add(laptopScreen);

    // 9. 3D Retro 2000s CRT Monitor Computer on Desk
    const crtHousingGeo = new THREE.BoxGeometry(2.2, 1.8, 1.8);
    const crtMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 });
    const crtHousing = new THREE.Mesh(crtHousingGeo, crtMat);
    crtHousing.position.set(0.5, 3.5, -3.2);
    scene.add(crtHousing);

    const crtScreenGeo = new THREE.PlaneGeometry(1.8, 1.4);
    const crtScreenMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const crtScreenMesh = new THREE.Mesh(crtScreenGeo, crtScreenMat);
    crtScreenMesh.position.set(0.5, 3.5, -2.29);
    scene.add(crtScreenMesh);

    // Animation Render Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Window Resize Handler
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
  }, []);

  return (
    <section id="my-room" className="py-24 border-t border-slate-800/60 bg-[#060911] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">

        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REAL 3D WORKSPACE EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            My 3D Interactive Room
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A full 3D isometric room featuring 3D walls, couch, houseplant, desk, chair, **HP Victus Laptop** (Kali Linux + VS Code), and **Retro 2000s CRT Monitor** (Space Invaders). Drag to rotate 360°, scroll to zoom in/out!
          </p>
        </div>

        {/* Real 3D Three.js Viewport */}
        <div className="glass-card rounded-3xl border border-slate-800 p-4 sm:p-6 bg-[#090d18] shadow-2xl relative space-y-6">

          {/* Viewport Control Instructions Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ZoomIn className="w-4 h-4 text-cyan-400" />
              <span>Click & Drag to Rotate 360° • Scroll Wheel to Zoom In / Out</span>
            </div>
            <span className="hidden sm:inline text-indigo-400 font-semibold">Three.js 3D WebGL</span>
          </div>

          {/* Three.js Canvas Container */}
          <div ref={mountRef} className="w-full h-[480px] rounded-2xl overflow-hidden border border-slate-800/80 bg-[#050810]" />

          {/* Live Action Displays: HP Victus Kali Linux & Retro CRT Arcade */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">

            {/* Live HP Victus Displey */}
            <div className="p-4 rounded-2xl bg-[#070b14] border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Laptop className="w-4 h-4" /> HP VICTUS (Kali Linux + VS Code)
                </span>
                <span className="text-[10px] text-emerald-400">Live Code Stream</span>
              </div>
              <div className="h-32 overflow-y-auto space-y-1 text-[11px] leading-relaxed text-slate-300">
                {kaliLogs.slice(0, 6).map((log, idx) => (
                  <div key={idx} className={log.startsWith("root@") ? "text-emerald-400 font-bold" : "text-slate-300"}>
                    {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Live Retro CRT Displey */}
            <div className="p-4 rounded-2xl bg-[#070b14] border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2 text-amber-400 font-bold">
                  <Gamepad2 className="w-4 h-4" /> RETRO 2000s CRT MONITOR
                </span>
                <span className="text-[10px] text-amber-400 font-bold">Score: {gameScore}</span>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-800">
                <canvas ref={crtCanvasRef} width={320} height={120} className="w-full h-32 object-cover" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
