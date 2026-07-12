"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/store/useStore";
import { snoise } from "@/lib/glsl";

/**
 * The living surface. A full-screen flowing plasma built from domain-warped
 * fractal noise in the brand palette, with a light rising from the bottom of
 * the frame (the signature Active-Theory atmosphere). Colour is driven by the
 * active domain; the field warps toward the pointer.
 */
export default function FluidBackground() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const cA = useMemo(() => new THREE.Color("#04050a"), []);
  const cB = useMemo(() => new THREE.Color("#4d6bff"), []);
  const cC = useMemo(() => new THREE.Color("#38e1ff"), []);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const tmp = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uColA: { value: cA },
      uColB: { value: cB },
      uColC: { value: cC },
    }),
    [cA, cB, cC],
  );

  useFrame((state) => {
    const u = mat.current?.uniforms;
    if (!u) return;
    const { pointer, scroll, themeColor, themeColor2 } = useStore.getState();
    u.uTime.value = state.clock.elapsedTime;
    u.uRes.value.set(state.size.width, state.size.height);
    mouse.current.lerp(tmp.current.set(pointer.x, pointer.y), 0.04);
    u.uMouse.value.copy(mouse.current);
    u.uScroll.value += (scroll - u.uScroll.value) * 0.05;
    cB.lerp(tmp2.set(themeColor), 0.04);
    cC.lerp(tmp3.set(themeColor2), 0.04);
  });

  return (
    <ScreenQuad>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
        vertexShader={/* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          precision highp float;
          varying vec2 vUv;
          uniform vec2 uRes;
          uniform vec2 uMouse;
          uniform float uTime;
          uniform float uScroll;
          uniform vec3 uColA;
          uniform vec3 uColB;
          uniform vec3 uColC;
          ${snoise}

          // 3-octave fbm — kept cheap for smooth 60fps
          float fbm(vec3 p) {
            float v = 0.0;
            float a = 0.5;
            for (int i = 0; i < 3; i++) {
              v += a * snoise(p);
              p *= 2.0;
              a *= 0.5;
            }
            return v;
          }

          void main() {
            vec2 uv = vUv;
            vec2 p = uv - 0.5;
            p.x *= uRes.x / uRes.y;

            float t = uTime * 0.05;
            vec3 q = vec3(p * 1.5, t);
            q.xy += uMouse * 0.3;

            // two domain-warped fbm passes (6 noise evals total)
            float w = fbm(q + t);
            float n = fbm(q + w * 0.8);

            vec3 col = mix(uColA, uColB, smoothstep(-0.55, 0.75, n));
            col = mix(col, uColC, smoothstep(0.1, 0.9, w) * 0.7);
            col *= 0.4 + 0.7 * smoothstep(-1.0, 1.0, n);

            // light rising from the bottom-centre of the frame
            float d = distance(uv, vec2(0.5, -0.15));
            float rise = smoothstep(1.25, 0.0, d);
            col += rise * uColB * (0.35 + uScroll * 0.15);

            // vignette
            col *= 1.0 - 0.55 * dot(p, p);

            gl_FragColor = vec4(max(col, 0.0), 1.0);
          }
        `}
      />
    </ScreenQuad>
  );
}

// scratch colours reused each frame (module scope keeps them stable & pure)
const tmp2 = new THREE.Color();
const tmp3 = new THREE.Color();
