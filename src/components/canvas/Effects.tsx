"use client";

import { useMemo, useRef } from "react";
import { EffectComposer, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction, ChromaticAberrationEffect } from "postprocessing";
import { useFrame } from "@react-three/fiber";
import { Vector2 } from "three";
import { useStore } from "@/store/useStore";

/**
 * Minimal post pass — just a scroll-velocity chromatic aberration so fast
 * scrolling smears the colour channels. Kept to a single cheap effect for
 * performance (grain + vignette are handled by the shader and CSS overlays).
 */
export default function Effects() {
  const ca = useRef<ChromaticAberrationEffect>(null);
  const prev = useRef(0);
  const offset = useMemo(() => new Vector2(0.0005, 0.0005), []);

  useFrame(() => {
    const s = useStore.getState().scroll;
    const speed = Math.min(Math.abs(s - prev.current) * 55, 1);
    prev.current = s;
    const target = 0.0005 + speed * 0.004;
    if (ca.current) {
      const cur = ca.current.offset;
      cur.x += (target - cur.x) * 0.12;
      cur.y = cur.x;
    }
  });

  return (
    <EffectComposer multisampling={0}>
      <ChromaticAberration
        ref={ca}
        blendFunction={BlendFunction.NORMAL}
        offset={offset}
        radialModulation={false}
        modulationOffset={0}
      />
    </EffectComposer>
  );
}
