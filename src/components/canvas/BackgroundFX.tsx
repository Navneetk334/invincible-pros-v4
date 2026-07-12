"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BackSide, Color, ShaderMaterial } from "three";
import { useStore } from "@/store/useStore";

/**
 * A large inward-facing sphere with a soft vertical gradient that subtly
 * absorbs the active domain colour — giving the whole scene atmosphere.
 */
export default function BackgroundFX() {
  const mat = useRef<ShaderMaterial>(null);
  const tint = useMemo(() => new Color("#4d6bff"), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTint: { value: tint },
      uTop: { value: new Color("#05060a") },
      uBottom: { value: new Color("#0a0d18") },
    }),
    [tint],
  );

  useFrame((state) => {
    const { themeColor } = useStore.getState();
    if (mat.current) {
      mat.current.uniforms.uTime.value = state.clock.elapsedTime;
      tint.lerp(new Color(themeColor), 0.02);
    }
  });

  return (
    <mesh scale={40}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        ref={mat}
        side={BackSide}
        uniforms={uniforms}
        vertexShader={/* glsl */ `
          varying vec3 vPos;
          void main() {
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          varying vec3 vPos;
          uniform float uTime;
          uniform vec3 uTint;
          uniform vec3 uTop;
          uniform vec3 uBottom;
          void main() {
            float h = normalize(vPos).y * 0.5 + 0.5;
            vec3 base = mix(uBottom, uTop, h);
            // faint drifting glow band
            float band = 0.12 * (0.5 + 0.5 * sin(uTime * 0.15 + normalize(vPos).x * 3.0));
            vec3 col = base + uTint * band * 0.35;
            gl_FragColor = vec4(col, 1.0);
          }
        `}
      />
    </mesh>
  );
}
