"use client";

import {
  ArrowLeft,
  Crown,
  Loader2,
  Medal,
  Trophy,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Student = {
  id: string;
  email: string;
  xp: number;
  level: number;
};

export default function LeaderboardPage() {
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    loadLeaderboard();
  }, []);

  async function loadLeaderboard() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setCurrentUserId(user.id);
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, xp, level")
        .order("xp", { ascending: false });

      if (error) {
        throw error;
      }

      setStudents(data || []);
    } catch (error) {
      console.error("Leaderboard error:", error);
    } finally {
      setLoading(false);
    }
  }

  function getRankIcon(rank: number) {
    if (rank === 1) {
      return <Crown className="text-yellow-500" size={26} />;
    }

    if (rank === 2) {
      return <Medal className="text-slate-400" size={26} />;
    }

    if (rank === 3) {
      return <Medal className="text-orange-500" size={26} />;
    }

    return (
      <span className="w-7 text-center font-bold text-slate-500">
        {rank}
      </span>
    );
  }

  function getDisplayName(email: string) {
    const name = email.split("@")[0];

    if (name.length <= 3) {
      return name;
    }

    return (
      name.charAt(0).toUpperCase() +
      name.slice(1)
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-orange-100">
      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 font-medium text-orange-700 hover:text-orange-800"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Header */}
        <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl">

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-yellow-400/20 p-3">
              <Trophy
                className="text-yellow-400"
                size={30}
              />
            </div>

            <div>
              <p className="text-sm font-bold tracking-widest text-yellow-300">
                SMART LEARNING
              </p>

              <h1 className="text-4xl font-bold">
                Leaderboard 🏆
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Learn, complete challenges, earn XP and climb
            the leaderboard.
          </p>

        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-8 flex items-center justify-center rounded-3xl bg-white p-12 shadow-lg">
            <div className="flex items-center gap-3 text-slate-600">
              <Loader2
                className="animate-spin"
                size={24}
              />
              Loading leaderboard...
            </div>
          </div>
        )}

        {/* Leaderboard */}
        {!loading && (
          <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-lg">

            <div className="border-b border-slate-100 p-6">
              <h2 className="text-xl font-bold text-slate-900">
                Student Rankings
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Rankings are based on total XP.
              </p>
            </div>

            {students.length === 0 ? (
              <div className="p-10 text-center text-slate-500">
                No students found.
              </div>
            ) : (
              <div>
                {students.map((student, index) => {
                  const rank = index + 1;
                  const isCurrentUser =
                    student.id === currentUserId;

                  return (
                    <div
                      key={student.id}
                      className={`flex items-center gap-4 border-b border-slate-100 px-6 py-5 last:border-b-0 ${
                        isCurrentUser
                          ? "bg-orange-50"
                          : ""
                      }`}
                    >

                      {/* Rank */}
                      <div className="flex w-10 justify-center">
                        {getRankIcon(rank)}
                      </div>

                      {/* Avatar */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-700">
                        {getDisplayName(
                          student.email
                        )
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      {/* Student */}
                      <div className="min-w-0 flex-1">

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="font-bold text-slate-900">
                            {getDisplayName(
                              student.email
                            )}
                          </h3>

                          {isCurrentUser && (
                            <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-bold text-orange-700">
                              YOU
                            </span>
                          )}

                        </div>

                        <p className="mt-1 text-sm text-slate-500">
                          Level {student.level}
                        </p>

                      </div>

                      {/* XP */}
                      <div className="text-right">
                        <p className="text-xl font-bold text-slate-900">
                          {student.xp}
                        </p>

                        <p className="text-xs font-medium text-slate-500">
                          XP
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* Current user summary */}
        {!loading && students.length > 0 && (
          <div className="mt-8 rounded-3xl bg-white p-6 shadow-lg">

            {(() => {
              const currentIndex =
                students.findIndex(
                  (student) =>
                    student.id === currentUserId
                );

              const currentStudent =
                currentIndex >= 0
                  ? students[currentIndex]
                  : null;

              if (!currentStudent) {
                return null;
              }

              return (
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Your Current Rank
                    </p>

                    <p className="mt-1 text-3xl font-bold text-slate-900">
                      #{currentIndex + 1}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-sm text-slate-500">
                      Your XP
                    </p>

                    <p className="text-2xl font-bold text-orange-600">
                      {currentStudent.xp} XP
                    </p>
                  </div>

                </div>
              );
            })()}

          </div>
        )}

      </div>
    </main>
  );
}