"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Atom,
  BookOpen,
  CheckCircle2,
  Lock,
} from "lucide-react";

const lessons = [
  {
    title: "Introduction to Chemistry",
    description:
      "Understand what chemistry is and explore the study of matter and its properties.",
    available: true,
  },
  {
    title: "Atoms and Elements",
    description:
      "Learn about atoms, elements, the periodic table and basic atomic structure.",
    available: false,
  },
  {
    title: "Chemical Reactions",
    description:
      "Understand how substances react and how chemical equations represent reactions.",
    available: false,
  },
  {
    title: "Acids, Bases and Salts",
    description:
      "Explore acids, bases, pH and the properties of common salts.",
    available: false,
  },
  {
    title: "Chemistry in Everyday Life",
    description:
      "Discover how chemistry is used in food, medicine, materials and everyday products.",
    available: false,
  },
];

export default function ChemistryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-100">
      <div className="mx-auto max-w-5xl px-6 py-10">

        <Link
          href="/learn/science"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Science
        </Link>

        <section className="rounded-3xl bg-white p-8 shadow-lg">
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <Atom size={32} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Science
              </p>

              <h1 className="mt-1 text-3xl font-bold text-gray-900">
                Chemistry
              </h1>

              <p className="mt-3 max-w-2xl text-gray-600">
                Explore matter, atoms, chemical reactions and the chemistry
                behind the world around us.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              Chemistry Lessons
            </h2>

            <p className="mt-1 text-gray-600">
              Build your chemistry knowledge step by step.
            </p>
          </div>

          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.title}
                className={`flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm ${
                  lesson.available
                    ? "border-blue-200 hover:shadow-md"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      lesson.available
                        ? "bg-blue-100 text-blue-700"
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
                  <div className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
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