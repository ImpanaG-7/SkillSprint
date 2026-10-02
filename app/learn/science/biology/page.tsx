"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Dna,
  Lock,
} from "lucide-react";

const lessons = [
  {
    title: "Introduction to Biology",
    description:
      "Understand what biology is and explore the study of living organisms.",
    available: true,
  },
  {
    title: "Cell Biology",
    description:
      "Learn about cells, their structures and how they perform essential functions.",
    available: false,
  },
  {
    title: "Human Biology",
    description:
      "Explore the major systems and functions of the human body.",
    available: false,
  },
  {
    title: "Genetics",
    description:
      "Understand genes, heredity and how characteristics are passed between generations.",
    available: false,
  },
  {
    title: "Ecology",
    description:
      "Learn how organisms interact with each other and their environment.",
    available: false,
  },
];

export default function BiologyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-100">
      <div className="mx-auto max-w-5xl px-6 py-10">

        <Link
          href="/learn/science"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-700"
        >
          <ArrowLeft size={18} />
          Back to Science
        </Link>

        <section className="rounded-3xl bg-white p-8 shadow-lg">
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
              <Dna size={32} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
                Science
              </p>

              <h1 className="mt-1 text-3xl font-bold text-gray-900">
                Biology
              </h1>

              <p className="mt-3 max-w-2xl text-gray-600">
                Explore living organisms, cells, genetics, the human body and
                ecosystems through interactive learning.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              Biology Lessons
            </h2>

            <p className="mt-1 text-gray-600">
              Build your biology knowledge step by step.
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