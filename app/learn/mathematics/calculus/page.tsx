"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FunctionSquare,
  Lock,
} from "lucide-react";

const lessons = [
  {
    title: "Introduction to Calculus",
    description:
      "Understand the basic idea of limits, change and continuous quantities.",
    available: true,
  },
  {
    title: "Limits",
    description:
      "Learn the fundamental concept of limits and how they are evaluated.",
    available: false,
  },
  {
    title: "Differentiation",
    description:
      "Understand derivatives and how they describe rates of change.",
    available: false,
  },
  {
    title: "Integration",
    description:
      "Learn integration and its connection with area and accumulation.",
    available: false,
  },
  {
    title: "Applications of Calculus",
    description:
      "Explore how calculus is used to solve real-world problems.",
    available: false,
  },
];

export default function CalculusPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-indigo-100">
      <div className="mx-auto max-w-5xl px-6 py-10">

        <Link
          href="/learn/mathematics"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700"
        >
          <ArrowLeft size={18} />
          Back to Mathematics
        </Link>

        <section className="rounded-3xl bg-white p-8 shadow-lg">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
              <FunctionSquare size={34} />
            </div>

            <div>
              <p className="text-sm font-bold text-purple-600">
                MATHEMATICS • CALCULUS
              </p>

              <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
                Calculus
              </h1>
            </div>

          </div>

          <p className="mt-6 leading-7 text-slate-600">
            Explore limits, derivatives, integrals and the mathematics of
            change and accumulation.
          </p>

          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-purple-50 p-4 text-purple-700">
            <BookOpen size={20} />

            <span className="font-medium">
              Build your calculus knowledge step by step.
            </span>
          </div>

        </section>

        <section className="mt-10">

          <h2 className="text-2xl font-bold text-slate-900">
            Calculus Learning Path
          </h2>

          <p className="mt-1 text-slate-500">
            Start with the fundamentals and progress through calculus.
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
                        ? "bg-purple-100 text-purple-700"
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