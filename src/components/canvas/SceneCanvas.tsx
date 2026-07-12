"use client";

import { Canvas } from "@react-three/fiber";
import { useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { useStore } from "@/store/useStore";
import ParticleField from "./ParticleField";
import Core from "./Core";
import BackgroundFX from "./BackgroundFX";

/** Camera parallax rig — eases toward the pointer for depth. */
function Rig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    const { pointer } = useStore.getState();
    target.current.set(pointer.x * 1.1, pointer.y * 0.8, 6);
    camera.position.lerp(target.current, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function ThemeLights() {
  const l1 = useRef<THREE.PointLight>(null);
  const l2 = useRef<THREE.PointLight>(null);
  const c1 = new THREE.Color();
  const c2 = new THREE.Color();

  useFrame(() => {
    const { themeColor, themeColor2 } = useStore.getState();
    if (l1.current) l1.current.color.lerp(c1.set(themeColor), 0.04);
    if (l2.current) l2.current.color.lerp(c2.set(themeColor2), 0.04);
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight ref={l1} position={[5, 5, 5]} intensity={55} distance={30} />
      <pointLight
        ref={l2}
        position={[-6, -3, 2]}
        intensity={40}
        distance={30}
      />
    </>
  );
}

export default function SceneCanvas() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#05060a"]} />
        <fog attach="fog" args={["#05060a", 10, 34]} />
        <Suspense fallback={null}>
          <BackgroundFX />
          <ThemeLights />
          <Core />
          <ParticleField />
        </Suspense>
        <Rig />
      </Canvas>
    </div>
  );
}
