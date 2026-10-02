"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  Droplets,
  GraduationCap,
  Map,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

type Mission = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
};

const missions: Mission[] = [
  {
    id: "ai",
    title: "AI Mentor",
    description: "Ask questions and learn with your AI mentor.",
    icon: <Bot className="h-4 w-4" />,
    href: "/assistant",
    color: "bg-pink-100 text-pink-700",
  },
  {
    id: "water",
    title: "Water Mission",
    description: "Investigate campus water usage.",
    icon: <Droplets className="h-4 w-4" />,
    href: "/missions/campus-water",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "rewards",
    title: "Rewards",
    description: "View your achievements and XP.",
    icon: <Trophy className="h-4 w-4" />,
    href: "/rewards",
    color: "bg-amber-100 text-amber-700",
  },
];

function CampusBuilding({
  position,
  color,
  width,
  depth,
  height,
  label,
}: {
  position: [number, number, number];
  color: string;
  width: number;
  depth: number;
  height: number;
  label: string;
}) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position={[0, height + 0.08, 0]} castShadow>
        <boxGeometry args={[width + 0.25, 0.16, depth + 0.25]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      <Text
        position={[0, height + 0.65, depth / 2 + 0.05]}
        rotation={[0, 0, 0]}
        fontSize={0.28}
        color="#1e293b"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

      {/* Windows */}
      {[-1, 0, 1].map((x) => (
        <mesh
          key={x}
          position={[
            x * Math.min(width / 3, 1.1),
            height * 0.58,
            depth / 2 + 0.02,
          ]}
        >
          <boxGeometry args={[0.35, 0.42, 0.05]} />
          <meshStandardMaterial color="#dbeafe" />
        </mesh>
      ))}
    </group>
  );
}

function Tree({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.17, 1.4, 8]} />
        <meshStandardMaterial color="#92400e" />
      </mesh>

      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.72, 12, 12]} />
        <meshStandardMaterial color="#65a30d" />
      </mesh>
    </group>
  );
}

