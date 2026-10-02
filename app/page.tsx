"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Flame,
  Gamepad2,
  GraduationCap,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Learn",
    description:
      "Explore concepts across science, mathematics, environment and computer science.",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: Gamepad2,
    title: "Play",
    description:
      "Turn learning into interactive challenges and real-world missions.",
    color: "from-violet-400 to-purple-600",
  },
  {
    icon: Zap,
    title: "Earn XP",
    description:
      "Complete activities, quizzes and challenges to build your learning profile.",
    color: "from-fuchsia-400 to-pink-500",
  },
  {
    icon: Trophy,
    title: "Achieve",
    description:
      "Unlock achievements and demonstrate skills through meaningful projects.",
    color: "from-orange-400 to-rose-500",
  },
];

const domains = [
  ["🌱", "Environment", "Climate, water, waste & biodiversity"],
  ["🧪", "Science", "Biology, chemistry & physics"],
  ["📐", "Mathematics", "Algebra, calculus, statistics & more"],
  ["💻", "Computer Science", "Programming, systems, AI & data"],
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="cosmic-stars" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-500/20">
            <Sparkles className="h-5 w-5 text-cyan-300" />
          </div>

          <div>
            <div className="text-lg font-bold text-white">EcoQuest</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-violet-300">
              Smart Learning
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/learn"
            className="rounded-xl px-4 py-2 text-sm font-medium text-violet-100 hover:bg-white/5"
          >
            Learn
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-violet-300/20 bg-violet-500/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-xl"
          >
            Login
          </Link>
        </div>
      </nav>

      <section className="cosmic-enter mx-auto max-w-7xl px-6 pb-24 pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              <Sparkles className="h-4 w-4" />
              Gamified Smart Learning Platform
            </div>

            <h1 className="text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
              Learn.
              <br />
              <span className="cosmic-gradient-text">Play.</span>
              <br />
              Level Up.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-violet-100/75">
              A new way to learn where knowledge becomes challenges,
              challenges become skills, and real-world problems become
              opportunities to apply what you know.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/learn"
                className="cosmic-button flex items-center justify-center gap-2 rounded-2xl px-7 py-4 font-bold text-white"
              >
                Start Learning
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/missions"
                className="flex items-center justify-center gap-2 rounded-2xl border border-violet-300/20 bg-violet-500/10 px-7 py-4 font-bold text-violet-100"
              >
                Explore Missions
                <Gamepad2 className="h-5 w-5 text-fuchsia-300" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-violet-200/60">
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-cyan-300" />
                Earn XP
              </span>

              <span className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-300" />
                Build streaks
              </span>

              <span className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-fuchsia-300" />
                Unlock achievements
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-violet-500/25 blur-3xl" />

            <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />

            <div className="cosmic-glass cosmic-float relative rounded-[2rem] p-5">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#29235f]/60 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-violet-300">
                      Your Learning
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-white">
                      Cosmic Progress
                    </h2>
                  </div>

                  <GraduationCap className="h-6 w-6 text-cyan-300" />
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-cyan-300/10 bg-cyan-400/5 p-4">
                    <p className="text-xs text-cyan-200/60">XP</p>
                    <p className="mt-1 text-2xl font-black text-cyan-200">
                      325
                    </p>
                  </div>

                  <div className="rounded-2xl border border-fuchsia-300/10 bg-fuchsia-400/5 p-4">
                    <p className="text-xs text-fuchsia-200/60">Level</p>
                    <p className="mt-1 text-2xl font-black text-fuchsia-200">
                      1
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-violet-300/10 bg-violet-500/10 p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-violet-100/70">
                      Campus Water Challenge
                    </span>

                    <span className="font-bold text-cyan-300">
                      +150 XP
                    </span>
                  </div>

                  <div className="mt-3 h-2 rounded-full bg-violet-950/60">
                    <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-300" />
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-orange-300/10 bg-orange-400/5 p-4">
                  <div className="text-2xl">💧</div>

                  <div>
                    <p className="font-semibold text-white">
                      Real-World Solver
                    </p>

                    <p className="text-xs text-violet-200/50">
                      Cross-domain achievement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Learning becomes an experience.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="cosmic-glass cosmic-card rounded-3xl p-6"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color}`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-violet-100/60">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="cosmic-glass rounded-[2rem] p-8 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-fuchsia-300">
                Explore
              </p>

              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                One platform.
                <br />
                Many worlds.
              </h2>

              <p className="mt-5 leading-7 text-violet-100/60">
                Explore multiple academic domains while connecting knowledge
                to meaningful real-world problems.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {domains.map(([icon, title, description]) => (
                <Link
                  href="/learn"
                  key={title}
                  className="cosmic-card rounded-2xl border border-violet-300/10 bg-violet-500/5 p-5"
                >
                  <div className="text-3xl">{icon}</div>

                  <h3 className="mt-4 font-bold text-white">{title}</h3>

                  <p className="mt-1 text-sm text-violet-100/50">
                    {description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <div className="rounded-[2rem] border border-violet-300/20 bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-cyan-400/10 p-10 sm:p-16">
          <Sparkles className="mx-auto h-8 w-8 text-cyan-300" />

          <h2 className="mt-5 text-3xl font-black text-white sm:text-5xl">
            Your next level starts here.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-violet-100/60">
            Learn something new, take on a challenge and turn your knowledge
            into real skills.
          </p>

          <Link
            href="/login"
            className="cosmic-button mt-8 inline-flex items-center gap-2 rounded-2xl px-7 py-4 font-bold text-white"
          >
            Enter the Learning Universe
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-violet-300/10 px-6 py-8 text-center text-sm text-violet-200/40">
        EcoQuest • Gamified Smart Learning Platform
      </footer>
    </main>
  );
}
