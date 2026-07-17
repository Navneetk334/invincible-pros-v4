"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { preload, smooth } from "./preloadState";

const COUNT = 600;

type Particle = {
  chaos: THREE.Vector3;
  order: THREE.Vector3;
  sc: number;
  spin: THREE.Vector3;
  off: number;
};

/**
 * One-shot intro: scattered fragments (many problems) converge into a compact
 * glowing cluster (one solution) and dissolve. The crisp white wordmark then
 * fades in over the canvas (handled in Preloader). Progress is driven by
 * `preload.prog` so it plays once and stops — no looping.
 */
export default function PreloaderScene() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const dummy = useRef(new THREE.Object3D());
  const pos = useRef(new THREE.Vector3());
  const scratch = useRef(new THREE.Color());
  const red = useMemo(() => new THREE.Color("#fb7185"), []);
  const cyan = useMemo(() => new THREE.Color("#38e1ff"), []);

  const data = useMemo(() => {
    const h = (n: number) => {
      const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    const out: Particle[] = [];
    for (let i = 0; i < COUNT; i++) {
      const r = 0.6 * Math.cbrt(h(i * 5));
      const th = h(i * 7) * Math.PI * 2;
      const ph = Math.acos(2 * h(i * 7 + 1) - 1);
      out.push({
        chaos: new THREE.Vector3(
          (h(i * 3) - 0.5) * 11,
          (h(i * 3 + 1) - 0.5) * 6.5,
          (h(i * 3 + 2) - 0.5) * 10,
        ),
        order: new THREE.Vector3(
          r * Math.sin(ph) * Math.cos(th),
          r * Math.sin(ph) * Math.sin(th),
          r * Math.cos(ph),
        ),
        sc: 0.05 + h(i * 11) * 0.08,
        spin: new THREE.Vector3(
          h(i * 13) - 0.5,
          h(i * 13 + 1) - 0.5,
          h(i * 13 + 2) - 0.5,
        ),
        off: h(i * 17) * 6.283,
      });
    }
    return out;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const prog = preload.prog;
    const a = smooth((prog - 0.1) / 0.42); // converge over prog 0.1–0.52
    const m = mesh.current;
    const d = dummy.current;
    if (!m) return;

    const drift = 1 - a;
    for (let i = 0; i < COUNT; i++) {
      const s = data[i];
      pos.current.lerpVectors(s.chaos, s.order, a);
      pos.current.x += Math.sin(t * 0.6 + s.off) * 0.3 * drift;
      pos.current.y += Math.cos(t * 0.5 + s.off) * 0.3 * drift;
      d.position.copy(pos.current);
      const spin = drift * 1.2 + 0.1;
      d.rotation.set(t * s.spin.x * spin, t * s.spin.y * spin, t * s.spin.z * spin);
      d.scale.setScalar(s.sc * (0.7 + a * 0.5));
      d.updateMatrix();
      m.setMatrixAt(i, d.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
    m.rotation.y = Math.sin(t * 0.25) * 0.3 * drift;

    if (mat.current) {
      const c = scratch.current.copy(red).lerp(cyan, a);
      mat.current.color.copy(c);
      mat.current.emissive.copy(c);
      mat.current.emissiveIntensity = 0.3 + a * 0.5;
      // dissolve the cluster before the wordmark appears
      const op = prog < 0.5 ? 1 : 1 - smooth((prog - 0.5) / 0.12);
      mat.current.opacity = op;
      m.visible = op > 0.02;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        ref={mat}
        color="#fb7185"
        emissive="#fb7185"
        emissiveIntensity={0.3}
        metalness={0.4}
        roughness={0.3}
        transparent
        opacity={1}
      />
    </instancedMesh>
  );
}
