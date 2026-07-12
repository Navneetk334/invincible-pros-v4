"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import FluidBackground from "./FluidBackground";
import Effects from "./Effects";

export default function SceneCanvas() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <FluidBackground />
          <Effects />
        </Suspense>
      </Canvas>
    </div>
  );
}
