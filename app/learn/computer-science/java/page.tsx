"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Coffee,
  Lock,
} from "lucide-react";

const lessons = [
  {
    title: "Introduction to Java",
    description:
      "Understand Java, its features and why it is widely used for software development.",
    available: true,
  },
  {
    title: "Variables and Data Types",
    description:
      "Learn how Java stores numbers, characters, text and other types of data.",
    available: false,
  },
  {
    title: "Conditions and Loops",
    description:
      "Learn how Java programs make decisions and repeat instructions.",
    available: false,
  },
  {
    title: "Methods and Arrays",
    description:
      "Understand reusable methods, arrays and structured programming.",
    available: false,
  },
  {
    title: "Classes and Objects",
    description:
      "Learn the fundamentals of object-oriented programming using Java.",
    available: false,
  },
  {
    title: "Inheritance and Polymorphism",
    description:
      "Explore important object-oriented concepts used to build reusable software.",
    available: false,
  },
];

export default function JavaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-amber-100">
      <div className="mx-auto max-w-5xl px-6 py-10">

        <Link
          href="/learn/computer-science"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-700"
        >
          <ArrowLeft size={18} />
          Back to Computer Science
        </Link>

        <section className="rounded-3xl bg-white p-8 shadow-lg">
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
              <Coffee size={32} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
                Programming & Software Development
              </p>

              <h1 className="mt-1 text-3xl font-bold text-gray-900">
                Java
              </h1>

              <p className="mt-3 max-w-2xl text-gray-600">
                Learn Java programming from fundamental syntax to
                object-oriented programming concepts.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              Java Lessons
            </h2>

            <p className="mt-1 text-gray-600">
              Build your Java programming skills step by step.
            </p>
          </div>

          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.title}
                className={`flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm ${
                  lesson.available
                    ? "border-orange-200 hover:shadow-md"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      lesson.available
                        ? "bg-orange-100 text-orange-700"
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
                  <div className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
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