"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUp,
  Crown,
  Medal,
  Trophy,
  UserRound,
  Zap,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

type Student = {
  id: string;
  email: string;
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

function getDisplayName(email: string) {
  if (!email) return "Student";

  const name = email.split("@")[0];

  return name
    .replace(/[._-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getRankStyle(rank: number) {
  if (rank === 1) {
    return {
      icon: <Crown className="h-5 w-5" />,
      badge: "bg-amber-50 text-amber-700 border-amber-200",
    };
  }

  if (rank === 2) {
    return {
      icon: <Medal className="h-5 w-5" />,
      badge: "bg-slate-100 text-slate-600 border-slate-200",
    };
  }

  if (rank === 3) {
    return {
      icon: <Medal className="h-5 w-5" />,
      badge: "bg-orange-50 text-orange-700 border-orange-200",
    };
  }

  return {
    icon: <span className="text-sm font-bold">{rank}</span>,
    badge: "bg-white text-slate-500 border-slate-200",
  };
}

export default function LeaderboardPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setCurrentUserId(user.id);
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("id, email, xp, level, streak")
          .order("xp", { ascending: false });

        if (error) {
          console.error("Leaderboard error:", error);
          return;
        }

        setStudents(
          (data || []).map((student) => ({
            id: student.id,
            email: student.email || "",
            xp: student.xp || 0,
            level: student.level || 1,
            streak: student.streak || 0,
          }))
        );
      } catch (error) {
        console.error("Failed to load leaderboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  const currentUserRank = useMemo(() => {
    if (!currentUserId) return null;

    const index = students.findIndex(
      (student) => student.id === currentUserId
    );

    return index >= 0 ? index + 1 : null;
  }, [students, currentUserId]);

  const currentStudent = useMemo(() => {
    return students.find((student) => student.id === currentUserId) || null;
  }, [students, currentUserId]);

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-slate-900">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-10 md:px-10 md:pt-14">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600">
              <Trophy className="h-4 w-4" />
              Learning Leaderboard
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Learn.
              <span className="block text-slate-500">
                Progress. Achieve.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              See how learners are progressing through the platform using XP
              earned from lessons, quizzes and missions.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
                <Zap className="h-4 w-4" />
                Earn XP through learning
              </div>
            </div>
          </div>

          {/* Current position */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
              <UserRound className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Your position
            </p>

            {currentUserRank ? (
              <>
                <div className="mt-1 flex items-end gap-2">
                  <span className="text-4xl font-bold text-slate-950">
                    #{currentUserRank}
                  </span>

                  <span className="mb-1 text-sm text-slate-500">
                    on the board
                  </span>
                </div>

                <div className="mt-5 rounded-2xl bg-[#f8f7f4] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Your XP</span>

                    <span className="font-bold text-slate-950">
                      {currentStudent?.xp || 0}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-slate-500">Level</span>

                    <span className="font-bold text-slate-950">
                      {currentStudent?.level || 1}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm text-slate-500">
                Sign in to see your position.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="mx-auto max-w-5xl px-6 pb-14 md:px-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Live rankings
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              Learners
            </h2>
          </div>

          <span className="hidden text-sm text-slate-500 md:block">
            {students.length} learner{students.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />

            <p className="mt-4 text-sm text-slate-500">
              Loading leaderboard...
            </p>
          </div>
        ) : students.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <Trophy className="mx-auto h-10 w-10 text-slate-300" />

            <h3 className="mt-4 text-lg font-bold text-slate-950">
              No learners yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Start learning to become the first learner on the board.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {students.map((student, index) => {
              const rank = index + 1;
              const isCurrentUser = student.id === currentUserId;
              const rankStyle = getRankStyle(rank);

              return (
                <div
                  key={student.id}
                  className={`rounded-2xl border p-4 transition duration-200 md:p-5 ${
                    isCurrentUser
                      ? "border-violet-200 bg-violet-50/50 shadow-sm"
                      : "border-slate-200 bg-white hover:-translate-y-0.5 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${rankStyle.badge}`}
                    >
                      {rankStyle.icon}
                    </div>

                    {/* Avatar */}
                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600 sm:flex">
                      {getDisplayName(student.email)
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    {/* Student */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate font-bold text-slate-950">
                          {getDisplayName(student.email)}
                        </h3>

                        {isCurrentUser && (
                          <span className="rounded-full bg-violet-100 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
                            You
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span>Level {student.level}</span>

                        <span className="hidden sm:inline">•</span>

                        <span className="inline-flex items-center gap-1">
                          <span>{student.streak}</span>
                          day streak
                        </span>
                      </div>
                    </div>

                    {/* XP */}
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Zap className="h-4 w-4 text-amber-500" />

                        <span className="text-lg font-bold text-slate-950">
                          {student.xp}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400">XP</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Explanation */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-[#f8f7f4] p-6">
              <Zap className="h-5 w-5 text-amber-500" />

              <h3 className="mt-5 font-bold text-slate-950">
                Earn XP
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Complete lessons, quizzes and missions to increase your XP.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#f8f7f4] p-6">
              <ArrowUp className="h-5 w-5 text-violet-600" />

              <h3 className="mt-5 font-bold text-slate-950">
                Level up
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your learning activity contributes to your level and overall
                progress.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#f8f7f4] p-6">
              <Trophy className="h-5 w-5 text-emerald-600" />

              <h3 className="mt-5 font-bold text-slate-950">
                Demonstrate progress
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your achievements and completed missions become part of your
                learning portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}