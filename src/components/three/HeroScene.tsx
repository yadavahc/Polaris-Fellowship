"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

/** Subtle mouse parallax for the whole field. */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      x * 0.15,
      0.04
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -y * 0.1,
      0.04
    );
  });
  return <group ref={group}>{children}</group>;
}

function Field() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.01;
  });
  return (
    <group ref={ref}>
      {/* Two layered starfields for depth — clean, monochrome, no clutter. */}
      <Stars radius={70} depth={50} count={1800} factor={3.5} saturation={0} fade speed={0.6} />
      <Stars radius={120} depth={80} count={900} factor={6} saturation={0} fade speed={0.3} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 60 }}
    >
      <Suspense fallback={null}>
        <Rig>
          <Field />
        </Rig>
      </Suspense>
    </Canvas>
  );
}
