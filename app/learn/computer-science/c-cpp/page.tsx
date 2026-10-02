"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Code2,
  Lock,
} from "lucide-react";

const lessons = [
  {
    title: "Introduction to C / C++",
    description:
      "Understand the basics of C and C++ and why they are important programming languages.",
    available: true,
  },
  {
    title: "Variables and Data Types",
    description:
      "Learn how programs store numbers, characters and other types of data.",
    available: false,
  },
  {
    title: "Operators and Expressions",
    description:
      "Understand arithmetic, comparison and logical operators.",
    available: false,
  },
  {
    title: "Conditions and Loops",
    description:
      "Learn how programs make decisions and repeat instructions.",
    available: false,
  },
  {
    title: "Functions and Arrays",
    description:
      "Explore reusable functions, arrays and structured programming.",
    available: false,
  },
  {
    title: "Object-Oriented Programming",
    description:
      "Learn the core concepts of classes, objects, inheritance and polymorphism in C++.",
    available: false,
  },
];

export default function CCppPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100">
      <div className="mx-auto max-w-5xl px-6 py-10">

        <Link
          href="/learn/computer-science"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Computer Science
        </Link>

        <section className="rounded-3xl bg-white p-8 shadow-lg">
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <Code2 size={32} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Programming & Software Development
              </p>

              <h1 className="mt-1 text-3xl font-bold text-gray-900">
                C / C++
              </h1>

              <p className="mt-3 max-w-2xl text-gray-600">
                Learn programming fundamentals with C and C++, from basic
                syntax to object-oriented programming.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              C / C++ Lessons
            </h2>

            <p className="mt-1 text-gray-600">
              Build your programming skills step by step.
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