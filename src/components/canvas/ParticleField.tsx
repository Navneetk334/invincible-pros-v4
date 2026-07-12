"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/store/useStore";

const COUNT = 4200;

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uScroll;
  attribute float aScale;
  attribute float aSpeed;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.18 * aSpeed + p.x) * 0.5;
    p.x += cos(uTime * 0.14 * aSpeed + p.z) * 0.5;
    // gently draw the field inward as the journey progresses
    p *= 1.0 - uScroll * 0.16;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * (1.0 / -mv.z);
    vAlpha = smoothstep(0.0, 1.0, aScale);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, a * vAlpha * 0.9);
  }
`;

export default function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const color = useMemo(() => new THREE.Color("#38e1ff"), []);

  const { positions, scales, speeds } = useMemo(() => {
    // Deterministic PRNG (mulberry32) — pure and stable across renders.
    let seed = 0x9e3779b9;
    const rand = () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    const positions = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      // distribute in a large flattened sphere shell for depth
      const r = 6 + rand() * 22;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.7;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      scales[i] = rand() * 1.4 + 0.2;
      speeds[i] = rand() * 1.5 + 0.3;
    }
    return { positions, scales, speeds };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 34 },
      uScroll: { value: 0 },
      uColor: { value: color },
    }),
    [color],
  );

  useFrame((state, delta) => {
    const { pointer, scroll, themeColor2 } = useStore.getState();
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      matRef.current.uniforms.uScroll.value = THREE.MathUtils.lerp(
        matRef.current.uniforms.uScroll.value,
        scroll,
        0.05,
      );
      color.lerp(new THREE.Color(themeColor2), 0.03);
    }
    if (points.current) {
      points.current.rotation.y += delta * 0.02 + scroll * 0.0004;
      points.current.rotation.x = THREE.MathUtils.lerp(
        points.current.rotation.x,
        pointer.y * 0.12,
        0.05,
      );
      points.current.rotation.z = THREE.MathUtils.lerp(
        points.current.rotation.z,
        pointer.x * 0.1,
        0.05,
      );
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
