"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { loopAmount } from "../loop";

type DistortMat = THREE.MeshStandardMaterial & { distort: number };

/** A tangled, distorted knot smooths into a clean, precise form. */
export default function KnotScene() {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<DistortMat>(null);
  const scratch = useRef(new THREE.Color());
  const red = useMemo(() => new THREE.Color("#fb7185"), []);
  const cyan = useMemo(() => new THREE.Color("#38e1ff"), []);

  useFrame((state) => {
    const a = loopAmount(state.clock.elapsedTime);
    const t = state.clock.elapsedTime;
    if (mesh.current) mesh.current.rotation.set(t * 0.15, t * 0.4, 0);
    if (mat.current) {
      mat.current.distort = (1 - a) * 0.6;
      const c = scratch.current.copy(red).lerp(cyan, a);
      mat.current.color.copy(c);
      mat.current.emissive.copy(c);
      mat.current.emissiveIntensity = 0.2 + a * 0.5;
    }
  });

  return (
    <>
      <Environment resolution={128}>
        <Lightformer intensity={2} position={[0, 3, -4]} scale={[10, 6, 1]} color="#9ab6ff" />
        <Lightformer intensity={1.4} position={[-4, -2, 3]} scale={[6, 6, 1]} color="#ffffff" />
      </Environment>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[1.1, 0.34, 180, 24]} />
        <MeshDistortMaterial
          ref={mat as never}
          color="#fb7185"
          emissive="#fb7185"
          emissiveIntensity={0.2}
          metalness={0.7}
          roughness={0.2}
          distort={0.6}
          speed={2.2}
        />
      </mesh>
    </>
  );
}