function MissionMarker({
  position,
  color,
  label,
  onClick,
}: {
  position: [number, number, number];
  color: string;
  label: string;
  onClick: () => void;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.08;
  });

  return (
    <group
      ref={ref}
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      <mesh castShadow>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.12} />
      </mesh>

      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.7, 8]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>

      <Text
        position={[0, 0.55, 0]}
        fontSize={0.22}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function StudentAvatar({
  position,
  onMove,
}: {
  position: React.MutableRefObject<THREE.Vector3>;
  onMove: (position: THREE.Vector3) => void;
}) {
  const group = useRef<THREE.Group>(null);

  const keys = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      keys.current[event.key.toLowerCase()] = true;
    };

    const up = (event: KeyboardEvent) => {
      keys.current[event.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;

    const speed = 4 * delta;

    let moved = false;

    if (keys.current["w"] || keys.current["arrowup"]) {
      position.current.z -= speed;
      moved = true;
    }

    if (keys.current["s"] || keys.current["arrowdown"]) {
      position.current.z += speed;
      moved = true;
    }

    if (keys.current["a"] || keys.current["arrowleft"]) {
      position.current.x -= speed;
      moved = true;
    }

    if (keys.current["d"] || keys.current["arrowright"]) {
      position.current.x += speed;
      moved = true;
    }

    position.current.x = THREE.MathUtils.clamp(position.current.x, -14, 14);
    position.current.z = THREE.MathUtils.clamp(position.current.z, -9, 9);

    group.current.position.copy(position.current);

    if (moved) {
      group.current.rotation.y = Math.atan2(
        position.current.x - group.current.position.x,
        position.current.z - group.current.position.z
      );
    }

    onMove(position.current);
  });

  return (
    <group ref={group} position={position.current}>
      {/* Body */}
      <mesh position={[0, 0.65, 0]} castShadow>
        <capsuleGeometry args={[0.32, 0.55, 6, 12]} />
        <meshStandardMaterial color="#7c3aed" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.35, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#f3c7a6" />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.31, 16, 10]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.16, 0.12, 0]} castShadow>
        <boxGeometry args={[0.2, 0.18, 0.35]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      <mesh position={[0.16, 0.12, 0]} castShadow>
        <boxGeometry args={[0.2, 0.18, 0.35]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  );
}

function CampusScene({
  onMissionClick,
}: {
  onMissionClick: (mission: Mission) => void;
}) {
  const avatarPosition = useRef(new THREE.Vector3(0, 0, 5));

  const [, setAvatarPosition] = useState({
    x: 0,
    z: 5,
  });

  const handleMove = (position: THREE.Vector3) => {
    setAvatarPosition({
      x: position.x,
      z: position.z,
    });
  };

  return (
    <>
      <ambientLight intensity={1.2} />

      <directionalLight
        position={[8, 12, 8]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Ground */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        position={[0, -0.05, 0]}
      >
        <planeGeometry args={[32, 22]} />
        <meshStandardMaterial color="#dbe7d2" />
      </mesh>

      {/* Main paths */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
      >
        <planeGeometry args={[4, 22]} />
        <meshStandardMaterial color="#e7e5e4" />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.012, 0]}
      >
        <planeGeometry args={[32, 3]} />
        <meshStandardMaterial color="#e7e5e4" />
      </mesh>

      {/* Buildings */}
      <CampusBuilding
        position={[-8, 0, -5]}
        color="#fef3c7"
        width={4}
        depth={3}
        height={2.8}
        label="Learning Center"
      />

      <CampusBuilding
        position={[8, 0, -5]}
        color="#dbeafe"
        width={4}
        depth={3}
        height={2.8}
        label="Science Lab"
      />

      <CampusBuilding
        position={[-8, 0, 5]}
        color="#dcfce7"
        width={4}
        depth={3}
        height={2.8}
        label="Eco Center"
      />

      <CampusBuilding
        position={[8, 0, 5]}
        color="#fce7f3"
        width={4}
        depth={3}
        height={2.8}
        label="Innovation Hub"
      />

      {/* Trees */}
      <Tree position={[-3, 0, -7]} />
      <Tree position={[3, 0, -7]} scale={0.9} />
      <Tree position={[-4, 0, 7]} scale={0.85} />
      <Tree position={[4, 0, 7]} />
      <Tree position={[-13, 0, 0]} scale={0.8} />
      <Tree position={[13, 0, 0]} scale={0.8} />

      {/* Mission markers */}
      <MissionMarker
        position={[-2.5, 1.1, -2]}
        color="#ec4899"
        label="AI Mentor"
        onClick={() => onMissionClick(missions[0])}
      />

      <MissionMarker
        position={[2.5, 1.1, 2]}
        color="#3b82f6"
        label="Water Mission"
        onClick={() => onMissionClick(missions[1])}
      />

      <MissionMarker
        position={[0, 1.1, -5]}
        color="#f59e0b"
        label="Rewards"
        onClick={() => onMissionClick(missions[2])}
      />

      {/* Student */}
      <StudentAvatar
        position={avatarPosition}
        onMove={handleMove}
      />

      {/* Camera */}
      <OrbitControls
        enablePan
        enableZoom
        minDistance={8}
        maxDistance={24}
        maxPolarAngle={Math.PI / 2.15}
        target={[0, 0, 0]}
      />
    </>
  );
}

export default function WorldPage() {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(
    null
  );

  const controlsText = useMemo(
    () => [
      "W / ↑",
      "S / ↓",
      "A / ←",
      "D / →",
    ],
    []
  );

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-slate-900">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 pb-6 pt-10 md:px-10 md:pt-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
              <Map className="h-4 w-4" />
              3D Learning World
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Explore.
              <span className="block text-slate-500">
                Learn by doing.
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Explore the learning campus, discover interactive missions and
              connect your learning with real-world problems.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                <GraduationCap className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-950">
                  Student World
                </p>

                <p className="text-xs text-slate-500">
                  Explore the campus
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* World */}
      <section className="mx-auto max-w-7xl px-6 pb-10 md:px-10">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* World toolbar */}
          <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
            <div>
              <h2 className="font-bold text-slate-950">
                Campus Explorer
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Click a mission marker to open it.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {controlsText.map((control) => (
                <span
                  key={control}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600"
                >
                  {control}
                </span>
              ))}

              <span className="rounded-lg bg-slate-950 px-2.5 py-1.5 text-xs font-medium text-white">
                Move
              </span>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative h-[520px] bg-[#eef3eb] md:h-[650px]">
            <Canvas
              shadows
              camera={{
                position: [15, 14, 17],
                fov: 45,
              }}
            >
              <CampusScene
                onMissionClick={setSelectedMission}
              />
            </Canvas>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                Mission markers
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="h-2.5 w-2.5 rounded-full bg-pink-500" />
                  AI Mentor
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  Water Mission
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  Rewards
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission cards */}
      <section className="mx-auto max-w-7xl px-6 pb-14 md:px-10">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            What you can discover
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
            Learning destinations
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {missions.map((mission) => (
            <Link
              href={mission.href}
              key={mission.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${mission.color}`}
                >
                  {mission.icon}
                </div>

                <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-600" />
              </div>

              <h3 className="mt-5 font-bold text-slate-950">
                {mission.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {mission.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Mission modal */}
      {selectedMission && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-5 backdrop-blur-sm"
          onClick={() => setSelectedMission(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${selectedMission.color}`}
              >
                {selectedMission.icon}
              </div>

              <button
                type="button"
                onClick={() => setSelectedMission(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-950">
              {selectedMission.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {selectedMission.description}
            </p>

            <div className="mt-6 flex items-center gap-2 rounded-xl bg-[#f8f7f4] p-3">
              <Zap className="h-4 w-4 text-amber-500" />

              <span className="text-sm text-slate-600">
                Visit this destination to continue your learning journey.
              </span>
            </div>

            <Link
              href={selectedMission.href}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Open {selectedMission.title}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}