"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    if (!canvasContainer) return;

    canvasContainer.innerHTML = '';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(0.8, 0.3, 128, 32);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(canvasContainer.clientWidth, canvasContainer.clientHeight) }
    };

    const vertexShader = `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform vec2 uResolution;
      varying vec3 vNormal;

      float bayer[64] = float[64](
        0.0, 32.0,  8.0, 40.0,  2.0, 34.0, 10.0, 42.0,
       48.0, 16.0, 56.0, 24.0, 50.0, 18.0, 58.0, 26.0,
       12.0, 44.0,  4.0, 36.0, 14.0, 46.0,  6.0, 38.0,
       60.0, 28.0, 52.0, 20.0, 62.0, 30.0, 54.0, 22.0,
        3.0, 35.0, 11.0, 43.0,  1.0, 33.0,  9.0, 41.0,
       51.0, 19.0, 59.0, 27.0, 49.0, 17.0, 57.0, 25.0,
       15.0, 47.0,  7.0, 39.0, 13.0, 45.0,  5.0, 37.0,
       63.0, 31.0, 55.0, 23.0, 61.0, 29.0, 53.0, 21.0
      );

      void main() {
        vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
        float diff = max(dot(vNormal, lightDir), 0.0);
        diff = diff * 0.8 + 0.2; 

        vec2 coord = gl_FragCoord.xy;
        vec2 scaledCoord = floor(coord / 4.0); 
        int x = int(mod(scaledCoord.x, 8.0));
        int y = int(mod(scaledCoord.y, 8.0));
        int index = y * 8 + x;
        float threshold = bayer[index] / 64.0;

        if (diff > threshold) {
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        } else {
          discard;
        }
      }
    `;

    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      knot.rotation.x = elapsedTime * 0.2;
      knot.rotation.y = elapsedTime * 0.3;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
      uniforms.uResolution.value.set(canvasContainer.clientWidth, canvasContainer.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (canvasContainer.contains(renderer.domElement)) {
        canvasContainer.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      style={{ 
        padding: "var(--section-y) var(--gutter)", 
        borderBottom: "1px solid var(--line)",
        backgroundColor: "var(--bg)"
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "4rem", alignItems: "center" }}>
        
        {/* Left Side: 3D Canvas Visual */}
        <div style={{ 
          position: "relative", 
          width: "100%", 
          height: "clamp(300px, 60vh, 600px)", 
          border: "1px solid var(--line)",
          overflow: "hidden",
          background: "#050505",
          justifySelf: "start"
        }}>
          <div ref={canvasContainerRef} style={{ width: "100%", height: "100%" }} />
        </div>

        {/* Right Side: Content */}
        <div ref={textRef} style={{ maxWidth: "500px", justifySelf: "end" }}>
          
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", marginBottom: "1.5rem", textTransform: "uppercase" }}>
            #03 &middot; WEB DEV
          </div>

          <h2 style={{ 
            fontFamily: "var(--font-display)", 
            fontSize: "clamp(2.5rem, 4vw, 4rem)", 
            lineHeight: 1.1, 
            textTransform: "none", 
            margin: "0 0 1.5rem 0",
            fontWeight: 400
          }}>
            Modern Web Development
          </h2>

          <p style={{ 
            fontFamily: "var(--font-sans)", 
            fontSize: "18px", 
            lineHeight: 1.6, 
            color: "var(--fg-dim)",
            margin: 0
          }}>
            Building scalable, high-performance web applications using React, Next.js, and TypeScript. Focused on modular architecture, responsive design, and seamless user experiences from concept to deployment.
          </p>

        </div>

      </div>
    </section>
  );
}