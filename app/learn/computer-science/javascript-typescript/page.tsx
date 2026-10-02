"use client";

import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Code2,
  Lock,
} from "lucide-react";
import Link from "next/link";

const lessons = [
  {
    title: "Introduction to JavaScript & TypeScript",
    description:
      "Understand JavaScript, TypeScript and their role in modern web development.",
    available: true,
  },
  {
    title: "Variables, Data Types & Operators",
    description:
      "Learn variables, primitive data types and basic operators.",
    available: false,
  },
  {
    title: "Conditions & Loops",
    description:
      "Understand if statements, switch statements and loops.",
    available: false,
  },
  {
    title: "Functions & Arrays",
    description:
      "Learn functions, arrays and common programming patterns.",
    available: false,
  },
  {
    title: "Objects & TypeScript Types",
    description:
      "Explore objects, interfaces, types and TypeScript fundamentals.",
    available: false,
  },
  {
    title: "DOM & Web Programming",
    description:
      "Understand how JavaScript interacts with webpages and user actions.",
    available: false,
  },
];

export default function JavaScriptTypeScriptPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/learn/computer-science"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Computer Science
        </Link>

        <section className="mb-10 rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 via-slate-900 to-slate-950 p-8">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/15 text-yellow-400">
            <Code2 size={32} />
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-yellow-400">
            Computer Science
          </p>

          <h1 className="mb-4 text-4xl font-bold">
            JavaScript & TypeScript
          </h1>

          <p className="max-w-3xl text-slate-300">
            Learn the foundations of JavaScript and TypeScript and understand
            how they are used to build modern web applications.
          </p>
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Learning Path</h2>
            <p className="mt-1 text-slate-400">
              Complete each lesson to progress through the module.
            </p>
          </div>

          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.title}
                className={`rounded-2xl border p-6 ${
                  lesson.available
                    ? "border-yellow-500/30 bg-yellow-500/5"
                    : "border-slate-800 bg-slate-900/60"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      lesson.available
                        ? "bg-yellow-500 text-slate-950"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {lesson.available ? (
                      <BookOpen size={21} />
                    ) : (
                      <Lock size={19} />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold">
                        {index + 1}. {lesson.title}
                      </h3>

                      {lesson.available && (
                        <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-semibold text-yellow-400">
                          AVAILABLE
                        </span>
                      )}

                      {!lesson.available && (
                        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-500">
                          LOCKED
                        </span>
                      )}
                    </div>

                    <p className="mb-4 text-sm leading-6 text-slate-400">
                      {lesson.description}
                    </p>

                    {lesson.available ? (
                      <Link
                        href="/learn/computer-science/javascript-typescript/lesson/1"
                        className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-yellow-400"
                      >
                        Start Lesson
                        <CheckCircle size={17} />
                      </Link>
                    ) : (
                      <span className="text-sm text-slate-600">
                        Complete previous lessons to unlock
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}