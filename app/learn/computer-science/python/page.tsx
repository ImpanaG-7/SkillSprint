"use client";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Code2,
  Lock,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useRouter } from "next/navigation";

const lessons = [
  {
    id: 1,
    title: "Python Fundamentals",
    description:
      "Learn what Python is, how Python programs work and write your first simple program.",
    xp: 30,
    available: true,
  },
  {
    id: 2,
    title: "Variables & Data Types",
    description:
      "Learn variables, strings, numbers, booleans and basic data types in Python.",
    xp: 30,
    available: false,
  },
  {
    id: 3,
    title: "Conditions",
    description:
      "Learn how if, elif and else help programs make decisions.",
    xp: 30,
    available: false,
  },
  {
    id: 4,
    title: "Loops",
    description:
      "Understand for loops, while loops and repetitive programming tasks.",
    xp: 30,
    available: false,
  },
  {
    id: 5,
    title: "Functions",
    description:
      "Learn how to create reusable blocks of code using functions.",
    xp: 30,
    available: false,
  },
  {
    id: 6,
    title: "Lists & Dictionaries",
    description:
      "Work with Python collections and organize multiple pieces of data.",
    xp: 30,
    available: false,
  },
  {
    id: 7,
    title: "Object-Oriented Programming",
    description:
      "Understand classes, objects, attributes and methods in Python.",
    xp: 30,
    available: false,
  },
];

export default function PythonPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100">
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Back */}
        <button
          onClick={() => router.push("/learn/computer-science")}
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
        >
          <ArrowLeft size={18} />
          Back to Computer Science
        </button>

        {/* Hero */}
        <section className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl md:p-10">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-yellow-400/20 p-4 text-yellow-300">
                  <Code2 size={40} />
                </div>

                <div>

                  <p className="text-sm font-bold tracking-widest text-yellow-300">
                    COMPUTER SCIENCE • PROGRAMMING
                  </p>

                  <h1 className="mt-1 text-4xl font-bold">
                    Python
                  </h1>

                </div>

              </div>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Learn Python step by step through interactive lessons,
                quizzes and gamified progress.
              </p>

            </div>

            <div className="rounded-3xl bg-white/10 p-6 text-center">

              <Trophy
                size={42}
                className="mx-auto text-yellow-300"
              />

              <p className="mt-2 text-3xl font-bold">
                210 XP
              </p>

              <p className="text-sm text-slate-300">
                Total available
              </p>

            </div>

          </div>

        </section>

        {/* Learning Progress */}
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-md">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-bold text-indigo-600">
                PYTHON LEARNING PATH
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Your Progress
              </h2>

            </div>

            <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700">
              1 / 7 Lessons
            </span>

          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-indigo-600"
              style={{ width: "14%" }}
            />

          </div>

          <p className="mt-3 text-sm text-slate-500">
            Complete lessons and quizzes to unlock more Python topics.
          </p>

        </section>

        {/* Lessons */}
        <section className="mt-10">

          <div className="mb-6">

            <h2 className="text-2xl font-bold text-slate-900">
              Python Lessons
            </h2>

            <p className="mt-1 text-slate-500">
              Follow the path from fundamentals to advanced concepts.
            </p>

          </div>

          <div className="space-y-4">

            {lessons.map((lesson) => (

              <div
                key={lesson.id}
                className={`rounded-3xl border bg-white p-6 shadow-md transition ${
                  lesson.available
                    ? "border-indigo-200 hover:-translate-y-1 hover:shadow-lg"
                    : "border-slate-200"
                }`}
              >

                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                  <div className="flex items-start gap-4">

                    {/* Number / Lock */}
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                        lesson.available
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >

                      {lesson.available ? (
                        <span className="text-lg font-bold">
                          {lesson.id}
                        </span>
                      ) : (
                        <Lock size={20} />
                      )}

                    </div>

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="text-xl font-bold text-slate-900">
                          {lesson.title}
                        </h3>

                        {lesson.available && (
                          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                            AVAILABLE
                          </span>
                        )}

                      </div>

                      <p className="mt-2 max-w-2xl leading-6 text-slate-500">
                        {lesson.description}
                      </p>

                      <div className="mt-3 flex items-center gap-4 text-sm">

                        <span className="flex items-center gap-1 font-semibold text-indigo-600">
                          <Sparkles size={15} />
                          +{lesson.xp} XP
                        </span>

                        <span className="flex items-center gap-1 text-slate-400">
                          <BookOpen size={15} />
                          Lesson {lesson.id}
                        </span>

                      </div>

                    </div>

                  </div>

                  {lesson.available ? (

                    <button
                      onClick={() =>
                        router.push(
                          `/learn/computer-science/python/lesson/${lesson.id}`
                        )
                      }
                      className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
                    >
                      Start Lesson
                      <ArrowRight size={18} />
                    </button>

                  ) : (

                    <span className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-100 px-6 py-3 font-semibold text-slate-400">
                      <Lock size={17} />
                      Coming Soon
                    </span>

                  )}

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* Bottom Message */}
        <section className="mt-10 rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white shadow-xl">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <CheckCircle size={27} />

                <h2 className="text-2xl font-bold">
                  Learn by Doing
                </h2>

              </div>

              <p className="mt-2 max-w-2xl text-indigo-100">
                Every completed lesson brings you closer to new skills,
                quizzes, XP and achievements.
              </p>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}