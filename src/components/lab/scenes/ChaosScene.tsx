"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { loopAmount } from "../loop";

const COUNT = 950;

type Particle = {
  chaos: THREE.Vector3;
  order: THREE.Vector3;
  sc: number;
  spin: THREE.Vector3;
  off: number;
};

/** Sample points from the rendered wordmark so the particles can form it. */
function sampleText(lines: string[], count: number): THREE.Vector3[] {
  const W = 1000;
  const H = 420;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 150px "Space Grotesk", Arial, sans-serif`;
  lines.forEach((ln, i) => {
    ctx.fillText(ln, W / 2, H * ((i + 0.5) / lines.length));
  });
  const img = ctx.getImageData(0, 0, W, H).data;
  const pts: [number, number][] = [];
  for (let y = 0; y < H; y += 3) {
    for (let x = 0; x < W; x += 3) {
      if (img[(y * W + x) * 4 + 3] > 128) pts.push([x, y]);
    }
  }
  if (pts.length === 0) return [];
  const scale = 5.2 / W;
  const out: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const [px, py] = pts[Math.floor((i / count) * pts.length)];
    out.push(
      new THREE.Vector3(
        (px - W / 2) * scale,
        -(py - H / 2) * scale,
        (Math.random() - 0.5) * 0.12,
      ),
    );
  }
  return out;
}

/** Scattered fragments (many problems) assemble into the INVINCIBLE PROS. logo. */
export default function ChaosScene() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const dummy = useRef(new THREE.Object3D());
  const pos = useRef(new THREE.Vector3());
  const scratch = useRef(new THREE.Color());
  const red = useMemo(() => new THREE.Color("#fb7185"), []);
  const cyan = useMemo(() => new THREE.Color("#38e1ff"), []);
  const dataRef = useRef<Particle[] | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const build = () => {
      const order = sampleText(["INVINCIBLE", "PROS."], COUNT);
      if (order.length === 0 || cancelled) return;
      const arr: Particle[] = [];
      for (let i = 0; i < COUNT; i++) {
        arr.push({
          chaos: new THREE.Vector3(
            (Math.random() - 0.5) * 11,
            (Math.random() - 0.5) * 6.5,
            (Math.random() - 0.5) * 10,
          ),
          order: order[i],
          sc: 0.03 + Math.random() * 0.045,
          spin: new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5,
          ),
          off: Math.random() * 6.283,
        });
      }
      dataRef.current = arr;
      setReady(true);
    };
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.load('700 150px "Space Grotesk"').catch(() => {});
      document.fonts.ready.then(build).catch(build);
    } else {
      build();
    }
    return () => {
      cancelled = true;
    };
  }, []);

  useFrame((state) => {
    if (!ready || !dataRef.current) return;
    const data = dataRef.current;
    const a = loopAmount(state.clock.elapsedTime);
    const t = state.clock.elapsedTime;
    const m = mesh.current;
    const d = dummy.current;
    if (!m) return;

    const drift = 1 - a;
    for (let i = 0; i < COUNT; i++) {
      const s = data[i];
      pos.current.lerpVectors(s.chaos, s.order, a);
      pos.current.x += Math.sin(t * 0.6 + s.off) * 0.28 * drift;
      pos.current.y += Math.cos(t * 0.5 + s.off) * 0.28 * drift;
      d.position.copy(pos.current);
      const spin = drift * 1.2 + 0.05;
      d.rotation.set(t * s.spin.x * spin, t * s.spin.y * spin, t * s.spin.z * spin);
      d.scale.setScalar(s.sc * (0.55 + a * 0.75));
      d.updateMatrix();
      m.setMatrixAt(i, d.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
    // sway while chaotic, settle flat (facing camera) once the logo forms
    m.rotation.y = Math.sin(t * 0.25) * 0.32 * drift;

    if (mat.current) {
      const c = scratch.current.copy(red).lerp(cyan, a);
      mat.current.color.copy(c);
      mat.current.emissive.copy(c);
      mat.current.emissiveIntensity = 0.3 + a * 0.7;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]} visible={ready}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        ref={mat}
        color="#fb7185"
        emissive="#fb7185"
        emissiveIntensity={0.3}
        metalness={0.4}
        roughness={0.3}
      />
    </instancedMesh>
  );
}
