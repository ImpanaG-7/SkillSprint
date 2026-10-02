"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Calculator,
  Code2,
  Globe2,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";

const subjects = [
  {
    title: "Environment",
    description:
      "Understand climate, sustainability, ecosystems and real-world environmental challenges.",
    href: "/learn/climate",
    icon: Globe2,
    accent: "bg-emerald-50 text-emerald-700 border-emerald-100",
    iconBg: "bg-emerald-100",
  },
  {
    title: "Science",
    description:
      "Explore scientific concepts through experiments, questions and practical learning.",
    href: "/learn/science",
    icon: Sparkles,
    accent: "bg-orange-50 text-orange-700 border-orange-100",
    iconBg: "bg-orange-100",
  },
  {
    title: "Mathematics",
    description:
      "Build problem-solving skills with numbers, patterns, logic and applied mathematics.",
    href: "/learn/mathematics",
    icon: Calculator,
    accent: "bg-blue-50 text-blue-700 border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    title: "Computer Science",
    description:
      "Learn programming, algorithms, data structures and computational thinking.",
    href: "/learn/computer-science",
    icon: Code2,
    accent: "bg-pink-50 text-pink-700 border-pink-100",
    iconBg: "bg-pink-100",
  },
];

const journeys = [
  {
    number: "01",
    title: "Learn",
    description: "Understand a concept through interactive lessons.",
    icon: BookOpen,
  },
  {
    number: "02",
    title: "Practice",
    description: "Test your understanding with questions and challenges.",
    icon: Zap,
  },
  {
    number: "03",
    title: "Apply",
    description: "Use what you learned to solve real-world problems.",
    icon: Trophy,
  },
  {
    number: "04",
    title: "Earn",
    description: "Build XP, achievements and a learning portfolio.",
    icon: Sparkles,
  },
];

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-slate-900">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-10 md:px-10 md:pt-14">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600">
              <BookOpen className="h-4 w-4" />
              Learning Hub
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Learn something useful.
              <span className="block text-slate-500">
                Then use it in the real world.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Explore subjects, solve challenges, practice your skills and
              turn what you learn into meaningful achievements.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/assistant"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <Brain className="h-4 w-4" />
                Ask AI Mentor
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/world"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Explore 3D World
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Learning principle card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
              <Sparkles className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-950">
              Learning by doing
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              SkillSprint turns learning into a journey where knowledge connects
              with missions, practice and real-world application.
            </p>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Your journey</span>
                <span className="font-semibold text-slate-900">
                  Learn → Apply
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-1/2 rounded-full bg-slate-900" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="mx-auto max-w-7xl px-6 pb-12 md:px-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Explore
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              Choose a subject
            </h2>
          </div>

          <span className="hidden text-sm text-slate-500 md:block">
            4 learning paths
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {subjects.map((subject) => {
            const Icon = subject.icon;

            return (
              <Link
                key={subject.title}
                href={subject.href}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${subject.iconBg}`}
                  >
                    <Icon className="h-5 w-5 text-slate-700" />
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition group-hover:border-slate-300 group-hover:text-slate-700">
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </div>
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  {subject.title}
                </h3>

                <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600">
                  {subject.description}
                </p>

                <div
                  className={`mt-5 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${subject.accent}`}
                >
                  Explore {subject.title}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Journey */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Your learning journey
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              Learn → Practice → Apply → Earn
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {journeys.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="rounded-2xl border border-slate-200 bg-[#f8f7f4] p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-widest text-slate-400">
                      {step.number}
                    </span>

                    <Icon className="h-5 w-5 text-slate-500" />
                  </div>

                  <h3 className="mt-5 font-bold text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI + 3D */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="grid gap-5 md:grid-cols-2">
          <Link
            href="/assistant"
            className="group rounded-3xl border border-slate-200 bg-slate-950 p-7 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                <Brain className="h-5 w-5" />
              </div>

              <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-white" />
            </div>

            <h3 className="mt-8 text-2xl font-bold">AI Learning Mentor</h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">
              Ask questions, get explanations, request hints and learn
              difficult concepts step by step.
            </p>

            <div className="mt-6 text-sm font-semibold text-white">
              Start a conversation →
            </div>
          </Link>

          <Link
            href="/world"
            className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Globe2 className="h-5 w-5" />
              </div>

              <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-700" />
            </div>

            <h3 className="mt-8 text-2xl font-bold text-slate-950">
              3D Learning World
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
              Enter the learning world, explore the campus and discover
              interactive missions.
            </p>

            <div className="mt-6 text-sm font-semibold text-slate-900">
              Enter the world →
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}