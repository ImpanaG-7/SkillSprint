"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

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
      } else if (
        profileData.last_active_date !== today
      ) {
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

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="cosmic-stars" />

        <div className="text-center cosmic-enter">
          <div className="text-6xl mb-5 cosmic-float">
            🚀
          </div>

          <h1 className="text-2xl font-bold">
            Loading your{" "}
            <span className="cosmic-gradient-text">
              learning universe
            </span>
          </h1>

          <div className="mt-5 mx-auto w-48 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: "70%",
                background:
                  "linear-gradient(90deg,#22d3ee,#8b5cf6,#e879f9)",
                animation:
                  "dashboardLoading 1.4s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen px-6 py-10">
        <div className="cosmic-stars" />

        <div className="max-w-3xl mx-auto cosmic-enter">
          <div className="cosmic-glass rounded-3xl p-8 border border-red-400/20">
            <div className="text-5xl mb-5">⚠️</div>

            <p className="text-red-300 font-semibold mb-2">
              DASHBOARD ERROR
            </p>

            <h1 className="text-3xl font-bold mb-3">
              Something went wrong
            </h1>

            <p className="text-slate-300">
              {error}
            </p>

            <button
              onClick={loadDashboard}
              className="cosmic-button mt-7 px-6 py-3 rounded-xl text-white font-bold"
            >
              Try Again
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

  return (
    <main className="min-h-screen px-5 md:px-8 py-8 md:py-12 relative overflow-hidden">
      <div className="cosmic-stars" />

      {/* Animated background orbs */}
      <div className="absolute top-20 -left-32 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl cosmic-orb" />

      <div
        className="absolute top-96 -right-32 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl cosmic-orb"
        style={{ animationDelay: "2s" }}
      />

      <div
        className="absolute bottom-40 left-1/3 w-72 h-72 rounded-full bg-pink-500/10 blur-3xl cosmic-orb"
        style={{ animationDelay: "4s" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <section className="cosmic-enter mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-cyan-300 font-bold tracking-[0.25em] text-sm mb-3">
                YOUR LEARNING UNIVERSE
              </p>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                Welcome back{" "}
                <span className="cosmic-gradient-text">
                  👋
                </span>
              </h1>

              <p className="text-slate-300 text-lg mt-3 max-w-2xl">
                Keep learning, complete challenges,
                earn XP and level up your skills.
              </p>
            </div>

            <button
              onClick={async () => {
                await supabase?.auth.signOut();
                window.location.href = "/login";
              }}
              className="cosmic-glass px-6 py-3 rounded-xl font-semibold hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          {/* XP */}
          <div
            className="dashboard-card cosmic-glass rounded-3xl p-6 cosmic-enter"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl stat-icon">
                ⚡
              </span>

              <span className="text-xs font-bold tracking-widest text-cyan-300">
                XP
              </span>
            </div>

            <p className="text-slate-300 text-sm mt-6">
              Total XP
            </p>

            <p className="text-4xl font-black mt-1 cosmic-gradient-text">
              {xp}
            </p>

            <p className="text-slate-400 text-sm mt-2">
              Experience Points
            </p>
          </div>

          {/* LEVEL */}
          <div
            className="dashboard-card cosmic-glass rounded-3xl p-6 cosmic-enter"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl stat-icon">
                🌟
              </span>

              <span className="text-xs font-bold tracking-widest text-purple-300">
                LEVEL
              </span>
            </div>

            <p className="text-slate-300 text-sm mt-6">
              Current Level
            </p>

            <p className="text-4xl font-black mt-1 text-purple-300">
              {level}
            </p>

            <p className="text-slate-400 text-sm mt-2">
              Keep progressing
            </p>
          </div>

          {/* STREAK */}
          <div
            className="dashboard-card cosmic-glass rounded-3xl p-6 cosmic-enter"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl stat-icon">
                🔥
              </span>

              <span className="text-xs font-bold tracking-widest text-orange-300">
                STREAK
              </span>
            </div>

            <p className="text-slate-300 text-sm mt-6">
              Day Streak
            </p>

            <p className="text-4xl font-black mt-1 text-orange-300">
              {streak}
            </p>

            <p className="text-slate-400 text-sm mt-2">
              Keep it going
            </p>
          </div>

          {/* RANK */}
          <div
            className="dashboard-card cosmic-glass rounded-3xl p-6 cosmic-enter"
            style={{ animationDelay: "400ms" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl stat-icon">
                🏆
              </span>

              <span className="text-xs font-bold tracking-widest text-pink-300">
                RANK
              </span>
            </div>

            <p className="text-slate-300 text-sm mt-6">
              Campus Rank
            </p>

            <p className="text-4xl font-black mt-1 text-pink-300">
              {rank ? `#${rank}` : "—"}
            </p>

            <p className="text-slate-400 text-sm mt-2">
              Based on XP
            </p>
          </div>
        </section>

        {/* LEVEL PROGRESS */}
        <section className="cosmic-glass rounded-3xl p-7 md:p-9 mb-10 cosmic-enter">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-5">
            <div>
              <p className="text-purple-300 text-sm font-bold tracking-widest uppercase">
                LEVEL UP
              </p>

              <h2 className="text-2xl md:text-3xl font-bold mt-1">
                Level {level} Progress
              </h2>

              <p className="text-slate-400 mt-2">
                {xpUntilNextLevel} XP until Level{" "}
                {level + 1}
              </p>
            </div>

            <div className="text-3xl font-black cosmic-gradient-text">
              {Math.round(progressPercentage)}%
            </div>
          </div>

          <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full rounded-full progress-glow"
              style={{
                width: `${progressPercentage}%`,
                background:
                  "linear-gradient(90deg,#22d3ee,#8b5cf6,#e879f9,#fb7185)",
              }}
            />
          </div>

          <div className="flex justify-between text-sm text-slate-400 mt-3">
            <span>
              Level {level}
            </span>

            <span>
              {currentLevelXP} / {xpPerLevel} XP
            </span>

            <span>
              Level {level + 1}
            </span>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="mb-10 cosmic-enter">
          <div className="mb-6">
            <p className="text-cyan-300 text-sm font-bold tracking-widest uppercase">
              EXPLORE
            </p>

            <h2 className="text-3xl md:text-4xl font-black mt-1">
              Continue Your Journey 🚀
            </h2>

            <p className="text-slate-400 mt-2">
              Choose your next learning destination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* LEARN */}
            <a
              href="/learn"
              className="dashboard-card cosmic-glass rounded-3xl p-6 group"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-cyan-400/10 border border-cyan-300/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                📚
              </div>

              <h3 className="text-xl font-bold mt-5">
                Learn
              </h3>

              <p className="text-slate-400 text-sm mt-2">
                Explore subjects, lessons and knowledge.
              </p>

              <p className="text-cyan-300 font-semibold mt-5">
                Start learning →
              </p>
            </a>

            {/* MISSIONS */}
            <a
              href="/missions"
              className="dashboard-card cosmic-glass rounded-3xl p-6 group"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-purple-400/10 border border-purple-300/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                🎯
              </div>

              <h3 className="text-xl font-bold mt-5">
                Missions
              </h3>

              <p className="text-slate-400 text-sm mt-2">
                Solve real-world challenges and earn XP.
              </p>

              <p className="text-purple-300 font-semibold mt-5">
                View missions →
              </p>
            </a>

            {/* REWARDS */}
            <a
              href="/rewards"
              className="dashboard-card cosmic-glass rounded-3xl p-6 group"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-yellow-400/10 border border-yellow-300/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                🏆
              </div>

              <h3 className="text-xl font-bold mt-5">
                Rewards
              </h3>

              <p className="text-slate-400 text-sm mt-2">
                Unlock badges and achievements.
              </p>

              <p className="text-yellow-300 font-semibold mt-5">
                View rewards →
              </p>
            </a>

            {/* LEADERBOARD */}
            <a
              href="/leaderboard"
              className="dashboard-card cosmic-glass rounded-3xl p-6 group"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-pink-400/10 border border-pink-300/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                🥇
              </div>

              <h3 className="text-xl font-bold mt-5">
                Leaderboard
              </h3>

              <p className="text-slate-400 text-sm mt-2">
                See your campus ranking and XP.
              </p>

              <p className="text-pink-300 font-semibold mt-5">
                View leaderboard →
              </p>
            </a>
          </div>
        </section>

        {/* CAMPUS WATER CHALLENGE */}
        <section className="relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-cyan-400/10 via-purple-500/10 to-pink-400/10 p-7 md:p-10 mb-8 cosmic-enter">

          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-400/10 blur-3xl cosmic-orb" />

          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl cosmic-orb" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <p className="text-cyan-300 font-bold tracking-widest text-sm">
                SIGNATURE CHALLENGE
              </p>

              <h2 className="text-3xl md:text-4xl font-black mt-3">
                Campus Water Challenge 💧
              </h2>

              <p className="text-slate-300 mt-4 max-w-2xl leading-relaxed">
                Apply Mathematics, Science, Computer Science
                and Environment knowledge to solve one
                real-world problem.
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                <span className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-300/20 text-cyan-200 text-sm">
                  Mathematics
                </span>

                <span className="px-3 py-1 rounded-full bg-purple-400/10 border border-purple-300/20 text-purple-200 text-sm">
                  Science
                </span>

                <span className="px-3 py-1 rounded-full bg-pink-400/10 border border-pink-300/20 text-pink-200 text-sm">
                  Computer Science
                </span>

                <span className="px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-300/20 text-emerald-200 text-sm">
                  Environment
                </span>
              </div>
            </div>

            <a
              href="/missions/campus-water"
              className="cosmic-button px-7 py-4 rounded-2xl text-white font-bold whitespace-nowrap text-center"
            >
              View Challenge →
            </a>
          </div>
        </section>

        {/* FOOTER MESSAGE */}
        <div className="text-center py-8">
          <p className="text-slate-500 text-sm">
            Learn something new. Solve something real.
          </p>

          <p className="text-slate-600 text-xs mt-2">
            Your progress is saved automatically.
          </p>
        </div>
      </div>

      {/* Dashboard-specific animations */}
      <style jsx>{`
        .dashboard-card {
          transition:
            transform 0.35s ease,
            border-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        .dashboard-card:hover {
          transform: translateY(-8px);
          border-color: rgba(139, 92, 246, 0.45);
          box-shadow:
            0 20px 50px rgba(10, 7, 40, 0.35),
            0 0 35px rgba(139, 92, 246, 0.12);
        }

        .stat-icon {
          animation: statFloat 4s ease-in-out infinite;
        }

        .progress-glow {
          animation: progressPulse 2.5s ease-in-out infinite;
          transition: width 1s ease;
        }

        .cosmic-orb {
          animation: orbFloat 8s ease-in-out infinite alternate;
        }

        @keyframes statFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes progressPulse {
          0%,
          100% {
            box-shadow:
              0 0 10px rgba(34, 211, 238, 0.25);
          }

          50% {
            box-shadow:
              0 0 28px rgba(139, 92, 246, 0.6);
          }
        }

        @keyframes orbFloat {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(35px, -25px, 0) scale(1.12);
          }

          100% {
            transform: translate3d(-20px, 30px, 0) scale(0.95);
          }
        }

        @keyframes dashboardLoading {
          0% {
            transform: translateX(-120%);
          }

          50% {
            transform: translateX(40%);
          }

          100% {
            transform: translateX(160%);
          }
        }
      `}</style>
    </main>
  );
}
