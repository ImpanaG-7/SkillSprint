"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Droplets,
  Flame,
  Lock,
  MapPin,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

type Mission = {
  id: number;
  title: string;
  description: string;
  category: string;
  xp_reward: number;
  difficulty: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [completedMissionIds, setCompletedMissionIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMissions() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data: missionData } = await supabase
          .from("missions")
          .select(
            "id, title, description, category, xp_reward, difficulty"
          )
          .order("created_at", { ascending: true });

        setMissions(missionData || []);

        if (user) {
          const { data: submissions } = await supabase
            .from("mission_submissions")
            .select("mission_id")
            .eq("user_id", user.id)
            .eq("status", "completed");

          setCompletedMissionIds(
            (submissions || []).map((item) => Number(item.mission_id))
          );
        }
      } catch (error) {
        console.error("Failed to load missions:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMissions();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-slate-900">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-10 md:px-10 md:pt-14">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600">
              <Target className="h-4 w-4" />
              Mission Hub
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Learn by solving
              <span className="block text-slate-500">
                real-world challenges.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Complete practical missions, collect evidence, demonstrate
              skills and earn XP as you learn.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
                <Zap className="h-4 w-4" />
                Earn XP
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="h-4 w-4" />
                Build evidence
              </div>
            </div>
          </div>

          {/* Mission principle */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Trophy className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-950">
              Every mission builds a skill
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Missions connect classroom knowledge with practical problems.
              Your completed work becomes part of your learning journey.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-slate-50 p-3 text-center">
                <Target className="mx-auto h-4 w-4 text-slate-500" />
                <p className="mt-2 text-xs font-semibold text-slate-700">
                  Solve
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 text-center">
                <MapPin className="mx-auto h-4 w-4 text-slate-500" />
                <p className="mt-2 text-xs font-semibold text-slate-700">
                  Observe
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 text-center">
                <Trophy className="mx-auto h-4 w-4 text-slate-500" />
                <p className="mt-2 text-xs font-semibold text-slate-700">
                  Earn
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missions */}
      <section className="mx-auto max-w-7xl px-6 pb-14 md:px-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Available missions
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              Choose your challenge
            </h2>
          </div>

          <span className="hidden text-sm text-slate-500 md:block">
            {missions.length} mission{missions.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />
            <p className="mt-4 text-sm text-slate-500">
              Loading missions...
            </p>
          </div>
        ) : missions.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <Target className="mx-auto h-10 w-10 text-slate-300" />

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No missions available yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              New learning challenges will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {missions.map((mission) => {
              const completed = completedMissionIds.includes(mission.id);

              const isWaterMission =
                mission.title.toLowerCase().includes("water");

              const missionHref = isWaterMission
                ? "/missions/campus-water"
                : "#";

              return (
                <div
                  key={mission.id}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        isWaterMission
                          ? "bg-cyan-100 text-cyan-700"
                          : "bg-violet-100 text-violet-700"
                      }`}
                    >
                      {isWaterMission ? (
                        <Droplets className="h-5 w-5" />
                      ) : (
                        <Target className="h-5 w-5" />
                      )}
                    </div>

                    {completed ? (
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Completed
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                        <Flame className="h-3.5 w-3.5" />
                        Available
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {mission.category}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {mission.difficulty}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-slate-950">
                      {mission.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {mission.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50">
                        <Zap className="h-4 w-4 text-amber-600" />
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">Reward</p>
                        <p className="text-sm font-bold text-slate-900">
                          +{mission.xp_reward} XP
                        </p>
                      </div>
                    </div>

                    {isWaterMission ? (
                      <Link
                        href={missionHref}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        {completed ? "View Mission" : "Start Mission"}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400"
                      >
                        <Lock className="h-4 w-4" />
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* How missions work */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              How it works
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              From challenge to achievement
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                number: "01",
                title: "Explore",
                text: "Understand the real-world problem.",
              },
              {
                number: "02",
                title: "Investigate",
                text: "Collect observations and information.",
              },
              {
                number: "03",
                title: "Submit",
                text: "Share your work and evidence.",
              },
              {
                number: "04",
                title: "Earn",
                text: "Gain XP and demonstrate skills.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-[#f8f7f4] p-5"
              >
                <span className="text-xs font-bold tracking-widest text-slate-400">
                  {step.number}
                </span>

                <h3 className="mt-5 font-bold text-slate-950">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}