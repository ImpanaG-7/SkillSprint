"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Lock,
} from "lucide-react";

const lessons = [
  {
    title: "Introduction to Statistics",
    description:
      "Understand what statistics is and how data is collected, organized and interpreted.",
    available: true,
  },
  {
    title: "Mean, Median and Mode",
    description:
      "Learn the most common measures used to describe a dataset.",
    available: false,
  },
  {
    title: "Data Representation",
    description:
      "Learn how data can be represented using tables, charts and graphs.",
    available: false,
  },
  {
    title: "Measures of Dispersion",
    description:
      "Understand range, variance and standard deviation.",
    available: false,
  },
  {
    title: "Applications of Statistics",
    description:
      "Apply statistical concepts to real-world data and decision making.",
    available: false,
  },
];

export default function StatisticsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-100">
      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* Back */}
        <Link
          href="/learn/mathematics"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-700"
        >
          <ArrowLeft size={18} />
          Back to Mathematics
        </Link>

        {/* Header */}
        <section className="rounded-3xl bg-white p-8 shadow-lg">
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
              <BarChart3 size={32} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
                Mathematics
              </p>

              <h1 className="mt-1 text-3xl font-bold text-gray-900">
                Statistics
              </h1>

              <p className="mt-3 max-w-2xl text-gray-600">
                Learn how to collect, organize, analyze and interpret data
                using fundamental statistical concepts.
              </p>
            </div>
          </div>
        </section>

        {/* Lessons */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              Statistics Lessons
            </h2>

            <p className="mt-1 text-gray-600">
              Learn statistics step by step.
            </p>
          </div>

          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.title}
                className={`flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm ${
                  lesson.available
                    ? "border-green-200 hover:shadow-md"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      lesson.available
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {lesson.available ? (
                      <BookOpen size={22} />
                    ) : (
                      <Lock size={20} />
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {index + 1}. {lesson.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {lesson.description}
                    </p>
                  </div>
                </div>

                {lesson.available ? (
                  <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                    <CheckCircle2 size={16} />
                    Available
                  </div>
                ) : (
                  <div className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500">
                    Locked
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}