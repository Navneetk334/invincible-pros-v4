"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import * as THREE from "three";
import { useStore } from "@/store/useStore";
import ParticleField from "./ParticleField";
import Core from "./Core";
import BackgroundFX from "./BackgroundFX";
import Effects from "./Effects";

/**
 * Scroll-driven camera. Rather than scrolling HTML over a static scene, the
 * camera orbits and dollies around the core as the journey progresses — so
 * the whole page feels like one continuous move through a 3D space.
 */
function Rig() {
  const { camera } = useThree();
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const { pointer, scroll } = useStore.getState();
    const angle = scroll * Math.PI * 1.15; // partial orbit across the story
    const radius = 8.6 - Math.sin(scroll * Math.PI) * 0.9; // dolly in mid-way
    const tx = Math.sin(angle) * radius + pointer.x * 0.8;
    const tz = Math.cos(angle) * radius;
    const ty = pointer.y * 0.6 + Math.sin(scroll * Math.PI * 2.0) * 0.5;
    camera.position.lerp(tmp.set(tx, ty, tz), 0.045);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function SceneCanvas() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8.6], fov: 42 }}
        dpr={[1, 1.8]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          toneMappingExposure: 1.05,
        }}
      >
        <color attach="background" args={["#04050a"]} />
        <Suspense fallback={null}>
          <BackgroundFX />
          <Core />
          <ParticleField />
          <Effects />
        </Suspense>
        <Rig />
      </Canvas>
    </div>
  );
}
