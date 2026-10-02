"use client";

import {
  ArrowRight,
  BookOpen,
  Brain,
  Calculator,
  Code2,
  FlaskConical,
  Leaf,
  Sparkles,
  Globe2,
} from "lucide-react";

import { useRouter } from "next/navigation";

const domains = [
  {
    title: "Environment",
    description:
      "Explore climate, sustainability, ecosystems and real-world environmental challenges.",
    icon: Leaf,
    color: "bg-green-50",
    border: "border-green-200",
    iconColor: "text-green-600",
    button: "bg-green-600 hover:bg-green-700",
    href: "/learn/climate",
  },
  {
    title: "Science",
    description:
      "Discover biology, chemistry and physics through practical learning.",
    icon: FlaskConical,
    color: "bg-orange-50",
    border: "border-orange-200",
    iconColor: "text-orange-600",
    button: "bg-orange-500 hover:bg-orange-600",
    href: "/learn/science",
  },
  {
    title: "Mathematics",
    description:
      "Build problem-solving skills through algebra, calculus, statistics and more.",
    icon: Calculator,
    color: "bg-blue-50",
    border: "border-blue-200",
    iconColor: "text-blue-600",
    button: "bg-blue-600 hover:bg-blue-700",
    href: "/learn/mathematics",
  },
  {
    title: "Computer Science",
    description:
      "Learn programming, AI, data, systems and emerging technologies.",
    icon: Code2,
    color: "bg-pink-50",
    border: "border-pink-200",
    iconColor: "text-pink-600",
    button: "bg-pink-600 hover:bg-pink-700",
    href: "/learn/computer-science",
  },
];

export default function LearnPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-[#eef2ff] via-white to-[#fdf2f8] text-slate-900">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
        <div className="absolute top-40 -right-32 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/70 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
              Smart Education
            </p>

            <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
              Learning Hub
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              Learn, explore, solve and build real-world skills.
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:block"
          >
            Dashboard
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10">
        {/* Hero */}
        <section className="mb-10">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Your interactive learning space
            </div>

            <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Learn subjects.
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                Solve real problems.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Explore academic domains, ask your AI Learning Mentor,
              enter the 3D campus and complete missions that turn
              learning into practical skills.
            </p>
          </div>
        </section>

        {/* New platform features */}
        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          {/* AI Mentor */}
          <div className="group relative overflow-hidden rounded-3xl border border-pink-200 bg-white p-7 shadow-lg shadow-pink-100/50 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-pink-200/40 blur-3xl transition group-hover:bg-pink-300/50" />

            <div className="relative">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100">
                <Brain className="h-7 w-7 text-pink-600" />
              </div>

              <p className="text-sm font-bold uppercase tracking-wider text-pink-600">
                AI-powered learning
              </p>

              <h3 className="mt-2 text-2xl font-black">
                AI Learning Mentor
              </h3>

              <p className="mt-3 max-w-lg leading-6 text-slate-600">
                Ask questions, get step-by-step explanations, request
                hints, check your answers and learn in multiple languages.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-700">
                  Step-by-step
                </span>

                <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-700">
                  Multiple languages
                </span>

                <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-700">
                  AI explanations
                </span>
              </div>

              <button
                onClick={() => router.push("/assistant")}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-pink-600 px-5 py-3 font-bold text-white transition hover:bg-pink-700 hover:shadow-lg"
              >
                Open AI Mentor
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* 3D World */}
          <div className="group relative overflow-hidden rounded-3xl border border-emerald-200 bg-white p-7 shadow-lg shadow-emerald-100/50 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl transition group-hover:bg-emerald-300/50" />

            <div className="relative">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                <Globe2 className="h-7 w-7 text-emerald-600" />
              </div>

              <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
                Explore & discover
              </p>

              <h3 className="mt-2 text-2xl font-black">
                3D Learning World
              </h3>

              <p className="mt-3 max-w-lg leading-6 text-slate-600">
                Enter a virtual campus, explore subject areas and discover
                real-world missions such as the Campus Water Challenge.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  3D Campus
                </span>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Missions
                </span>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Earn XP
                </span>
              </div>

              <button
                onClick={() => router.push("/world")}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700 hover:shadow-lg"
              >
                Enter Learning World
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Subjects */}
        <section>
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-violet-600">
                Explore subjects
              </p>

              <h2 className="mt-1 text-3xl font-black">
                Choose your learning domain
              </h2>
            </div>

            <BookOpen className="hidden h-8 w-8 text-violet-400 sm:block" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {domains.map((domain) => {
              const Icon = domain.icon;

              return (
                <div
                  key={domain.title}
                  className={`group rounded-3xl border ${domain.border} ${domain.color} p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm`}
                    >
                      <Icon
                        className={`h-7 w-7 ${domain.iconColor}`}
                      />
                    </div>

                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-slate-500">
                      Explore
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-black">
                    {domain.title}
                  </h3>

                  <p className="mt-3 min-h-[72px] leading-6 text-slate-600">
                    {domain.description}
                  </p>

                  <button
                    onClick={() => router.push(domain.href)}
                    className={`mt-6 inline-flex items-center gap-2 rounded-xl ${domain.button} px-5 py-3 font-bold text-white transition hover:shadow-lg`}
                  >
                    Start Learning
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Learning flow */}
        <section className="mt-12 rounded-3xl border border-violet-100 bg-white/80 p-7 shadow-sm backdrop-blur">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-violet-600">
              Your learning journey
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Learn → Practice → Apply → Earn
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Combine lessons, AI guidance, real-world missions and
              achievements to build practical skills.
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-4">
            {[
              ["01", "Learn", "Understand concepts"],
              ["02", "Practice", "Test your knowledge"],
              ["03", "Apply", "Solve real problems"],
              ["04", "Earn XP", "Build your portfolio"],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-2xl bg-slate-50 p-5 text-center"
              >
                <div className="text-sm font-black text-violet-500">
                  {number}
                </div>

                <h3 className="mt-2 font-bold">
                  {title}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
