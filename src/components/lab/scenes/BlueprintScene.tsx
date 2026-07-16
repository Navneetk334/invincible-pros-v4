"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { loopAmount } from "../loop";

/** A wireframe blueprint draws itself, then materialises into a solid object. */
export default function BlueprintScene() {
  const wire = useRef<THREE.LineSegments>(null);
  const solid = useRef<THREE.Mesh>(null);
  const wireMat = useRef<THREE.LineBasicMaterial>(null);
  const solidMat = useRef<THREE.MeshStandardMaterial>(null);
  const scratch = useRef(new THREE.Color());
  const cyan = useMemo(() => new THREE.Color("#38e1ff"), []);
  const violet = useMemo(() => new THREE.Color("#7c5cff"), []);

  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.7, 1), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);

  useFrame((state) => {
    const a = loopAmount(state.clock.elapsedTime);
    const t = state.clock.elapsedTime;

    const wa = Math.min(1, a / 0.6); // wireframe builds first
    if (wire.current) {
      wire.current.scale.setScalar(0.4 + wa * 0.6);
      wire.current.rotation.set(t * 0.12, t * 0.3, 0);
    }
    if (wireMat.current) {
      wireMat.current.opacity = a < 0.7 ? wa * 0.9 : Math.max(0, ((1 - a) / 0.3) * 0.9);
    }

    const sa = Math.max(0, (a - 0.6) / 0.4); // solid materialises last
    if (solid.current) {
      solid.current.scale.setScalar(0.92 + sa * 0.08);
      solid.current.rotation.set(t * 0.12, t * 0.3, 0);
    }
    if (solidMat.current) {
      solidMat.current.opacity = sa;
      solidMat.current.emissiveIntensity = sa * 0.55;
      const c = scratch.current.copy(cyan).lerp(violet, sa);
      solidMat.current.color.copy(c);
      solidMat.current.emissive.copy(c);
    }
  });

  return (
    <>
      <Environment resolution={128}>
        <Lightformer intensity={2} position={[0, 3, -4]} scale={[10, 6, 1]} color="#9ab6ff" />
        <Lightformer intensity={1.5} position={[-4, -2, 3]} scale={[6, 6, 1]} color="#ffffff" />
      </Environment>

      <lineSegments ref={wire} geometry={edges}>
        <lineBasicMaterial
          ref={wireMat}
          color="#38e1ff"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      <mesh ref={solid} geometry={geo}>
        <meshStandardMaterial
          ref={solidMat}
          color="#38e1ff"
          emissive="#38e1ff"
          emissiveIntensity={0}
          metalness={0.9}
          roughness={0.18}
          transparent
          opacity={0}
        />
      </mesh>

      <gridHelper args={[18, 18, "#2a3a66", "#141f3a"]} position={[0, -2.3, 0]} />
    </>
  );
}
