"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Droplets,
  Gamepad2,
  GraduationCap,
  Layers3,
  Play,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

const subjects = [
  {
    title: "Computer Science",
    description: "Build, experiment and solve problems with technology.",
    icon: Layers3,
    color: "bg-pink-50 text-pink-700 border-pink-100",
  },
  {
    title: "Environment",
    description: "Understand real-world environmental challenges.",
    icon: Droplets,
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    title: "Science",
    description: "Explore concepts through practical challenges.",
    icon: Sparkles,
    color: "bg-orange-50 text-orange-700 border-orange-100",
  },
  {
    title: "Mathematics",
    description: "Turn numbers and data into useful decisions.",
    icon: Target,
    color: "bg-blue-50 text-blue-700 border-blue-100",
  },
];

const journey = [
  {
    number: "01",
    title: "Explore",
    description: "Enter an interactive learning world and discover a problem.",
  },
  {
    number: "02",
    title: "Learn",
    description: "Use lessons and your AI mentor to understand what matters.",
  },
  {
    number: "03",
    title: "Apply",
    description: "Use knowledge from different subjects to solve the challenge.",
  },
  {
    number: "04",
    title: "Demonstrate",
    description: "Submit evidence, earn XP and build your learning portfolio.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f7f4] text-slate-900">
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-12 md:px-10 md:pb-28 md:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            {/* Hero copy */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 shadow-sm">
                <Sparkles className="h-4 w-4 text-violet-600" />
                Smart education, reimagined
              </div>

              <h1 className="mt-7 max-w-4xl text-5xl font-bold tracking-tight text-slate-950 md:text-6xl lg:text-7xl">
                Learn by solving
                <span className="block text-slate-500">
                  real-world problems.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                A gamified learning platform where students explore,
                understand, apply and demonstrate knowledge across multiple
                subjects.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/learn"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Start learning
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/world"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <Play className="h-4 w-4" />
                  Explore 3D world
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  AI-powered learning
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Real-world missions
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Digital portfolio
                </span>
              </div>
            </div>

            {/* Product preview */}
            <div className="relative">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-pink-200/40 blur-3xl" />
              <div className="absolute -bottom-10 -left-8 h-36 w-36 rounded-full bg-emerald-200/40 blur-3xl" />

              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl md:p-5">
                {/* Browser-like top */}
                <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />

                  <div className="ml-3 h-7 flex-1 rounded-lg bg-slate-50" />
                </div>

                {/* Dashboard preview */}
                <div className="mt-5 grid gap-4 sm:grid-cols-[0.36fr_0.64fr]">
                  <div className="rounded-2xl bg-slate-950 p-4 text-white">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                        <GraduationCap className="h-4 w-4" />
                      </div>

                      <span className="text-xs font-semibold">
                        Learning Hub
                      </span>
                    </div>

                    <div className="mt-8 space-y-3">
                      <div className="rounded-xl bg-white/10 p-3">
                        <p className="text-[10px] text-slate-400">
                          Current level
                        </p>
                        <p className="mt-1 text-xl font-bold">Level 1</p>
                      </div>

                      <div className="rounded-xl bg-white/10 p-3">
                        <p className="text-[10px] text-slate-400">
                          Learning streak
                        </p>
                        <p className="mt-1 text-xl font-bold">3 days</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-[#f8f7f4] p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-400">
                            Learning progress
                          </p>
                          <p className="mt-1 font-bold text-slate-950">
                            325 XP
                          </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                          <Zap className="h-4 w-4" />
                        </div>
                      </div>

                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                        <div className="h-full w-[65%] rounded-full bg-slate-900" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-pink-100 bg-pink-50 p-4">
                        <Bot className="h-5 w-5 text-pink-700" />
                        <p className="mt-4 text-sm font-bold text-slate-950">
                          AI Mentor
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Learn with guidance
                        </p>
                      </div>

                      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                        <Gamepad2 className="h-5 w-5 text-emerald-700" />
                        <p className="mt-4 text-sm font-bold text-slate-950">
                          3D World
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Explore missions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating XP card */}
              <div className="absolute -bottom-5 -left-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:-left-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <Trophy className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Achievement</p>
                    <p className="text-sm font-bold text-slate-950">
                      Water Hero
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core idea */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                A different learning loop
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Knowledge becomes useful when students use it.
              </h2>
            </div>

            <div>
              <p className="max-w-3xl text-base leading-8 text-slate-600">
                Instead of separating every subject into isolated lessons,
                the platform turns real-world problems into learning
                experiences. Students use mathematics, science, environment
                and computer science together to understand and solve a
                challenge.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-2 text-sm font-semibold">
                {["Explore", "Learn", "Apply", "Evidence", "Verify", "XP"].map(
                  (item, index, array) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="rounded-xl bg-[#f8f7f4] px-3 py-2 text-slate-700">
                        {item}
                      </span>

                      {index < array.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-slate-300" />
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Learn across domains
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              One problem. Multiple ways to think.
            </h2>
          </div>

          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
          >
            Explore learning
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => {
            const Icon = subject.icon;

            return (
              <div
                key={subject.title}
                className={`group rounded-2xl border bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md ${subject.color}`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-6 font-bold text-slate-950">
                  {subject.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {subject.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Signature mission */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f8f7f4]">
            <div className="grid lg:grid-cols-[1fr_0.8fr]">
              <div className="p-8 md:p-10 lg:p-12">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700">
                  <Droplets className="h-4 w-4" />
                  Signature learning mission
                </div>

                <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                  Campus Water Challenge
                </h2>

                <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                  Investigate campus water usage and propose a practical
                  solution using knowledge from multiple academic domains.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    "Measure and analyse data",
                    "Understand water conservation",
                    "Build a useful visualization",
                    "Propose a practical solution",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      {item}
                    </div>
                  ))}
                </div>

                <Link
                  href="/missions/campus-water"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Explore the mission
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="relative min-h-[320px] overflow-hidden border-t border-slate-200 bg-white lg:border-l lg:border-t-0">
                <div className="absolute inset-0 p-8 md:p-10">
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex justify-end">
                      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-xs text-slate-400">
                          Mission reward
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                          <Zap className="h-5 w-5 text-amber-500" />

                          <span className="text-2xl font-bold text-slate-950">
                            +150 XP
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-sm">
                      <div className="h-3 rounded-full bg-slate-200">
                        <div className="h-full w-[78%] rounded-full bg-blue-500" />
                      </div>

                      <div className="mt-4 grid grid-cols-4 gap-2">
                        {["Math", "Science", "CS", "Environment"].map(
                          (item) => (
                            <div
                              key={item}
                              className="rounded-xl border border-slate-200 bg-[#f8f7f4] p-3 text-center"
                            >
                              <p className="text-[11px] font-semibold text-slate-600">
                                {item}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            The learning journey
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            From curiosity to demonstrated skill.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {journey.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-sm font-bold text-slate-300">
                {step.number}
              </span>

              <h3 className="mt-5 text-lg font-bold text-slate-950">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-12 md:grid-cols-3 md:px-10">
          <Link
            href="/assistant"
            className="group rounded-2xl border border-slate-200 bg-[#f8f7f4] p-6 transition hover:-translate-y-1 hover:shadow-sm"
          >
            <Bot className="h-5 w-5 text-pink-600" />

            <h3 className="mt-5 font-bold text-slate-950">
              AI Learning Mentor
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Get explanations, hints and examples whenever you need them.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
              Meet your mentor
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/world"
            className="group rounded-2xl border border-slate-200 bg-[#f8f7f4] p-6 transition hover:-translate-y-1 hover:shadow-sm"
          >
            <Gamepad2 className="h-5 w-5 text-emerald-600" />

            <h3 className="mt-5 font-bold text-slate-950">
              3D Learning World
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Explore a playable campus and discover learning missions.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
              Enter the world
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/portfolio"
            className="group rounded-2xl border border-slate-200 bg-[#f8f7f4] p-6 transition hover:-translate-y-1 hover:shadow-sm"
          >
            <Trophy className="h-5 w-5 text-amber-600" />

            <h3 className="mt-5 font-bold text-slate-950">
              Digital Portfolio
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Turn completed missions and achievements into a record of your
              learning.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
              View portfolio
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="rounded-[2rem] bg-slate-950 px-7 py-12 text-center text-white md:px-12 md:py-16">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <GraduationCap className="h-6 w-6" />
          </div>

          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            Your next learning experience starts here.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
            Explore subjects, solve missions, learn with AI and build
            evidence of what you can actually do.
          </p>

          <Link
            href="/learn"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
          >
            Start your learning journey
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-white">
              <GraduationCap className="h-4 w-4" />
            </div>
            Smart Learning Platform
          </div>

          <p>
            Learn · Explore · Apply · Demonstrate
          </p>
        </div>
      </footer>
    </main>
  );
}