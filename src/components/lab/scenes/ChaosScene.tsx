"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { loopAmount } from "../loop";

const COUNT = 280;

/** Scattered fragments (the problem) assemble into an ordered glowing core. */
export default function ChaosScene() {
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
    const out: {
      chaos: THREE.Vector3;
      order: THREE.Vector3;
      sc: number;
      spin: THREE.Vector3;
      off: number;
    }[] = [];
    for (let i = 0; i < COUNT; i++) {
      const cx = (h(i * 3) - 0.5) * 9;
      const cy = (h(i * 3 + 1) - 0.5) * 6;
      const cz = (h(i * 3 + 2) - 0.5) * 9;
      // fibonacci sphere for an even, ordered shell
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / COUNT);
      const th = Math.PI * (1 + Math.sqrt(5)) * k;
      const r = 1.95;
      out.push({
        chaos: new THREE.Vector3(cx, cy, cz),
        order: new THREE.Vector3(
          r * Math.cos(th) * Math.sin(phi),
          r * Math.sin(th) * Math.sin(phi),
          r * Math.cos(phi),
        ),
        sc: 0.06 + h(i * 5) * 0.12,
        spin: new THREE.Vector3(
          h(i * 7) - 0.5,
          h(i * 7 + 1) - 0.5,
          h(i * 7 + 2) - 0.5,
        ),
        off: h(i * 11) * 6.283,
      });
    }
    return out;
  }, []);

  useFrame((state) => {
    const a = loopAmount(state.clock.elapsedTime);
    const t = state.clock.elapsedTime;
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
      const spin = drift * 1.5 + 0.1;
      d.rotation.set(t * s.spin.x * spin, t * s.spin.y * spin, t * s.spin.z * spin);
      d.scale.setScalar(s.sc * (0.6 + a * 0.7));
      d.updateMatrix();
      m.setMatrixAt(i, d.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
    m.rotation.y = t * 0.15;

    if (mat.current) {
      const c = scratch.current.copy(red).lerp(cyan, a);
      mat.current.color.copy(c);
      mat.current.emissive.copy(c);
      mat.current.emissiveIntensity = 0.35 + a * 0.65;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        ref={mat}
        color="#fb7185"
        emissive="#fb7185"
        emissiveIntensity={0.35}
        metalness={0.4}
        roughness={0.3}
      />
    </instancedMesh>
  );
}
