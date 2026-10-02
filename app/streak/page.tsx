"use client";

import {
  ArrowLeft,
  CheckCircle,
  Flame,
  Leaf,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const weekDays = [
  { day: "Mon", completed: true },
  { day: "Tue", completed: true },
  { day: "Wed", completed: true },
  { day: "Thu", completed: true },
  { day: "Fri", completed: true },
  { day: "Sat", completed: true },
  { day: "Sun", completed: false },
];

export default function StreakPage() {
  const router = useRouter();

  const [todayCompleted, setTodayCompleted] = useState(false);
  const [streak, setStreak] = useState(7);
  const [todayXp, setTodayXp] = useState(0);

  function completeDailyGoal() {
    if (todayCompleted) return;

    setTodayCompleted(true);
    setStreak((previous) => previous + 1);
    setTodayXp(50);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-green-100">
      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 font-medium text-green-700 hover:text-green-800"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-orange-500">
            <Flame size={42} />
          </div>

          <p className="mt-5 text-sm font-bold tracking-widest text-orange-500">
            ECOQUEST • DAILY STREAK
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Keep Your Streak Alive! 🔥
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
            Learn something new or take an environmental action every day.
          </p>
        </div>

        {/* Streak Card */}
        <div className="mt-10 rounded-3xl bg-white p-8 text-center shadow-lg">
          <p className="text-sm font-semibold text-slate-500">
            CURRENT STREAK
          </p>

          <div className="mt-3 flex items-center justify-center gap-3">
            <Flame className="text-orange-500" size={48} />

            <span className="text-6xl font-bold text-slate-900">
              {streak}
            </span>

            <span className="mt-5 text-xl font-semibold text-slate-500">
              days
            </span>
          </div>

          <p className="mt-4 text-slate-600">
            {todayCompleted
              ? "Amazing! You completed today's goal. 🎉"
              : "Complete today's goal to keep your streak going."}
          </p>
        </div>

        {/* Weekly Activity */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <Target className="text-green-600" size={25} />

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Weekly Activity
              </h2>

              <p className="text-sm text-slate-500">
                Your environmental learning activity this week.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-7 gap-2">
            {weekDays.map((item, index) => {
              const completed =
                item.completed ||
                (index === 6 && todayCompleted);

              return (
                <div
                  key={item.day}
                  className="flex flex-col items-center gap-3"
                >
                  <span className="text-sm font-medium text-slate-500">
                    {item.day}
                  </span>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      completed
                        ? "bg-green-100 text-green-600"
                        : "bg-slate-100 text-slate-300"
                    }`}
                  >
                    {completed ? (
                      <CheckCircle size={24} />
                    ) : (
                      <Leaf size={20} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Goal */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-green-100 p-4 text-green-600">
              <Target size={30} />
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold text-green-600">
                TODAY'S GOAL
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Complete one SkillSprint activity
              </h2>

              <p className="mt-2 leading-7 text-slate-600">
                Complete a lesson, quiz, or environmental mission
                to maintain your daily learning habit.
              </p>

              <button
                type="button"
                onClick={completeDailyGoal}
                disabled={todayCompleted}
                className={`mt-5 rounded-xl px-6 py-3 font-bold transition ${
                  todayCompleted
                    ? "cursor-not-allowed bg-green-100 text-green-700"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {todayCompleted
                  ? "✓ Goal Completed"
                  : "Complete Today's Goal"}
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-md">
            <div className="flex items-center gap-3">
              <Flame className="text-orange-500" size={24} />

              <div>
                <p className="text-sm text-slate-500">
                  Best Streak
                </p>

                <p className="text-2xl font-bold text-slate-900">
                  12 days
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-md">
            <div className="flex items-center gap-3">
              <Zap className="text-yellow-500" size={24} />

              <div>
                <p className="text-sm text-slate-500">
                  Today's XP
                </p>

                <p className="text-2xl font-bold text-slate-900">
                  +{todayXp} XP
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-md">
            <div className="flex items-center gap-3">
              <Trophy className="text-green-600" size={24} />

              <div>
                <p className="text-sm text-slate-500">
                  Weekly Goals
                </p>

                <p className="text-2xl font-bold text-slate-900">
                  6 / 7
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Motivation */}
        <div className="mt-8 rounded-3xl bg-orange-500 p-8 text-white shadow-lg">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-white/20 p-4">
              <Flame size={30} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Small actions create big change. 🌍
              </h2>

              <p className="mt-2 max-w-2xl leading-7 text-orange-50">
                Keep learning, keep acting, and keep your
                environmental journey going one day at a time.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}