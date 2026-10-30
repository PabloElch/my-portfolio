"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const runLabelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvasContainer = canvasContainerRef.current;
    if (!container || !canvasContainer) return;

    canvasContainer.innerHTML = '';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const radius = 1.8;
    const startLatLon = new THREE.Vector3(9.03, 38.74, 1).normalize().multiplyScalar(radius); // Addis Ababa
    const endLatLon = new THREE.Vector3(7.67, 36.83, 1).normalize().multiplyScalar(radius); // Jimma

    // Load Map and Generate Globe
    const mapImage = new Image();
    mapImage.crossOrigin = "Anonymous";
    mapImage.src = "https://unpkg.com/three-globe/example/img/earth-water.png";

    mapImage.onload = () => {
      const mapCanvas = document.createElement("canvas");
      mapCanvas.width = 360;
      mapCanvas.height = 180;
      const mapCtx = mapCanvas.getContext("2d");
      if (!mapCtx) return;

      mapCtx.drawImage(mapImage, 0, 0, 360, 180);
      const imageData = mapCtx.getImageData(0, 0, 360, 180).data;

      const positions = [];
      const numPoints = 12000;
      for (let i = 0; i < numPoints; i++) {
        const y = 1 - (i / (numPoints - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        const lat = Math.asin(y) * (180 / Math.PI);
        const lon = Math.atan2(z, x) * (180 / Math.PI);

        const px = Math.floor((lon + 180) * (360 / 360));
        const py = Math.floor((90 - lat) * (180 / 180));
        
        if (px >= 0 && px < 360 && py >= 0 && py < 180) {
          const index = (py * 360 + px) * 4;
          const r = imageData[index];
          if (r > 50) {
            positions.push(x * radius, y * radius, z * radius);
          }
        }
      }

      const particlesGeo = new THREE.BufferGeometry();
      particlesGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      const particlesMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.015,
        transparent: true,
        opacity: 0.6
      });
      
      const globeParticles = new THREE.Points(particlesGeo, particlesMat);
      globeGroup.add(globeParticles);

      // Initial Rotation
      globeGroup.rotation.y = -2.0;
      globeGroup.rotation.x = -0.2;
    };

    // Scroll Animation
    ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        globeGroup.rotation.y = -2.0 + (self.progress * 1.5);
        globeGroup.rotation.x = -0.2 + (self.progress * 0.2);
      }
    });

    // 2D projection for the RUN label
    const updateLabel = () => {
      if (!runLabelRef.current) return;
      const vector = startLatLon.clone();
      vector.applyMatrix4(globeGroup.matrixWorld);
      vector.project(camera);

      const x = (vector.x * 0.5 + 0.5) * canvasContainer.clientWidth;
      const y = (-(vector.y * 0.5) + 0.5) * canvasContainer.clientHeight;

      runLabelRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
      updateLabel();
    };
    animate();

    const onResize = () => {
      camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (canvasContainer.contains(renderer.domElement)) {
        canvasContainer.removeChild(renderer.domElement);
      }
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      style={{ 
        height: "80vh", 
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid var(--line)",
        position: "relative",
        backgroundColor: "var(--bg)",
        overflow: "hidden"
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", width: "100%", height: "100%", padding: "var(--gutter)" }}>
        
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 10 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", marginBottom: "1.5rem", textTransform: "uppercase" }}>
            [ Journey ] &middot; Addis &rarr; Jimma
          </div>

          {/* Replaced 100% AUTOMATED with ADDIS JIMMA */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "2rem", whiteSpace: "nowrap" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(4rem, 7vw, 7rem)", lineHeight: 1, fontWeight: 400 }}>
              ADDIS
            </span>
            <span style={{ 
              fontFamily: "var(--font-display)", 
              fontSize: "clamp(4rem, 7vw, 7rem)", 
              lineHeight: 1, 
              fontWeight: 300, 
              color: "transparent", 
              WebkitTextStroke: "1px var(--fg)" 
            }}>
              JIMMA
            </span>
          </div>

          <div style={{ width: "100%", height: "1px", background: "var(--line)", marginBottom: "2rem" }} />

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3rem", maxWidth: "90%" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--fg-dim)", marginBottom: "0.5rem" }}>FROM</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "bold" }}>ADDIS ABABA</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--fg-dim)", marginTop: "0.25rem" }}>9.03°N · 38.74°E</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--fg-dim)", marginBottom: "0.5rem" }}>NOW</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "bold" }}>JIMMA, ET</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--fg-dim)", marginTop: "0.25rem" }}>7.67°N · 36.83°E</div>
            </div>
          </div>

          <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", lineHeight: 1.7, color: "var(--fg-dim)", maxWidth: "85%", margin: 0 }}>
            Originally from Addis Ababa, now based in Jimma, Ethiopia. Building intelligent agent architectures, high-impact workflow automations, and full-stack solutions that modernize operations.
          </p>
        </div>

        <div ref={canvasContainerRef} style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
           <div 
             ref={runLabelRef} 
             style={{ 
               position: "absolute", 
               top: 0, 
               left: 0, 
               pointerEvents: "none",
               display: "flex",
               alignItems: "center",
               gap: "0.5rem",
               fontFamily: "var(--font-mono)",
               fontSize: "10px",
               color: "#fff",
               transform: "translate(-100px, -100px)"
             }}
           >
             <div style={{ width: "20px", height: "20px", border: "1px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(5,5,5,0.8)", borderRadius: "2px" }}>
               <span style={{ width: "4px", height: "4px", background: "#fff", borderRadius: "50%" }}></span>
             </div>
             <div style={{ background: "rgba(5,5,5,0.8)", padding: "2px 6px", borderRadius: "2px", border: "1px solid rgba(255,255,255,0.2)" }}>
                RUN &middot; 9.03°N
             </div>
           </div>
        </div>

      </div>
    </section>
  );
}