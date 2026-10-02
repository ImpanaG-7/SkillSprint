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
  xp: number;
  level: number;
  streak: number;
};

type Badge = {
  id: number;
  name: string;
  description: string;
  icon: string;
};

export default function RewardsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadRewards();
  }, []);

  async function loadRewards() {
    try {
      setLoading(true);
      setError("");

      if (!supabase) {
        setError(
          "Supabase configuration is missing. Please check your .env.local file."
        );
        setLoading(false);
        return;
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        setError("Please log in to view your rewards.");
        setLoading(false);
        return;
      }

      // Get profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, xp, level, streak")
        .eq("id", user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      setProfile(profileData);

      // Get all badges
      const { data: badgeData, error: badgeError } = await supabase
        .from("badges")
        .select("id, name, description, icon")
        .order("id");

      if (badgeError) {
        throw badgeError;
      }

      setBadges(badgeData || []);

      // Get already earned badges
      const { data: userBadgeData, error: userBadgeError } =
        await supabase
          .from("user_badges")
          .select("badge_id")
          .eq("user_id", user.id);

      if (userBadgeError) {
        throw userBadgeError;
      }

      const existingBadgeIds =
        userBadgeData?.map((item) => item.badge_id) || [];

      const badgesToUnlock: number[] = [];

      // Check Campus Water Challenge
      let waterChallengeCompleted = false;

      const { data: mission } = await supabase
        .from("missions")
        .select("id")
        .eq("title", "Campus Water Challenge")
        .maybeSingle();

      if (mission) {
        const { data: submission } = await supabase
          .from("mission_submissions")
          .select("id")
          .eq("mission_id", mission.id)
          .eq("user_id", user.id)
          .eq("status", "completed")
          .maybeSingle();

        waterChallengeCompleted = !!submission;
      }

      // Check each badge
      for (const badge of badgeData || []) {
        let shouldUnlock = false;

        if (badge.name === "First Step" && profileData.xp > 0) {
          shouldUnlock = true;
        }

        if (badge.name === "XP Hunter" && profileData.xp >= 100) {
          shouldUnlock = true;
        }

        if (
          badge.name === "Water Hero" &&
          waterChallengeCompleted
        ) {
          shouldUnlock = true;
        }

        if (
          badge.name === "3-Day Learner" &&
          profileData.streak >= 3
        ) {
          shouldUnlock = true;
        }

        if (
          badge.name === "Level Up" &&
          profileData.level >= 2
        ) {
          shouldUnlock = true;
        }

        if (
          shouldUnlock &&
          !existingBadgeIds.includes(badge.id)
        ) {
          badgesToUnlock.push(badge.id);
        }
      }

      // Save newly unlocked badges
      for (const badgeId of badgesToUnlock) {
        const { error: insertError } = await supabase
          .from("user_badges")
          .insert({
            user_id: user.id,
            badge_id: badgeId,
          });

        if (!insertError) {
          existingBadgeIds.push(badgeId);
        }
      }

      setEarnedBadges(existingBadgeIds);
    } catch (err) {
      console.error("Rewards error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading rewards."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🏆</div>

          <p className="text-slate-400">
            Loading your rewards...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">

          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8">

            <div className="text-5xl mb-4">
              ⚠️
            </div>

            <h1 className="text-2xl font-bold mb-3">
              Rewards could not load
            </h1>

            <p className="text-red-300">
              {error}
            </p>

            <button
              onClick={loadRewards}
              className="mt-6 px-5 py-3 rounded-xl bg-white text-slate-950 font-semibold hover:bg-slate-200"
            >
              Try Again
            </button>

          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="mb-10">

          <p className="text-emerald-400 font-semibold mb-2">
            YOUR ACHIEVEMENTS
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Rewards & Badges 🏆
          </h1>

          <p className="text-slate-400 max-w-2xl">
            Learn, complete challenges, build your streak and
            unlock achievements as you progress.
          </p>

        </div>

        {/* Stats */}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-slate-400 text-sm mb-2">
              Total XP
            </p>

            <p className="text-4xl font-bold text-yellow-400">
              {profile?.xp || 0}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-slate-400 text-sm mb-2">
              Level
            </p>

            <p className="text-4xl font-bold text-purple-400">
              {profile?.level || 1}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-slate-400 text-sm mb-2">
              Learning Streak
            </p>

            <p className="text-4xl font-bold text-orange-400">
              {profile?.streak || 0} 🔥
            </p>

          </div>

        </section>

        {/* Badges */}

        <section>

          <div className="mb-6">

            <h2 className="text-2xl font-bold">
              Your Badges
            </h2>

            <p className="text-slate-400 mt-1">
              {earnedBadges.length} of {badges.length} unlocked
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {badges.map((badge) => {

              const earned = earnedBadges.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`rounded-2xl border p-6 transition ${
                    earned
                      ? "border-yellow-500/40 bg-yellow-500/10"
                      : "border-slate-800 bg-slate-900"
                  }`}
                >

                  <div className="flex items-start justify-between">

                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl ${
                        earned
                          ? "bg-yellow-500/20"
                          : "bg-slate-800 grayscale opacity-50"
                      }`}
                    >
                      {badge.icon}
                    </div>

                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        earned
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {earned ? "Unlocked" : "Locked"}
                    </span>

                  </div>

                  <h3 className="text-xl font-bold mt-5">
                    {badge.name}
                  </h3>

                  <p className="text-slate-400 text-sm mt-2">
                    {badge.description}
                  </p>

                  {earned && (
                    <div className="mt-5 text-yellow-400 text-sm font-semibold">
                      🏆 Achievement unlocked!
                    </div>
                  )}

                </div>
              );

            })}

          </div>

        </section>

        {/* Continue Learning */}

        <section className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-2xl font-bold mb-3">
            Keep Learning 🚀
          </h2>

          <p className="text-slate-400 mb-6">
            Complete lessons, quizzes and real-world challenges
            to unlock more achievements.
          </p>

          <div className="flex flex-wrap gap-4">

            <a
              href="/learn"
              className="px-5 py-3 rounded-xl bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400"
            >
              Continue Learning
            </a>

            <a
              href="/missions"
              className="px-5 py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700"
            >
              View Missions
            </a>

            <a
              href="/leaderboard"
              className="px-5 py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700"
            >
              Leaderboard
            </a>

          </div>

        </section>

      </div>

    </main>
  );
}