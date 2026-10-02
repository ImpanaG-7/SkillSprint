"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Lock,
  Sigma,
} from "lucide-react";

const lessons = [
  {
    title: "Introduction to Algebra",
    description: "Understand variables, constants and algebraic expressions.",
    available: true,
  },
  {
    title: "Linear Equations",
    description: "Learn how to solve simple linear equations.",
    available: false,
  },
  {
    title: "Quadratic Equations",
    description: "Explore quadratic equations and their solutions.",
    available: false,
  },
  {
    title: "Inequalities",
    description: "Learn how to work with mathematical inequalities.",
    available: false,
  },
  {
    title: "Algebraic Expressions",
    description: "Simplify and manipulate algebraic expressions.",
    available: false,
  },
];

export default function AlgebraPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100">

      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* Back */}
        <Link
          href="/learn/mathematics"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Mathematics
        </Link>

        {/* Header */}
        <section className="rounded-3xl bg-white p-8 shadow-lg">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <Sigma size={34} />
            </div>

            <div>
              <p className="text-sm font-bold text-blue-600">
                MATHEMATICS • ALGEBRA
              </p>

              <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
                Algebra
              </h1>
            </div>

          </div>

          <p className="mt-6 leading-7 text-slate-600">
            Learn how mathematical expressions, variables and equations work.
            Build the foundation needed for more advanced mathematics.
          </p>

          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-blue-50 p-4 text-blue-700">
            <BookOpen size={20} />

            <span className="font-medium">
              Complete lessons to build your Algebra skills.
            </span>
          </div>

        </section>

        {/* Learning Path */}
        <section className="mt-10">

          <h2 className="text-2xl font-bold text-slate-900">
            Algebra Learning Path
          </h2>

          <p className="mt-1 text-slate-500">
            Start with the fundamentals and progress step by step.
          </p>

          <div className="mt-6 space-y-4">

            {lessons.map((lesson, index) => (

              <div
                key={lesson.title}
                className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-md"
              >

                <div className="flex items-center gap-4">

                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                      lesson.available
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {lesson.available ? (
                      <CheckCircle2 size={23} />
                    ) : (
                      <Lock size={20} />
                    )}
                  </div>

                  <div>

                    <h3 className="font-bold text-slate-900">
                      {index + 1}. {lesson.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {lesson.description}
                    </p>

                  </div>

                </div>

                <div className="hidden sm:block">

                  {lesson.available ? (
                    <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-700">
                      AVAILABLE
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-400">
                      LOCKED
                    </span>
                  )}

                </div>

              </div>

            ))}

          </div>

        </section>

      </div>

    </main>
  );
}