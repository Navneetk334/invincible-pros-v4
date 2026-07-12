"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/store/useStore";
import { snoise } from "@/lib/glsl";

/**
 * "The Core" — a living, noise-displaced icosahedron rendered with a custom
 * shader (fresnel rim + flowing bands) wrapped in a counter-rotating wireframe
 * shell. Colour, turbulence and rotation are driven by the active domain and
 * by scroll. Designed to be caught by the bloom pass so the rim glows.
 */
export default function Core() {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.LineSegments>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);

  const colorA = useMemo(() => new THREE.Color("#0a1a4d"), []);
  const colorB = useMemo(() => new THREE.Color("#38e1ff"), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDisplace: { value: 0.11 },
      uFreq: { value: 1.4 },
      uColorA: { value: colorA },
      uColorB: { value: colorB },
    }),
    [colorA, colorB],
  );

  const wireGeo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1.5, 2);
    return new THREE.WireframeGeometry(g);
  }, []);

  useFrame((state, delta) => {
    const { pointer, scroll, themeColor, themeColor2 } = useStore.getState();
    const t = state.clock.elapsedTime;

    if (mat.current) {
      const u = mat.current.uniforms;
      u.uTime.value = t;
      // turbulence breathes + reacts to scroll
      u.uDisplace.value = THREE.MathUtils.lerp(
        u.uDisplace.value,
        0.11 + Math.sin(t * 0.6) * 0.025 + scroll * 0.1,
        0.05,
      );
      colorA.lerp(new THREE.Color(themeColor).multiplyScalar(0.5), 0.06);
      colorB.lerp(new THREE.Color(themeColor2), 0.06);
    }

    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.y * 0.35,
        0.04,
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        pointer.x * 0.2,
        0.04,
      );
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.28;
      shell.current.rotation.z += delta * 0.04;
      const s = 1 + Math.sin(t * 0.8) * 0.02;
      shell.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group} scale={0.82}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.2, 48]} />
        <shaderMaterial
          ref={mat}
          uniforms={uniforms}
          vertexShader={/* glsl */ `
            uniform float uTime;
            uniform float uDisplace;
            uniform float uFreq;
            varying vec3 vNormal;
            varying vec3 vView;
            varying float vNoise;
            ${snoise}
            void main() {
              float n = snoise(position * uFreq + uTime * 0.18);
              float n2 = snoise(position * uFreq * 2.1 - uTime * 0.12) * 0.5;
              float d = (n + n2) * uDisplace;
              vNoise = n;
              vec3 pos = position + normal * d;
              vNormal = normalize(normalMatrix * normal);
              vec4 mv = modelViewMatrix * vec4(pos, 1.0);
              vView = -mv.xyz;
              gl_Position = projectionMatrix * mv;
            }
          `}
          fragmentShader={/* glsl */ `
            uniform vec3 uColorA;
            uniform vec3 uColorB;
            uniform float uTime;
            varying vec3 vNormal;
            varying vec3 vView;
            varying float vNoise;
            void main() {
              vec3 v = normalize(vView);
              vec3 nrm = normalize(vNormal);
              float fres = pow(1.0 - max(dot(v, nrm), 0.0), 4.6);
              float bands = 0.5 + 0.5 * sin(vNoise * 5.0 + uTime * 0.7);
              vec3 base = mix(uColorA, uColorB, smoothstep(-0.6, 0.9, vNoise));
              vec3 col = base * (0.04 + bands * 0.07) + uColorB * fres * 1.15;
              gl_FragColor = vec4(col, 1.0);
            }
          `}
        />
      </mesh>

      <lineSegments ref={shell} geometry={wireGeo}>
        <lineBasicMaterial
          color="#7f9bff"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
