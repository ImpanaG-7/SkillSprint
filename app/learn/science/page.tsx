"use client";

import {
  ArrowLeft,
  ArrowRight,
  Atom,
  Beaker,
  BookOpen,
  Brain,
  Dna,
  FlaskConical,
  Microscope,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useRouter } from "next/navigation";

const subjects = [
  {
    title: "Biology",
    description:
      "Explore living organisms, cells, genetics, ecosystems and the human body.",
    icon: Dna,
    color: "green",
    topics: [
      "Cell Biology",
      "Genetics",
      "Human Biology",
      "Ecology",
      "Evolution",
      "Plant Biology",
    ],
  },
  {
    title: "Chemistry",
    description:
      "Understand matter, atoms, chemical reactions and the world of molecules.",
    icon: FlaskConical,
    color: "orange",
    topics: [
      "Atoms & Molecules",
      "Periodic Table",
      "Chemical Reactions",
      "Acids & Bases",
      "Organic Chemistry",
      "Thermochemistry",
    ],
  },
  {
    title: "Physics",
    description:
      "Discover the laws that explain motion, energy, forces, electricity and the universe.",
    icon: Atom,
    color: "blue",
    topics: [
      "Mechanics",
      "Motion & Forces",
      "Energy",
      "Electricity",
      "Waves",
      "Modern Physics",
    ],
  },
];

const colors: Record<
  string,
  {
    icon: string;
    badge: string;
    border: string;
    button: string;
  }
> = {
  green: {
    icon: "bg-green-100 text-green-600",
    badge: "bg-green-50 text-green-700",
    border: "hover:border-green-300",
    button: "bg-green-600 hover:bg-green-700",
  },
  orange: {
    icon: "bg-orange-100 text-orange-600",
    badge: "bg-orange-50 text-orange-700",
    border: "hover:border-orange-300",
    button: "bg-orange-600 hover:bg-orange-700",
  },
  blue: {
    icon: "bg-blue-100 text-blue-600",
    badge: "bg-blue-50 text-blue-700",
    border: "hover:border-blue-300",
    button: "bg-blue-600 hover:bg-blue-700",
  },
};

export default function SciencePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-100">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Back */}
        <button
          onClick={() => router.push("/learn")}
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
        >
          <ArrowLeft size={18} />
          Back to Learning Domains
        </button>

        {/* Hero */}
        <section className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl md:p-10">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div className="max-w-3xl">

              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-blue-500/20 p-4 text-blue-300">
                  <Microscope size={40} />
                </div>

                <div>
                  <p className="text-sm font-bold tracking-widest text-blue-300">
                    ECOQUEST • SCIENCE
                  </p>

                  <h1 className="mt-1 text-4xl font-bold md:text-5xl">
                    Science
                  </h1>
                </div>

              </div>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Discover the world through biology, chemistry and physics
                with interactive and gamified learning.
              </p>

            </div>

            <div className="hidden rounded-3xl bg-white/10 p-6 text-center md:block">

              <Atom
                size={50}
                className="mx-auto text-blue-300"
              />

              <p className="mt-3 text-3xl font-bold">
                3
              </p>

              <p className="text-sm text-slate-300">
                Science Subjects
              </p>

            </div>

          </div>

        </section>

        {/* Learning Flow */}
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-md">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm font-bold text-blue-600">
                SCIENCE LEARNING PATH
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Explore → Understand → Practice
              </h2>

              <p className="mt-2 text-slate-500">
                Explore scientific concepts and build knowledge step by step.
              </p>

            </div>

            <div className="flex flex-wrap gap-2">

              <span className="rounded-full bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
                Biology
              </span>

              <span className="rounded-full bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-700">
                Chemistry
              </span>

              <span className="rounded-full bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                Physics
              </span>

            </div>

          </div>

        </section>

        {/* Subjects */}
        <section className="mt-10">

          <div className="mb-6">

            <h2 className="text-2xl font-bold text-slate-900">
              Explore Science
            </h2>

            <p className="mt-1 text-slate-500">
              Choose a subject and explore its major concepts.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {subjects.map((subject) => {

              const Icon = subject.icon;
              const style = colors[subject.color];

              return (
                <div
                  key={subject.title}
                  className={`group rounded-3xl border border-slate-200 bg-white p-7 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl ${style.border}`}
                >

                  <div className="flex items-start justify-between">

                    <div className={`rounded-2xl p-4 ${style.icon}`}>
                      <Icon size={34} />
                    </div>

                    <Sparkles
                      size={20}
                      className="text-slate-300"
                    />

                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-slate-900">
                    {subject.title}
                  </h3>

                  <p className="mt-2 min-h-[72px] leading-6 text-slate-600">
                    {subject.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">

                    {subject.topics.map((topic) => (
                      <span
                        key={topic}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${style.badge}`}
                      >
                        {topic}
                      </span>
                    ))}

                  </div>

                  <button
                    onClick={() => {
                      if (subject.title === "Biology") {
                        router.push("/learn/science/biology");
                      }

                      if (subject.title === "Chemistry") {
                        router.push("/learn/science/chemistry");
                      }

                      if (subject.title === "Physics") {
                        router.push("/learn/science/physics");
                      }
                    }}
                    className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white transition ${style.button}`}
                  >
                    Explore {subject.title}

                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>

                </div>
              );
            })}

          </div>

        </section>

        {/* Science Skills */}
        <section className="mt-10 rounded-3xl bg-white p-8 shadow-lg">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <Brain size={27} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              What You'll Build
            </h2>

          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl bg-blue-50 p-5">
              <BookOpen className="text-blue-600" size={24} />
              <h3 className="mt-3 font-bold text-slate-900">
                Scientific Knowledge
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Understand concepts and connect them to real-world examples.
              </p>
            </div>

            <div className="rounded-2xl bg-green-50 p-5">
              <FlaskConical className="text-green-600" size={24} />
              <h3 className="mt-3 font-bold text-slate-900">
                Problem Solving
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Develop logical and scientific thinking through challenges.
              </p>
            </div>

            <div className="rounded-2xl bg-purple-50 p-5">
              <Trophy className="text-purple-600" size={24} />
              <h3 className="mt-3 font-bold text-slate-900">
                Gamified Progress
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Earn XP, unlock achievements and track your learning journey.
              </p>
            </div>

          </div>

        </section>

        {/* Bottom CTA */}
        <section className="mt-10 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white shadow-xl">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <Sparkles size={28} />

                <h2 className="text-2xl font-bold">
                  Discover the Science Around You
                </h2>

              </div>

              <p className="mt-2 max-w-2xl text-blue-100">
                Start exploring scientific ideas and turn curiosity into
                knowledge.
              </p>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}