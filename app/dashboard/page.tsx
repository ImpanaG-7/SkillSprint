"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  ArrowRight,
  Award,
  BookOpen,
  Flame,
  LogOut,
  Medal,
  Target,
  Trophy,
  Sparkles,
  Droplets,
  Brain,
  BarChart3,
} from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

type Profile = {
  id: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
  last_active_date: string | null;
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [rank, setRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      if (!supabase) {
        setError("Supabase configuration is missing.");
        setLoading(false);
        return;
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      if (!user) {
        setError("Please log in.");
        setLoading(false);
        return;
      }

      const { data: profileData, error: profileError } =
        await supabase
          .from("profiles")
          .select(
            "id, email, xp, level, streak, last_active_date"
          )
          .eq("id", user.id)
          .single();

      if (profileError) throw profileError;

      const today = new Date()
        .toISOString()
        .split("T")[0];

      let updatedStreak = profileData.streak || 0;

      if (!profileData.last_active_date) {
        updatedStreak = 1;

        await supabase
          .from("profiles")
          .update({
            streak: updatedStreak,
            last_active_date: today,
          })
          .eq("id", user.id);
      } else if (profileData.last_active_date !== today) {
        const lastDate = new Date(
          `${profileData.last_active_date}T00:00:00`
        );

        const currentDate = new Date(
          `${today}T00:00:00`
        );

        const difference = Math.round(
          (currentDate.getTime() -
            lastDate.getTime()) /
            (1000 * 60 * 60 * 24)
        );

        if (difference === 1) {
          updatedStreak += 1;
        } else if (difference > 1) {
          updatedStreak = 1;
        }

        await supabase
          .from("profiles")
          .update({
            streak: updatedStreak,
            last_active_date: today,
          })
          .eq("id", user.id);
      }

      setProfile({
        ...profileData,
        streak: updatedStreak,
        last_active_date: today,
      });

      const {
        data: allProfiles,
        error: leaderboardError,
      } = await supabase
        .from("profiles")
        .select("id, xp")
        .order("xp", {
          ascending: false,
        });

      if (leaderboardError) {
        throw leaderboardError;
      }

      if (allProfiles) {
        const currentRank =
          allProfiles.findIndex(
            (player) => player.id === user.id
          ) + 1;

        setRank(
          currentRank > 0 ? currentRank : null
        );
      }
    } catch (err) {
      console.error("Dashboard error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await supabase?.auth.signOut();
    window.location.href = "/login";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8f7f4] flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
            <Sparkles size={26} />
          </div>

          <h1 className="text-xl font-bold text-slate-900">
            Preparing your dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Loading your learning progress...
          </p>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-2/3 animate-pulse rounded-full bg-pink-500" />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#f8f7f4] px-5 py-12">
        <div className="mx-auto max-w-xl">
          <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Target size={23} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-500">
              Dashboard error
            </p>

            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              Something went wrong
            </h1>

            <p className="mt-3 text-slate-600">
              {error}
            </p>

            <button
              onClick={loadDashboard}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Try again
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </main>
    );
  }

  const xp = profile?.xp || 0;
  const level = profile?.level || 1;
  const streak = profile?.streak || 0;

  const xpPerLevel = 500;

  const currentLevelXP =
    xp % xpPerLevel;

  const progressPercentage =
    (currentLevelXP / xpPerLevel) * 100;

  const xpUntilNextLevel =
    xpPerLevel - currentLevelXP;

  const displayName =
    profile?.email?.split("@")[0] || "Learner";

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">

        {/* HEADER */}
        <section className="mb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Learning dashboard
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                Welcome back,{" "}
                <span className="text-pink-600">
                  {displayName}
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                Continue learning, solve real-world challenges,
                and build skills that you can demonstrate.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              <LogOut size={16} />
              Logout
            </button>

          </div>
        </section>

        {/* MAIN PROGRESS CARD */}
        <section className="mb-6 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)]">

          <div className="grid lg:grid-cols-[1.5fr_1fr]">

            <div className="p-7 md:p-9">

              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-pink-600">
                    Your progress
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-950 md:text-3xl">
                    Level {level}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Keep learning to reach your next level.
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
                  <Award size={23} />
                </div>
              </div>

              <div className="mt-8">

                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-600">
                    Level {level}
                  </span>

                  <span className="font-semibold text-slate-900">
                    {currentLevelXP} / {xpPerLevel} XP
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-pink-500 transition-all duration-700"
                    style={{
                      width: `${progressPercentage}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>
                    {Math.round(progressPercentage)}% complete
                  </span>

                  <span>
                    {xpUntilNextLevel} XP to Level {level + 1}
                  </span>
                </div>

              </div>
            </div>

            <div className="border-t border-slate-100 bg-[#fff8fb] p-7 lg:border-l lg:border-t-0 md:p-9">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Learning identity
              </p>

              <div className="mt-5 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-xl font-bold text-white">
                  {displayName.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="font-bold text-slate-950">
                    Level {level} Learner
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Building real-world skills
                  </p>
                </div>

              </div>

              <div className="mt-7 flex items-center gap-2 text-sm font-medium text-slate-600">
                <Sparkles
                  size={16}
                  className="text-pink-500"
                />
                Keep your learning streak alive.
              </div>

            </div>

          </div>
        </section>

        {/* STATS */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* XP */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Sparkles size={19} />
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                XP
              </span>

            </div>

            <p className="mt-5 text-sm text-slate-500">
              Total XP
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-950">
              {xp}
            </p>
          </div>

          {/* LEVEL */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Medal size={19} />
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Level
              </span>

            </div>

            <p className="mt-5 text-sm text-slate-500">
              Current level
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-950">
              {level}
            </p>
          </div>

          {/* STREAK */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <Flame size={19} />
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Streak
              </span>

            </div>

            <p className="mt-5 text-sm text-slate-500">
              Learning streak
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-950">
              {streak}
              <span className="ml-1 text-base font-medium text-slate-400">
                days
              </span>
            </p>
          </div>

          {/* RANK */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Trophy size={19} />
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Rank
              </span>

            </div>

            <p className="mt-5 text-sm text-slate-500">
              Campus ranking
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-950">
              {rank ? `#${rank}` : "—"}
            </p>
          </div>

        </section>

        {/* JOURNEY */}
        <section className="mb-8">

          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Your learning journey
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
              What do you want to do next?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Learn concepts, apply them, and turn your work into achievements.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

            {/* LEARN */}
            <a
              href="/learn"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <BookOpen size={22} />
                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
                />

              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-950">
                Learn
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Explore Mathematics, Science, Environment and Computer Science.
              </p>

              <p className="mt-5 text-sm font-semibold text-blue-600">
                Explore lessons
              </p>
            </a>

            {/* MISSIONS */}
            <a
              href="/missions"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
            >
              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Target size={22} />
                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600"
                />

              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-950">
                Missions
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Solve practical challenges and apply what you learn.
              </p>

              <p className="mt-5 text-sm font-semibold text-emerald-600">
                View missions
              </p>
            </a>

            {/* AI MENTOR */}
            <a
              href="/assistant"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-pink-200 hover:shadow-md"
            >
              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
                  <Brain size={22} />
                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-pink-600"
                />

              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-950">
                AI Mentor
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Ask questions, get hints and learn concepts step by step.
              </p>

              <p className="mt-5 text-sm font-semibold text-pink-600">
                Ask your mentor
              </p>
            </a>

            {/* REWARDS */}
            <a
              href="/rewards"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-amber-200 hover:shadow-md"
            >
              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Award size={22} />
                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-amber-600"
                />

              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-950">
                Rewards
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Track badges, achievements and your learning milestones.
              </p>

              <p className="mt-5 text-sm font-semibold text-amber-600">
                View rewards
              </p>
            </a>

          </div>
        </section>

        {/* LEARNING WORLD / PORTFOLIO */}
        <section className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">

          <a
            href="/world"
            className="group rounded-2xl border border-slate-200 bg-slate-900 p-7 text-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-5">

              <div>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <Sparkles size={21} />
                </div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Interactive learning
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Enter the 3D Learning World
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
                  Explore the campus, discover missions and interact with your learning environment.
                </p>
              </div>

              <ArrowRight
                size={20}
                className="shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-white"
              />

            </div>
          </a>

          <a
            href="/portfolio"
            className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-5">

              <div>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <BarChart3 size={21} />
                </div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-500">
                  Your achievements
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-950">
                  Build Your Portfolio
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                  Turn completed missions, evidence and achievements into a digital learning portfolio.
                </p>
              </div>

              <ArrowRight
                size={20}
                className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-violet-600"
              />

            </div>
          </a>

        </section>

        {/* SIGNATURE CHALLENGE */}
        <section className="mb-8 overflow-hidden rounded-[28px] border border-sky-200 bg-[#f2f9ff]">

          <div className="grid lg:grid-cols-[1.5fr_0.7fr]">

            <div className="p-7 md:p-9">

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
                <Droplets size={15} />
                Signature challenge
              </div>

              <h2 className="mt-3 text-2xl font-bold text-slate-950 md:text-3xl">
                Campus Water Challenge
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                Apply Mathematics, Science, Computer Science and Environment knowledge to investigate a real-world campus problem.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">

                <span className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700">
                  Mathematics
                </span>

                <span className="rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-700">
                  Science
                </span>

                <span className="rounded-full bg-pink-100 px-3 py-1.5 text-xs font-semibold text-pink-700">
                  Computer Science
                </span>

                <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  Environment
                </span>

              </div>

            </div>

            <div className="flex items-center border-t border-sky-200 bg-white/60 p-7 lg:border-l lg:border-t-0 md:p-9">

              <div className="w-full">

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                    <Droplets size={21} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-950">
                      +150 XP
                    </p>

                    <p className="text-xs text-slate-500">
                      Cross-domain mission
                    </p>
                  </div>
                </div>

                <a
                  href="/missions/campus-water"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Open challenge
                  <ArrowRight size={16} />
                </a>

              </div>

            </div>

          </div>

        </section>

        {/* BOTTOM NAVIGATION */}
        <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-sm font-bold text-slate-950">
                Keep exploring
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Your learning progress is saved automatically.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">

              <a
                href="/leaderboard"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <Trophy size={14} />
                Leaderboard
              </a>

              <a
                href="/streak"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <Flame size={14} />
                Streak
              </a>

              <a
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <BarChart3 size={14} />
                Portfolio
              </a>

            </div>

          </div>

        </section>

        <footer className="py-7 text-center">
          <p className="text-sm font-medium text-slate-500">
            Learn something new. Solve something real.
          </p>

          <p className="mt-1 text-xs text-slate-400">
            SkillSprint — Smart Learning Platform
          </p>
        </footer>

      </div>
    </main>
  );
}