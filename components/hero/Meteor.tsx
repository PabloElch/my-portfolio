"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Meteor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1.4, 64, 64);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) }
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
        
        vec2 coord = gl_FragCoord.xy;
        vec2 scaledCoord = floor(coord / 6.0);
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
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      sphere.rotation.y = mouse.current.x * 1.5;
      sphere.rotation.x = -mouse.current.y * 1.5;

      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      uniforms.uResolution.value.set(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ position: "absolute", top: "-5%", right: "-5%", width: "70%", height: "110%", zIndex: 1, pointerEvents: "none", opacity: 0.9 }} />;
}