"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/store/useStore";

/**
 * The "digital core" — a morphing icosahedron wrapped in a counter-rotating
 * wireframe shell. Its colour is driven by the currently active domain.
 */
export default function Core() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  // MeshDistortMaterial exposes a mutable `color`; keep a loose ref.
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const shellMat = useRef<THREE.MeshBasicMaterial>(null);

  const targetColor = new THREE.Color("#4d6bff");

  useFrame((state, delta) => {
    const { pointer, scroll, themeColor } = useStore.getState();
    targetColor.set(themeColor);

    if (matRef.current) {
      matRef.current.color.lerp(targetColor, 0.04);
      matRef.current.emissive.lerp(targetColor, 0.04);
    }
    if (shellMat.current) {
      shellMat.current.color.lerp(targetColor, 0.04);
    }

    if (group.current) {
      // gentle scroll-driven descent + pointer parallax
      group.current.rotation.y += delta * 0.15;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.y * 0.3,
        0.04,
      );
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        -scroll * 2.2,
        0.05,
      );
      const s = 1 - scroll * 0.15;
      group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, s, 0.05));
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.25;
      shell.current.rotation.z += delta * 0.05;
    }
    if (inner.current) {
      const m = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
      inner.current.scale.setScalar(m);
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.6}>
      <group ref={group}>
        <mesh ref={inner}>
          <icosahedronGeometry args={[1.25, 24]} />
          <MeshDistortMaterial
            ref={matRef as never}
            color="#4d6bff"
            emissive="#4d6bff"
            emissiveIntensity={0.35}
            roughness={0.2}
            metalness={0.65}
            distort={0.38}
            speed={1.6}
          />
        </mesh>

        <mesh ref={shell} scale={1.55}>
          <icosahedronGeometry args={[1.25, 2]} />
          <meshBasicMaterial
            ref={shellMat}
            color="#38e1ff"
            wireframe
            transparent
            opacity={0.14}
          />
        </mesh>
      </group>
    </Float>
  );
}
