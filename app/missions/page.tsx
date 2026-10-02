"use client";

import {
  ArrowLeft,
  CheckCircle,
  Droplets,
  Leaf,
  Recycle,
  Trophy,
  Calculator,
  FlaskConical,
  Code2,
  Sprout,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Mission = {
  id: number;
  title: string;
  description: string;
  category: string;
  xp: number;
  difficulty: string;
  icon: React.ReactNode;
};

const missions: Mission[] = [
  {
    id: 1,
    title: "Waste Warrior",
    description:
      "Separate dry and wet waste correctly at your home or campus.",
    category: "Waste Management",
    xp: 50,
    difficulty: "Easy",
    icon: <Recycle size={28} />,
  },
  {
    id: 2,
    title: "Water Saver",
    description:
      "Save water by turning off the tap while brushing your teeth.",
    category: "Water Conservation",
    xp: 40,
    difficulty: "Easy",
    icon: <Droplets size={28} />,
  },
  {
    id: 3,
    title: "Green Campus",
    description:
      "Plant or take care of a tree or plant and help your surroundings stay green.",
    category: "Green Action",
    xp: 100,
    difficulty: "Medium",
    icon: <Leaf size={28} />,
  },
];

export default function MissionsPage() {
  const router = useRouter();

  const [completedMissions, setCompletedMissions] = useState<number[]>([]);
  const [earnedXp, setEarnedXp] = useState(0);

  function completeMission(mission: Mission) {
    if (completedMissions.includes(mission.id)) {
      return;
    }

    setCompletedMissions((previous) => [
      ...previous,
      mission.id,
    ]);

    setEarnedXp((previous) => previous + mission.xp);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-100">
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 font-medium text-green-700 hover:text-green-800"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold tracking-widest text-green-600">
              SMART LEARNING • MISSIONS
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              Learn. Apply. Take Action. 🌱
            </h1>

            <p className="mt-3 max-w-2xl text-lg text-slate-600">
              Turn what you learn into real-world challenges and demonstrate
              your skills through action.
            </p>
          </div>

          {/* XP Card */}
          <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-md">
            <div className="rounded-xl bg-yellow-100 p-3 text-yellow-600">
              <Trophy size={24} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Mission XP
              </p>

              <p className="text-2xl font-bold text-slate-900">
                +{earnedXp} XP
              </p>
            </div>
          </div>
        </div>

        {/* Signature Mission */}
        <section className="mt-10 overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-cyan-400/20 px-3 py-1 text-sm font-bold text-cyan-300">
                  SIGNATURE CHALLENGE
                </span>

                <span className="rounded-full bg-yellow-400/20 px-3 py-1 text-sm font-bold text-yellow-300">
                  +150 XP
                </span>

                <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-slate-300">
                  Medium
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                💧 Campus Water Challenge
              </h2>

              <p className="mt-4 text-lg leading-8 text-slate-300">
                Investigate water usage on your campus and identify one
                opportunity to reduce water wastage.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-2xl bg-white/10 p-4">
                  <Calculator className="mb-2 text-cyan-300" size={22} />
                  <p className="font-bold">Mathematics</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Analyse measurements
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <FlaskConical className="mb-2 text-cyan-300" size={22} />
                  <p className="font-bold">Science</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Understand water usage
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <Code2 className="mb-2 text-cyan-300" size={22} />
                  <p className="font-bold">Computer Science</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Process the data
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <Sprout className="mb-2 text-cyan-300" size={22} />
                  <p className="font-bold">Environment</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Identify a solution
                  </p>
                </div>

              </div>
            </div>

            <div className="shrink-0">
              <button
                type="button"
                onClick={() => router.push("/missions/campus-water")}
                className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-4 font-bold text-slate-900 transition hover:bg-cyan-300"
              >
                Start Challenge
                <ArrowRight size={20} />
              </button>
            </div>

          </div>
        </section>

        {/* Existing Missions */}
        <div className="mt-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Quick Missions
            </h2>

            <p className="mt-1 text-slate-500">
              Complete simple actions and keep building your learning streak.
            </p>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {missions.map((mission) => {
              const completed = completedMissions.includes(
                mission.id
              );

              return (
                <div
                  key={mission.id}
                  className="flex flex-col rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Icon */}
                  <div className="flex items-start justify-between">
                    <div className="rounded-2xl bg-green-100 p-4 text-green-600">
                      {mission.icon}
                    </div>

                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-bold text-yellow-700">
                      +{mission.xp} XP
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-green-600">
                      {mission.category}
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-900">
                      {mission.title}
                    </h2>

                    <p className="mt-3 leading-7 text-slate-600">
                      {mission.description}
                    </p>
                  </div>

                  {/* Difficulty */}
                  <div className="mt-5">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                      {mission.difficulty}
                    </span>
                  </div>

                  {/* Complete Button */}
                  <button
                    type="button"
                    onClick={() => completeMission(mission)}
                    disabled={completed}
                    className={`mt-6 flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold transition ${
                      completed
                        ? "cursor-not-allowed bg-green-100 text-green-700"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {completed ? (
                      <>
                        <CheckCircle size={20} />
                        Mission Completed
                      </>
                    ) : (
                      "Complete Mission"
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-10 rounded-3xl bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Your Mission Progress
              </h2>

              <p className="mt-1 text-slate-500">
                Complete missions to earn XP and unlock rewards.
              </p>
            </div>

            <span className="font-bold text-green-600">
              {completedMissions.length}/{missions.length}
            </span>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{
                width: `${
                  (completedMissions.length /
                    missions.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

      </div>
    </main>
  );
}