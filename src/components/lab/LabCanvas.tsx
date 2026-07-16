"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import ChaosScene from "./scenes/ChaosScene";
import BlueprintScene from "./scenes/BlueprintScene";
import KnotScene from "./scenes/KnotScene";

const SCENES = {
  chaos: ChaosScene,
  blueprint: BlueprintScene,
  knot: KnotScene,
} as const;

export type LabScene = keyof typeof SCENES;

export default function LabCanvas({ scene }: { scene: LabScene }) {
  const Scene = SCENES[scene];
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#05060a"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={40} distance={30} />
      <pointLight position={[-5, -3, 2]} intensity={25} distance={30} />
      <Suspense fallback={null}>
        <Scene />
        <EffectComposer multisampling={0}>
          <Bloom
            mipmapBlur
            intensity={0.9}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.3}
            radius={0.7}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
