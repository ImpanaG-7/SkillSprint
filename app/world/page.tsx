"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useRouter } from "next/navigation";

function Ground() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#dff3e4" />
      </mesh>

      <mesh position={[0, -0.08, 0]}>
        <boxGeometry args={[30, 0.2, 30]} />
        <meshStandardMaterial color="#b8d8c0" />
      </mesh>
    </group>
  );
}

function Building({
  position,
  color,
  label,
  width = 4,
  depth = 3,
  height = 2.5,
}: {
  position: [number, number, number];
  color: string;
  label: string;
  width?: number;
  depth?: number;
  height?: number;
}) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position={[0, height + 0.35, 0]}>
        <coneGeometry args={[width * 0.7, 0.7, 4]} />
        <meshStandardMaterial color="#475569" />
      </mesh>

      <Text
        position={[0, height + 0.8, 0]}
        fontSize={0.35}
        color="#172033"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

      <mesh position={[0, 1, depth / 2 + 0.02]}>
        <boxGeometry args={[0.8, 1.4, 0.08]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </group>
  );
}

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.18, 0.25, 1.6, 8]} />
        <meshStandardMaterial color="#8b5a2b" />
      </mesh>

      <mesh position={[0, 1.9, 0]}>
        <sphereGeometry args={[0.9, 12, 12]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>
    </group>
  );
}

function MissionMarker({
  position,
  color,
  label,
}: {
  position: [number, number, number];
  color: string;
  label: string;
}) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>

      <Text
        position={[0, 0.75, 0]}
        fontSize={0.3}
        color="#172033"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function Player({
  keys,
  position,
  setPosition,
}: {
  keys: React.MutableRefObject<Record<string, boolean>>;
  position: [number, number, number];
  setPosition: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
}) {
  const playerRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const speed = 0.09;

    let x = position[0];
    let z = position[2];

    if (keys.current["w"] || keys.current["ArrowUp"]) {
      z -= speed;
    }

    if (keys.current["s"] || keys.current["ArrowDown"]) {
      z += speed;
    }

    if (keys.current["a"] || keys.current["ArrowLeft"]) {
      x -= speed;
    }

    if (keys.current["d"] || keys.current["ArrowRight"]) {
      x += speed;
    }

    x = THREE.MathUtils.clamp(x, -13, 13);
    z = THREE.MathUtils.clamp(z, -13, 13);

    if (x !== position[0] || z !== position[2]) {
      setPosition([x, 0.65, z]);
    }

    if (playerRef.current) {
      playerRef.current.position.set(x, 0.65, z);
    }
  });

  return (
    <group ref={playerRef} position={position}>
      <mesh>
        <capsuleGeometry args={[0.35, 0.7, 6, 12]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>

      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#f8c9a0" />
      </mesh>

      <mesh position={[0, 0.98, 0]}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      <Text
        position={[0, 1.5, 0]}
        fontSize={0.25}
        color="#172033"
        anchorX="center"
        anchorY="middle"
      >
        YOU
      </Text>
    </group>
  );
}

function Campus() {
  const keys = useRef<Record<string, boolean>>({});

  const [position, setPosition] = useState<[number, number, number]>([
    0,
    0.65,
    6,
  ]);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      keys.current[event.key] = true;
    };

    const up = (event: KeyboardEvent) => {
      keys.current[event.key] = false;
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  return (
    <>
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[5, 10, 5]}
        intensity={2}
        castShadow
      />

      <Ground />

      <Building
        position={[-7, 0, -6]}
        color="#fbcfe8"
        label="Learning Center"
        width={5}
        depth={3.5}
      />

      <Building
        position={[7, 0, -6]}
        color="#dbeafe"
        label="Science Lab"
        width={5}
        depth={3.5}
      />

      <Building
        position={[-7, 0, 4]}
        color="#dcfce7"
        label="Eco Center"
        width={5}
        depth={3.5}
      />

      <Building
        position={[7, 0, 4]}
        color="#fef3c7"
        label="Innovation Hub"
        width={5}
        depth={3.5}
      />

      <MissionMarker
        position={[-1.5, 1, -1]}
        color="#06b6d4"
        label="AI Mentor"
      />

      <MissionMarker
        position={[1.5, 1, -1]}
        color="#22c55e"
        label="Water Mission"
      />

      <MissionMarker
        position={[0, 1, 3]}
        color="#f59e0b"
        label="Start Mission"
      />

      <Tree position={[-12, 0, -10]} />
      <Tree position={[-10, 0, 10]} />
      <Tree position={[11, 0, -10]} />
      <Tree position={[11, 0, 10]} />
      <Tree position={[-2, 0, -10]} />
      <Tree position={[3, 0, -10]} />
      <Tree position={[-12, 0, 0]} />
      <Tree position={[12, 0, 0]} />

      <Player
        keys={keys}
        position={position}
        setPosition={setPosition}
      />

      <OrbitControls
        enablePan={false}
        maxPolarAngle={Math.PI / 2.15}
        minDistance={8}
        maxDistance={20}
      />
    </>
  );
}

export default function WorldPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#eef7f0] text-slate-900">
      <header className="border-b border-emerald-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
              Smart Education
            </p>

            <h1 className="text-2xl font-black">
              3D Learning World
            </h1>
          </div>

          <button
            onClick={() => router.push("/learn")}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold transition hover:bg-slate-50"
          >
            Back to Learning Hub
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-6">
        <section className="mb-5 flex flex-col gap-4 rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                PLAYABLE PROTOTYPE
              </span>

              <span className="text-sm text-slate-500">
                Explore • Learn • Discover
              </span>
            </div>

            <h2 className="mt-2 text-2xl font-black">
              Welcome to your virtual campus
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Move your avatar around the campus and discover learning
              missions.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-5 py-3 text-sm">
            <p className="font-bold text-slate-700">
              Controls
            </p>

            <p className="mt-1 text-slate-500">
              W A S D / Arrow Keys to move
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-xl">
          <div className="h-[650px] w-full">
            <Canvas camera={{ position: [0, 12, 16], fov: 55 }}>
              <color attach="background" args={["#dff4ff"]} />

              <Campus />
            </Canvas>
          </div>
        </section>

        <section className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm">
            <div className="text-2xl">🤖</div>

            <h3 className="mt-2 font-black">
              AI Mentor
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Get guidance while exploring the world.
            </p>

            <button
              onClick={() => router.push("/assistant")}
              className="mt-4 text-sm font-bold text-pink-600 hover:text-pink-700"
            >
              Open AI Mentor →
            </button>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <div className="text-2xl">💧</div>

            <h3 className="mt-2 font-black">
              Campus Water Challenge
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Investigate water usage and earn XP.
            </p>

            <button
              onClick={() => router.push("/missions/campus-water")}
              className="mt-4 text-sm font-bold text-emerald-600 hover:text-emerald-700"
            >
              Open Mission →
            </button>
          </div>

          <div className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
            <div className="text-2xl">🏆</div>

            <h3 className="mt-2 font-black">
              Your Progress
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Complete missions and build your learning portfolio.
            </p>

            <button
              onClick={() => router.push("/rewards")}
              className="mt-4 text-sm font-bold text-violet-600 hover:text-violet-700"
            >
              View Rewards →
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
