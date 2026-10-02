"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Camera,
  CheckCircle2,
  Flame,
  GraduationCap,
  MapPin,
  Sparkles,
  Target,
  Trophy,
  Zap,
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
};

type Badge = {
  id: number;
  name: string;
  description: string;
  icon: string;
};

type Mission = {
  id: number;
  title: string;
  description: string;
  category: string;
  xp_reward: number;
};

type Evidence = {
  id: number;
  mission_id: number;
  location: string;
  observation: string;
  photo_path: string;
  verified: boolean;
  created_at: string;
};

export default function PortfolioPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [completedMissions, setCompletedMissions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPortfolio();
  }, []);

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

      // Profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("id, email, xp, level, streak")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // User badges
      const { data: userBadges } = await supabase
        .from("user_badges")
        .select("badge_id")
        .eq("user_id", user.id);

      if (userBadges && userBadges.length > 0) {
        const badgeIds = userBadges.map((item) => item.badge_id);

        const { data: badgeData } = await supabase
          .from("badges")
          .select("id, name, description, icon")
          .in("id", badgeIds);

        if (badgeData) {
          setBadges(badgeData);
        }
      }

      // Completed missions
      const { data: submissions } = await supabase
        .from("mission_submissions")
        .select("mission_id")
        .eq("user_id", user.id)
        .eq("status", "completed");

      if (submissions) {
        setCompletedMissions(submissions.length);

        const missionIds = submissions.map(
          (submission) => submission.mission_id
        );

        if (missionIds.length > 0) {
          const { data: missionData } = await supabase
            .from("missions")
            .select(
              "id, title, description, category, xp_reward"
            )
            .in("id", missionIds);

          if (missionData) {
            setMissions(missionData);
          }
        }
      }

      // Mission evidence
      const { data: evidenceData } = await supabase
        .from("mission_evidence")
        .select(
          "id, mission_id, location, observation, photo_path, verified, created_at"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (evidenceData) {
        setEvidence(evidenceData);
      }
    } catch (error) {
      console.error("Portfolio loading error:", error);
    } finally {
      setLoading(false);
    }
  }

  function getDisplayName(email?: string) {
    if (!email) return "Student";

    return email
      .split("@")[0]
      .replace(/[._-]/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function getSkillList() {
    const skills = new Set<string>();

    missions.forEach((mission) => {
      if (mission.category) {
        skills.add(mission.category);
      }
    });

    if (evidence.length > 0) {
      skills.add("Field Observation");
      skills.add("Evidence Collection");
    }

    if (missions.some((mission) =>
      mission.title.toLowerCase().includes("water")
    )) {
      skills.add("Environmental Awareness");
    }

    if (profile && profile.xp >= 100) {
      skills.add("Consistent Learning");
    }

    return Array.from(skills);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8fbff]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-violet-600" />
          <p className="font-medium text-slate-600">
            Building your portfolio...
          </p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8fbff] px-6">
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold">
            Please log in
          </h1>

          <p className="mt-2 text-slate-500">
            Your portfolio is available after signing in.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  const displayName = getDisplayName(profile.email);
  const skills = getSkillList();

  const levelStartXP = (profile.level - 1) * 500;
  const levelEndXP = profile.level * 500;
  const levelProgress = Math.min(
    100,
    Math.max(
      0,
      ((profile.xp - levelStartXP) /
        (levelEndXP - levelStartXP)) *
        100
    )
  );

  return (
    <main className="min-h-screen bg-[#f8fbff] text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-violet-600"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-2 text-sm font-semibold text-violet-600">
            <GraduationCap size={20} />
            Digital Learning Portfolio
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Hero */}
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-8 text-white shadow-lg md:p-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                <Sparkles size={16} />
                Smart Education Portfolio
              </div>

              <h1 className="text-4xl font-bold md:text-5xl">
                {displayName}
              </h1>

              <p className="mt-3 max-w-2xl text-blue-100">
                A digital record of your learning journey, missions,
                achievements, skills, and real-world evidence.
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-6 text-center backdrop-blur">
              <div className="text-sm font-medium text-blue-100">
                Current Level
              </div>

              <div className="mt-1 text-5xl font-black">
                {profile.level}
              </div>

              <div className="mt-1 text-sm text-blue-100">
                {profile.xp} XP
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Total XP
              </span>
              <Zap className="text-amber-500" size={21} />
            </div>

            <p className="mt-3 text-3xl font-bold">
              {profile.xp}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Missions
              </span>
              <Target className="text-emerald-500" size={21} />
            </div>

            <p className="mt-3 text-3xl font-bold">
              {completedMissions}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Achievements
              </span>
              <Award className="text-violet-500" size={21} />
            </div>

            <p className="mt-3 text-3xl font-bold">
              {badges.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Learning Streak
              </span>
              <Flame className="text-orange-500" size={21} />
            </div>

            <p className="mt-3 text-3xl font-bold">
              {profile.streak}
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Left */}
          <div className="space-y-8 lg:col-span-2">
            {/* Level Progress */}
            <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-violet-600">
                    Learning Progress
                  </p>

                  <h2 className="mt-1 text-2xl font-bold">
                    Level {profile.level}
                  </h2>
                </div>

                <Trophy className="text-amber-500" size={28} />
              </div>

              <div className="mt-6">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-500">
                    {profile.xp} XP
                  </span>

                  <span className="font-semibold text-slate-700">
                    {levelEndXP} XP
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all"
                    style={{
                      width: `${levelProgress}%`,
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Missions */}
            <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-emerald-600">
                    Applied Learning
                  </p>

                  <h2 className="mt-1 text-2xl font-bold">
                    Completed Missions
                  </h2>
                </div>

                <Target className="text-emerald-500" size={28} />
              </div>

              {missions.length === 0 ? (
                <div className="mt-6 rounded-2xl bg-slate-50 p-6 text-center">
                  <p className="text-slate-500">
                    No missions completed yet.
                  </p>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {missions.map((mission) => (
                    <div
                      key={mission.id}
                      className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2
                              size={19}
                              className="text-emerald-600"
                            />

                            <h3 className="font-bold">
                              {mission.title}
                            </h3>
                          </div>

                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {mission.description}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                              {mission.category}
                            </span>

                            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-700">
                              +{mission.xp_reward} XP
                            </span>
                          </div>
                        </div>

                        <CheckCircle2
                          size={25}
                          className="shrink-0 text-emerald-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Evidence */}
            <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    Real-World Learning
                  </p>

                  <h2 className="mt-1 text-2xl font-bold">
                    Evidence Submitted
                  </h2>
                </div>

                <Camera className="text-blue-500" size={28} />
              </div>

              {evidence.length === 0 ? (
                <div className="mt-6 rounded-2xl bg-slate-50 p-6 text-center">
                  <p className="text-slate-500">
                    No evidence submitted yet.
                  </p>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {evidence.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-xl bg-white p-3 shadow-sm">
                          <Camera
                            size={22}
                            className="text-blue-600"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold">
                              Mission Evidence
                            </h3>

                            {item.verified ? (
                              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                Verified
                              </span>
                            ) : (
                              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                Submitted
                              </span>
                            )}
                          </div>

                          <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                            <MapPin size={16} />
                            {item.location}
                          </div>

                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {item.observation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right */}
          <aside className="space-y-8">
            {/* Skills */}
            <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles
                  size={21}
                  className="text-violet-600"
                />

                <h2 className="text-xl font-bold">
                  Skills Demonstrated
                </h2>
              </div>

              {skills.length === 0 ? (
                <p className="mt-5 text-sm text-slate-500">
                  Complete missions to demonstrate skills.
                </p>
              ) : (
                <div className="mt-5 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {/* Badges */}
            <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-2">
                <Award
                  size={21}
                  className="text-amber-500"
                />

                <h2 className="text-xl font-bold">
                  Achievements
                </h2>
              </div>

              {badges.length === 0 ? (
                <p className="mt-5 text-sm text-slate-500">
                  Keep learning to unlock achievements.
                </p>
              ) : (
                <div className="mt-5 space-y-4">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className="flex items-center gap-4 rounded-2xl bg-amber-50 p-4"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                        {badge.icon || "🏆"}
                      </div>

                      <div>
                        <h3 className="font-bold">
                          {badge.name}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Portfolio statement */}
            <section className="rounded-3xl bg-slate-900 p-7 text-white shadow-sm">
              <GraduationCap
                size={30}
                className="text-blue-300"
              />

              <h2 className="mt-5 text-xl font-bold">
                Learning beyond the classroom
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                Your portfolio records what you learned, what you
                built, the problems you explored, and the skills you
                demonstrated.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
