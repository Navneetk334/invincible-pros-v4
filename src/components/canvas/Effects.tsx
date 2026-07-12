"use client";

import { useMemo, useRef } from "react";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction, ChromaticAberrationEffect } from "postprocessing";
import { useFrame } from "@react-three/fiber";
import { Vector2 } from "three";
import { useStore } from "@/store/useStore";

/**
 * Cinematic post pipeline. Chromatic aberration reacts to scroll velocity so
 * fast scrolling smears the colour channels — a signature "interactive film"
 * touch used across the reference sites.
 */
export default function Effects() {
  const ca = useRef<ChromaticAberrationEffect>(null);
  const prev = useRef(0);
  const offset = useMemo(() => new Vector2(0.0006, 0.0006), []);

  useFrame(() => {
    const s = useStore.getState().scroll;
    const speed = Math.min(Math.abs(s - prev.current) * 55, 1);
    prev.current = s;
    const target = 0.0006 + speed * 0.005;
    if (ca.current) {
      const cur = ca.current.offset;
      cur.x += (target - cur.x) * 0.12;
      cur.y = cur.x;
    }
  });

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        mipmapBlur
        intensity={0.32}
        luminanceThreshold={0.55}
        luminanceSmoothing={0.25}
        radius={0.7}
      />
      <ChromaticAberration
        ref={ca}
        blendFunction={BlendFunction.NORMAL}
        offset={offset}
        radialModulation={false}
        modulationOffset={0}
      />
      <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.22} />
      <Vignette eskil={false} offset={0.32} darkness={0.82} />
    </EffectComposer>
  );
}
