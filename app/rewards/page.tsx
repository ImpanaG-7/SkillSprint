"use client";

import { useEffect, useState } from "react";
import {
  Award,
  CheckCircle2,
  Lock,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

type Badge = {
  id: number;
  name: string;
  description: string;
  icon: string | null;
};

type Profile = {
  xp: number;
  level: number;
  streak: number;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

const badgeRules: Record<string, (profile: Profile) => boolean> = {
  "First Step": (profile) => profile.xp > 0,
  "XP Hunter": (profile) => profile.xp >= 100,
  "Water Hero": () => false,
  "3-Day Learner": (profile) => profile.streak >= 3,
  "Level Up": (profile) => profile.level >= 2,
};

function getBadgeIcon(name: string) {
  if (name.includes("Water")) return "💧";
  if (name.includes("XP")) return "⚡";
  if (name.includes("Streak")) return "🔥";
  if (name.includes("Level")) return "🏆";
  return "🌱";
}

export default function RewardsPage() {
  const [profile, setProfile] = useState<Profile>({
    xp: 0,
    level: 1,
    streak: 0,
  });

  const [badges, setBadges] = useState<Badge[]>([]);
  const [earnedBadgeIds, setEarnedBadgeIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRewards() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        const { data: profileData } = await supabase
          .from("profiles")
          .select("xp, level, streak")
          .eq("id", user.id)
          .single();

        if (profileData) {
          setProfile({
            xp: profileData.xp || 0,
            level: profileData.level || 1,
            streak: profileData.streak || 0,
          });
        }

        const { data: badgeData } = await supabase
          .from("badges")
          .select("id, name, description, icon")
          .order("id", { ascending: true });

        setBadges(badgeData || []);

        const { data: userBadgeData } = await supabase
          .from("user_badges")
          .select("badge_id")
          .eq("user_id", user.id);

        setEarnedBadgeIds(
          (userBadgeData || []).map((item) => Number(item.badge_id))
        );
      } catch (error) {
        console.error("Failed to load rewards:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRewards();
  }, []);

  const earnedCount = earnedBadgeIds.length;

  const levelProgress = Math.min((profile.xp % 500) / 500, 1);

  const nextLevelXP = profile.level * 500;

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-slate-900">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-10 md:px-10 md:pt-14">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600">
              <Trophy className="h-4 w-4" />
              Rewards & Achievements
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Your progress
              <span className="block text-slate-500">
                deserves recognition.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Earn XP, unlock achievements and build a record of what you
              have accomplished.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5">
                <Zap className="h-5 w-5 text-amber-500" />
                <p className="mt-3 text-2xl font-bold text-slate-950">
                  {profile.xp}
                </p>
                <p className="text-sm text-slate-500">Total XP</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <Trophy className="h-5 w-5 text-violet-600" />
                <p className="mt-3 text-2xl font-bold text-slate-950">
                  {profile.level}
                </p>
                <p className="text-sm text-slate-500">Current level</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <Award className="h-5 w-5 text-emerald-600" />
                <p className="mt-3 text-2xl font-bold text-slate-950">
                  {earnedCount}
                </p>
                <p className="text-sm text-slate-500">Achievements</p>
              </div>
            </div>
          </div>

          {/* Level card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
              <Sparkles className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Current level
            </p>

            <div className="mt-1 flex items-end gap-2">
              <span className="text-4xl font-bold text-slate-950">
                {profile.level}
              </span>

              <span className="mb-1 text-sm text-slate-500">
                / next level
              </span>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs">
                <span className="text-slate-500">Level progress</span>
                <span className="font-semibold text-slate-700">
                  {Math.round(levelProgress * 100)}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-slate-900 transition-all duration-700"
                  style={{
                    width: `${Math.max(levelProgress * 100, 4)}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-xs text-slate-500">
                {Math.max(nextLevelXP - profile.xp, 0)} XP until the next
                level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="mx-auto max-w-7xl px-6 pb-14 md:px-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Achievement collection
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              Badges
            </h2>
          </div>

          <span className="hidden text-sm text-slate-500 md:block">
            {earnedCount} / {badges.length} unlocked
          </span>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />
            <p className="mt-4 text-sm text-slate-500">
              Loading achievements...
            </p>
          </div>
        ) : badges.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <Award className="mx-auto h-10 w-10 text-slate-300" />

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No achievements yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Complete learning activities to start earning badges.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {badges.map((badge) => {
              const earned = earnedBadgeIds.includes(badge.id);

              const rule = badgeRules[badge.name];

              const eligible =
                earned || (rule ? rule(profile) : false);

              return (
                <div
                  key={badge.id}
                  className={`rounded-3xl border p-6 transition duration-200 hover:-translate-y-1 ${
                    earned
                      ? "border-amber-200 bg-white shadow-sm hover:shadow-md"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${
                        earned
                          ? "bg-amber-50"
                          : "bg-slate-100 grayscale"
                      }`}
                    >
                      {getBadgeIcon(badge.name)}
                    </div>

                    {earned ? (
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Unlocked
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
                        <Lock className="h-3.5 w-3.5" />
                        Locked
                      </div>
                    )}
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-slate-950">
                    {badge.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {badge.description}
                  </p>

                  <div className="mt-5 border-t border-slate-100 pt-4">
                    {earned ? (
                      <p className="text-xs font-medium text-emerald-700">
                        Achievement unlocked — keep going.
                      </p>
                    ) : eligible ? (
                      <p className="text-xs font-medium text-amber-700">
                        You have met the requirement. Keep learning to
                        unlock it.
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400">
                        Continue learning to unlock this achievement.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Motivation */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Keep building
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                Every lesson adds to your learning record.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Your XP, missions, achievements and demonstrated skills come
                together to form your digital learning portfolio.
              </p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Trophy className="h-7 w-7" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}