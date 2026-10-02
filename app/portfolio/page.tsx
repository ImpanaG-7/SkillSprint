"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Award,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Flame,
  FolderKanban,
  GraduationCap,
  MapPin,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

type Profile = {
  id: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
};

type Mission = {
  id: number;
  title: string;
  description: string;
  category: string;
  xp_reward: number;
  difficulty: string;
};

type Submission = {
  id: number;
  mission_id: number;
  status: string;
  submitted_at: string;
};

type Evidence = {
  id: number;
  mission_id: number;
  photo_path: string;
  location: string;
  observation: string;
  verified: boolean;
  created_at: string;
};

type Badge = {
  id: number;
  name: string;
  description: string;
  icon: string | null;
};

type UserBadge = {
  badge_id: number;
  earned_at: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

function getBadgeIcon(name: string) {
  if (name.includes("Water")) return "💧";
  if (name.includes("XP")) return "⚡";
  if (name.includes("Streak")) return "🔥";
  if (name.includes("Level")) return "🏆";
  return "🌱";
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function PortfolioPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPortfolio() {
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

        const [
          profileResult,
          missionResult,
          submissionResult,
          evidenceResult,
          badgeResult,
          userBadgeResult,
        ] = await Promise.all([
          supabase
            .from("profiles")
            .select("id, email, xp, level, streak")
            .eq("id", user.id)
            .single(),

          supabase
            .from("missions")
            .select(
              "id, title, description, category, xp_reward, difficulty"
            )
            .order("created_at", { ascending: true }),

          supabase
            .from("mission_submissions")
            .select("id, mission_id, status, submitted_at")
            .eq("user_id", user.id)
            .order("submitted_at", { ascending: false }),

          supabase
            .from("mission_evidence")
            .select(
              "id, mission_id, photo_path, location, observation, verified, created_at"
            )
            .eq("user_id", user.id)
            .order("created_at", { ascending: false }),

          supabase
            .from("badges")
            .select("id, name, description, icon")
            .order("id", { ascending: true }),

          supabase
            .from("user_badges")
            .select("badge_id, earned_at")
            .eq("user_id", user.id)
            .order("earned_at", { ascending: false }),
        ]);

        if (profileResult.data) {
          setProfile({
            id: profileResult.data.id,
            email: profileResult.data.email || user.email || "",
            xp: profileResult.data.xp || 0,
            level: profileResult.data.level || 1,
            streak: profileResult.data.streak || 0,
          });
        }

        setMissions(missionResult.data || []);
        setSubmissions(submissionResult.data || []);
        setEvidence(evidenceResult.data || []);
        setBadges(badgeResult.data || []);
        setUserBadges(userBadgeResult.data || []);
      } catch (error) {
        console.error("Failed to load portfolio:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolio();
  }, []);

  const missionMap = useMemo(() => {
    return new Map(missions.map((mission) => [mission.id, mission]));
  }, [missions]);

  const completedSubmissions = submissions.filter(
    (submission) => submission.status === "completed"
  );

  const earnedBadgeIds = new Set(
    userBadges.map((badge) => Number(badge.badge_id))
  );

  const demonstratedSkills = useMemo(() => {
    const skills = new Set<string>();

    completedSubmissions.forEach((submission) => {
      const mission = missionMap.get(submission.mission_id);

      if (!mission) return;

      if (mission.category) {
        skills.add(mission.category);
      }

      if (mission.title.toLowerCase().includes("water")) {
        skills.add("Environmental Analysis");
        skills.add("Problem Solving");
        skills.add("Field Investigation");
      }
    });

    if (profile && profile.xp > 0) {
      skills.add("Continuous Learning");
    }

    if (evidence.length > 0) {
      skills.add("Evidence Collection");
    }

    return Array.from(skills);
  }, [completedSubmissions, missionMap, profile, evidence]);

  const progressToNextLevel = profile
    ? Math.min((profile.xp % 500) / 500, 1)
    : 0;

  const nextLevelXP = profile ? profile.level * 500 : 500;

  const displayName = profile?.email
    ? profile.email.split("@")[0]
    : "Student";

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8f7f4] px-6 py-16 text-slate-900">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />
          <p className="mt-4 text-sm text-slate-500">
            Building your portfolio...
          </p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-[#f8f7f4] px-6 py-16 text-slate-900">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <GraduationCap className="mx-auto h-10 w-10 text-slate-300" />

          <h1 className="mt-5 text-2xl font-bold text-slate-950">
            Your portfolio is waiting
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to view your learning achievements and demonstrated
            skills.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Sign in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-slate-900">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-8 pt-10 md:px-10 md:pt-14">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-7 py-8 md:px-10 md:py-10">
            <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-xl font-bold text-white">
                  {displayName.charAt(0).toUpperCase()}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                      Level {profile.level}
                    </span>

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Learner
                    </span>
                  </div>

                  <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                    {displayName}
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    {profile.email}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#f8f7f4] px-6 py-5 md:min-w-[220px]">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Learning XP
                </p>

                <div className="mt-1 flex items-end gap-2">
                  <span className="text-3xl font-bold text-slate-950">
                    {profile.xp}
                  </span>

                  <span className="mb-1 text-sm text-slate-500">XP</span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-slate-900 transition-all duration-700"
                    style={{
                      width: `${Math.max(
                        progressToNextLevel * 100,
                        4
                      )}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  {Math.max(nextLevelXP - profile.xp, 0)} XP to next level
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            <div className="p-6">
              <Zap className="h-5 w-5 text-amber-500" />
              <p className="mt-4 text-2xl font-bold text-slate-950">
                {profile.xp}
              </p>
              <p className="text-sm text-slate-500">Total XP</p>
            </div>

            <div className="p-6">
              <Target className="h-5 w-5 text-violet-600" />
              <p className="mt-4 text-2xl font-bold text-slate-950">
                {completedSubmissions.length}
              </p>
              <p className="text-sm text-slate-500">Missions completed</p>
            </div>

            <div className="p-6">
              <Award className="h-5 w-5 text-emerald-600" />
              <p className="mt-4 text-2xl font-bold text-slate-950">
                {earnedBadgeIds.size}
              </p>
              <p className="text-sm text-slate-500">Achievements</p>
            </div>

            <div className="p-6">
              <Flame className="h-5 w-5 text-orange-500" />
              <p className="mt-4 text-2xl font-bold text-slate-950">
                {profile.streak}
              </p>
              <p className="text-sm text-slate-500">Day streak</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio statement */}
      <section className="mx-auto max-w-7xl px-6 py-4 md:px-10">
        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white md:p-10">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
            <Sparkles className="h-5 w-5" />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Smart Education Portfolio
          </p>

          <h2 className="mt-2 max-w-3xl text-2xl font-bold tracking-tight md:text-3xl">
            Learning that can be demonstrated, not just remembered.
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            This portfolio records the missions you completed, evidence you
            submitted, skills you demonstrated and achievements you earned
            while learning.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Demonstrated abilities
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            Skills you are building
          </h2>
        </div>

        {demonstratedSkills.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {demonstratedSkills.map((skill) => (
              <div
                key={skill}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {skill}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-7 text-sm text-slate-500">
            Complete a mission to start demonstrating skills.
          </div>
        )}
      </section>

      {/* Completed missions */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Experience
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                Completed missions
              </h2>
            </div>

            <FolderKanban className="hidden h-6 w-6 text-slate-300 md:block" />
          </div>

          {completedSubmissions.length > 0 ? (
            <div className="space-y-4">
              {completedSubmissions.map((submission) => {
                const mission = missionMap.get(submission.mission_id);

                if (!mission) return null;

                return (
                  <div
                    key={submission.id}
                    className="rounded-2xl border border-slate-200 bg-[#f8f7f4] p-5"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                            {mission.category}
                          </span>

                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                            Completed
                          </span>
                        </div>

                        <h3 className="mt-3 text-lg font-bold text-slate-950">
                          {mission.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-600">
                          {mission.description}
                        </p>

                        <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock3 className="h-3.5 w-3.5" />
                            {formatDate(submission.submitted_at)}
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <Zap className="h-3.5 w-3.5 text-amber-500" />
                            +{mission.xp_reward} XP
                          </span>
                        </div>
                      </div>

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-[#f8f7f4] p-8 text-center">
              <Target className="mx-auto h-9 w-9 text-slate-300" />

              <h3 className="mt-4 font-bold text-slate-900">
                No completed missions yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Complete your first mission to start building your portfolio.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Evidence */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Field evidence
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            Evidence submitted
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Your mission observations and submitted evidence are recorded as
            part of your learning journey.
          </p>
        </div>

        {evidence.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {evidence.map((item) => {
              const mission = missionMap.get(item.mission_id);

              return (
                <div
                  key={item.id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                      <MapPin className="h-5 w-5" />
                    </div>

                    {item.verified ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Verified
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                        Submitted
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 font-bold text-slate-950">
                    {mission?.title || "Mission evidence"}
                  </h3>

                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Location
                      </p>

                      <p className="mt-1 text-sm text-slate-700">
                        {item.location}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Observation
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-700">
                        {item.observation}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <p className="text-xs text-slate-400">
                      Submitted {formatDate(item.created_at)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <MapPin className="mx-auto h-9 w-9 text-slate-300" />

            <h3 className="mt-4 font-bold text-slate-900">
              No evidence submitted yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Complete a field mission and submit evidence to see it here.
            </p>
          </div>
        )}
      </section>

      {/* Achievements */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
          <div className="mb-7">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Achievements
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
              Badges earned
            </h2>
          </div>

          {earnedBadgeIds.size > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {badges
                .filter((badge) => earnedBadgeIds.has(badge.id))
                .map((badge) => {
                  const earned = userBadges.find(
                    (item) => Number(item.badge_id) === badge.id
                  );

                  return (
                    <div
                      key={badge.id}
                      className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                          {getBadgeIcon(badge.name)}
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-950">
                            {badge.name}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            {earned
                              ? `Earned ${formatDate(earned.earned_at)}`
                              : "Achievement unlocked"}
                          </p>
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-6 text-slate-600">
                        {badge.description}
                      </p>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-[#f8f7f4] p-8 text-center">
              <Award className="mx-auto h-9 w-9 text-slate-300" />

              <h3 className="mt-4 font-bold text-slate-900">
                Your first achievement is waiting
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Keep learning and completing missions to unlock badges.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-950">
              Keep growing your portfolio
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Complete another mission and add a new skill to your record.
            </p>
          </div>

          <Link
            href="/missions"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Explore missions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}