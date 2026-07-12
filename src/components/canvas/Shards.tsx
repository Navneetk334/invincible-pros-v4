"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/store/useStore";

const COUNT = 72;

/**
 * The signature moment: the core shatters into metallic shards that explode
 * outward as `assembly` rises, then reassemble as it falls. Uses a physically
 * based metal that reflects the procedural environment.
 */
export default function Shards() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const dummyRef = useRef(new THREE.Object3D());
  const smooth = useRef(0);
  const colorRef = useRef(new THREE.Color("#38e1ff"));

  const shards = useMemo(() => {
    // pure hash — no mutable state, stable across renders
    const h = (n: number) => {
      const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    const out: {
      dir: THREE.Vector3;
      reach: number;
      scale: number;
      spin: THREE.Vector3;
      offset: number;
    }[] = [];
    for (let i = 0; i < COUNT; i++) {
      const b = i * 8;
      const theta = h(b) * Math.PI * 2;
      const phi = Math.acos(2 * h(b + 1) - 1);
      out.push({
        dir: new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta),
          Math.sin(phi) * Math.sin(theta),
          Math.cos(phi),
        ),
        reach: 0.6 + h(b + 2) * 0.8,
        scale: 0.06 + h(b + 3) * 0.16,
        spin: new THREE.Vector3(
          (h(b + 4) - 0.5) * 2,
          (h(b + 5) - 0.5) * 2,
          (h(b + 6) - 0.5) * 2,
        ),
        offset: h(b + 7) * Math.PI * 2,
      });
    }
    return out;
  }, []);

  useFrame((state) => {
    const { assembly, themeColor2 } = useStore.getState();
    smooth.current += (assembly - smooth.current) * 0.08;
    const a = smooth.current;
    const t = state.clock.elapsedTime;

    if (mat.current) {
      const c = colorRef.current.set(themeColor2);
      mat.current.color.lerp(c, 0.05);
      mat.current.emissive.lerp(c, 0.05);
    }

    const inst = ref.current;
    if (!inst) return;

    const dummy = dummyRef.current;
    const appear = THREE.MathUtils.smoothstep(a, 0.02, 0.4);
    for (let i = 0; i < COUNT; i++) {
      const s = shards[i];
      const radius = 0.25 + a * 4.4 * s.reach;
      dummy.position.copy(s.dir).multiplyScalar(radius);
      // gentle orbital drift while exploded
      dummy.position.x += Math.sin(t * 0.4 + s.offset) * 0.15 * a;
      dummy.position.y += Math.cos(t * 0.35 + s.offset) * 0.15 * a;
      dummy.rotation.set(
        t * s.spin.x * 0.5 + s.offset,
        t * s.spin.y * 0.5,
        t * s.spin.z * 0.5,
      );
      dummy.scale.setScalar(s.scale * appear);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;
    inst.visible = appear > 0.001;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, COUNT]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        ref={mat}
        color="#38e1ff"
        emissive="#38e1ff"
        emissiveIntensity={0.15}
        metalness={1}
        roughness={0.18}
        envMapIntensity={1.4}
      />
    </instancedMesh>
  );
}
