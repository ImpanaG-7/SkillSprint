"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Lock,
  Triangle,
} from "lucide-react";

const lessons = [
  {
    title: "Introduction to Trigonometry",
    description:
      "Understand angles, triangles and the basic ideas behind trigonometry.",
    available: true,
  },
  {
    title: "Trigonometric Ratios",
    description:
      "Learn sine, cosine and tangent and how they relate to right triangles.",
    available: false,
  },
  {
    title: "Trigonometric Identities",
    description:
      "Explore important identities and relationships between trigonometric functions.",
    available: false,
  },
  {
    title: "Graphs of Trigonometric Functions",
    description:
      "Understand the graphs and behavior of sine, cosine and tangent.",
    available: false,
  },
  {
    title: "Applications of Trigonometry",
    description:
      "Apply trigonometric concepts to real-world problems and measurements.",
    available: false,
  },
];

export default function TrigonometryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-amber-100">
      <div className="mx-auto max-w-5xl px-6 py-10">

        <Link
          href="/learn/mathematics"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft size={18} />
          Back to Mathematics
        </Link>

        <section className="rounded-3xl bg-white p-8 shadow-lg">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
              <Triangle size={34} />
            </div>

            <div>
              <p className="text-sm font-bold text-orange-600">
                MATHEMATICS • TRIGONOMETRY
              </p>

              <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
                Trigonometry
              </h1>
            </div>

          </div>

          <p className="mt-6 leading-7 text-slate-600">
            Explore angles, triangles, trigonometric ratios, identities and
            the applications of trigonometry.
          </p>

          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-orange-50 p-4 text-orange-700">
            <BookOpen size={20} />

            <span className="font-medium">
              Build your trigonometry skills step by step.
            </span>
          </div>

        </section>

        <section className="mt-10">

          <h2 className="text-2xl font-bold text-slate-900">
            Trigonometry Learning Path
          </h2>

          <p className="mt-1 text-slate-500">
            Start with the fundamentals and progress through the topic.
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
                        ? "bg-orange-100 text-orange-700"
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