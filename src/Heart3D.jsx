
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";

function HeartShape() {
  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
      <group rotation={[0, 0, Math.PI]}>
        <mesh position={[-0.35, 0.15, 0]}>
          <sphereGeometry args={[0.65, 32, 32]} />
          <meshStandardMaterial color="#ef4444" roughness={0.4} />
        </mesh>

        <mesh position={[0.35, 0.15, 0]}>
          <sphereGeometry args={[0.65, 32, 32]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} />
        </mesh>

        <mesh position={[0, -0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[1.15, 1.15, 0.85]} />
          <meshStandardMaterial color="#e11d48" roughness={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Heart3D() {
  return (
    <div style={{
      width: "100%",
      height: "350px",
      borderRadius: "22px",
      background: "radial-gradient(circle, #172554, #020617)",
      overflow: "hidden"
    }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={1.3} />
        <pointLight position={[3, 3, 3]} intensity={25} color="#67e8f9" />
        <Suspense fallback={null}>
          <HeartShape />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
