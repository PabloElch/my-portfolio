"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Meteor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    // 1. Use a highly subdivided Icosahedron
    const geometry = new THREE.IcosahedronGeometry(1.35, 64);
    const positionAttribute = geometry.getAttribute('position');
    const vertex = new THREE.Vector3();

    // 2. Apply heavy rocky noise
    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      
      // Much stronger noise values for a jagged meteor look
      const noise1 = Math.sin(vertex.x * 3) * Math.cos(vertex.y * 4) * Math.sin(vertex.z * 5) * 0.25;
      const noise2 = Math.sin(vertex.x * 8) * Math.cos(vertex.y * 7) * Math.sin(vertex.z * 9) * 0.08;
      const totalNoise = noise1 + noise2;
      
      vertex.multiplyScalar(1 + totalNoise);
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    // Recalculate normals so the dithered lighting catches the lumps
    geometry.computeVertexNormals();

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
      uniform float uTime;
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
        vec2 animatedCoord = coord + vec2(sin(uTime * 0.5) * 3.0, cos(uTime * 0.5) * 3.0);
        vec2 scaledCoord = floor(animatedCoord / 5.0); 
        
        int x = int(mod(scaledCoord.x, 8.0));
        int y = int(mod(scaledCoord.y, 8.0));
        int index = y * 8 + x;
        float threshold = bayer[index] / 64.0;

        float pulse = sin(uTime * 1.5) * 0.1;
        float flicker = fract(sin(dot(coord, vec2(12.9898, 78.233)) + uTime * 0.5) * 43758.5453);
        
        float finalThreshold = threshold + pulse + (flicker * 0.15);

        if (diff > finalThreshold) {
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        } else {
          discard;
        }
      }
    `;

    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const meteor = new THREE.Mesh(geometry, material);
    scene.add(meteor);

    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const onMouseMove = (event: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      
      const isInside = (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      );

      isHovered.current = isInside;

      if (isInside) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        targetRotationY = mouseX * 1.5;
        targetRotationX = -mouseY * 1.5;
      }
    };
    
    window.addEventListener("mousemove", onMouseMove);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      uniforms.uTime.value = elapsedTime;
      
      if (!isHovered.current) {
        targetRotationY += 0.002;
        targetRotationX += 0.001;
      }

      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      meteor.rotation.x = currentRotationX;
      meteor.rotation.y = currentRotationY;

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
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: "absolute", 
        top: "-10%", 
        right: "5%", 
        width: "60%", 
        height: "120%", 
        zIndex: 1, 
        opacity: 0.65,
        pointerEvents: "none"
      }} 
    />
  );
}