"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Code2,
  Cpu,
  Database,
  Lock,
  Network,
  Sparkles,
} from "lucide-react";

const programmingTopics = [
  {
    title: "Python Fundamentals",
    description:
      "Learn variables, conditions, loops, functions and the foundations of Python.",
    icon: Code2,
    available: true,
    href: "/learn/computer-science/python",
    label: "Start Learning",
  },
  {
    title: "JavaScript / TypeScript",
    description:
      "Understand modern web programming and build interactive applications.",
    icon: Code2,
    available: true,
    href: "/learn/computer-science/javascript-typescript",
    label: "Start Learning",
  },
  {
    title: "C / C++",
    description:
      "Learn programming fundamentals, memory concepts and efficient code.",
    icon: Cpu,
    available: false,
    href: "#",
    label: "Coming Soon",
  },
  {
    title: "Java",
    description:
      "Explore object-oriented programming and application development.",
    icon: Code2,
    available: false,
    href: "#",
    label: "Coming Soon",
  },
  {
    title: "Data Structures",
    description:
      "Understand arrays, stacks, queues, trees and other core structures.",
    icon: Database,
    available: false,
    href: "#",
    label: "Coming Soon",
  },
  {
    title: "Algorithms",
    description:
      "Develop problem-solving skills through algorithmic thinking.",
    icon: Brain,
    available: false,
    href: "#",
    label: "Coming Soon",
  },
];

const systemTopics = [
  {
    title: "Computer Architecture",
    description: "Understand how computers process and store information.",
    icon: Cpu,
  },
  {
    title: "Operating Systems",
    description: "Explore processes, memory, files and system management.",
    icon: Database,
  },
  {
    title: "Computer Networks",
    description: "Learn how devices communicate across networks.",
    icon: Network,
  },
  {
    title: "Cybersecurity",
    description: "Understand security concepts and safe computing practices.",
    icon: Lock,
  },
];

const aiTopics = [
  "Artificial Intelligence",
  "Machine Learning",
  "Data Science",
  "Generative AI",
  "Natural Language Processing",
  "Computer Vision",
];

export default function ComputerSciencePage() {
  return (
    <main className="min-h-screen bg-[#fff1f7] text-[#241b2f]">
      {/* Soft background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-pink-200/30 blur-3xl" />
        <div className="absolute -right-32 top-[45%] h-96 w-96 rounded-full bg-fuchsia-200/20 blur-3xl" />
        <div className="absolute bottom-0 left-[35%] h-72 w-72 rounded-full bg-purple-200/20 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative border-b border-pink-200/70 bg-white/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/learn"
            className="group flex items-center gap-2 text-sm font-semibold text-[#6b5a72] transition hover:text-[#d9468f]"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            Learning Hub
          </Link>

          <div className="rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600">
            Computer Science
          </div>
        </div>
      </header>

      <div className="relative mx-auto max-w-7xl px-6 py-12">
        {/* Hero */}
        <section className="mb-14">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-semibold text-pink-600 shadow-sm">
              <Sparkles size={16} />
              Learn • Practice • Build
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight text-[#211827] md:text-6xl">
              Computer
              <span className="text-pink-500"> Science</span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6b5a72]">
              Learn how software, computers, data and intelligent systems work
              — from programming fundamentals to emerging technologies.
            </p>
          </div>
        </section>

        {/* Programming */}
        <section className="mb-14">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-[#261b2c]">
              Programming & Software Development
            </h2>

            <p className="mt-2 text-[#756879]">
              Build practical programming skills and learn how modern software
              is created.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {programmingTopics.map((topic, index) => {
              const Icon = topic.icon;

              const card = (
                <div
                  className={`group h-full rounded-3xl border p-6 transition-all duration-300 ${
                    topic.available
                      ? "border-pink-200 bg-white shadow-[0_8px_30px_rgba(217,70,143,0.08)] hover:-translate-y-2 hover:border-pink-300 hover:shadow-[0_18px_45px_rgba(217,70,143,0.16)]"
                      : "border-gray-200 bg-white/65 opacity-75"
                  }`}
                  style={{
                    animationDelay: `${index * 80}ms`,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        topic.available
                          ? "bg-pink-100 text-pink-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Icon size={23} />
                    </div>

                    {!topic.available && (
                      <div className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                        <Lock size={12} />
                        Locked
                      </div>
                    )}
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-[#291e31]">
                    {topic.title}
                  </h3>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#756879]">
                    {topic.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span
                      className={`text-sm font-semibold ${
                        topic.available
                          ? "text-pink-600"
                          : "text-gray-400"
                      }`}
                    >
                      {topic.label}
                    </span>

                    {topic.available && (
                      <ArrowRight
                        size={18}
                        className="text-pink-500 transition-transform group-hover:translate-x-1"
                      />
                    )}
                  </div>
                </div>
              );

              return topic.available ? (
                <Link key={topic.title} href={topic.href}>
                  {card}
                </Link>
              ) : (
                <div key={topic.title}>{card}</div>
              );
            })}
          </div>
        </section>

        {/* Systems */}
        <section className="mb-14">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-[#261b2c]">
              Computer Systems & Technology
            </h2>

            <p className="mt-2 text-[#756879]">
              Explore the technology underneath the applications we use every
              day.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {systemTopics.map((topic, index) => {
              const Icon = topic.icon;

              return (
                <div
                  key={topic.title}
                  className="group rounded-3xl border border-pink-100 bg-white/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-lg"
                  style={{
                    animationDelay: `${index * 80}ms`,
                  }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 font-bold text-[#2a2030]">
                    {topic.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#7b6c7f]">
                    {topic.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-gray-400">
                    <Lock size={12} />
                    Coming Soon
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* AI */}
        <section className="mb-14 rounded-[2rem] border border-fuchsia-200 bg-gradient-to-br from-white to-pink-50 p-8 shadow-[0_10px_40px_rgba(217,70,143,0.08)] md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-100 text-fuchsia-600">
                <Brain size={24} />
              </div>

              <h2 className="text-2xl font-bold text-[#291e31]">
                AI, Data & Emerging Technology
              </h2>

              <p className="mt-3 leading-7 text-[#756879]">
                Discover the technologies shaping the next generation of
                computing.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:w-[420px]">
              {aiTopics.map((topic) => (
                <div
                  key={topic}
                  className="rounded-2xl border border-fuchsia-100 bg-white px-4 py-3 text-sm font-medium text-[#62546a] shadow-sm"
                >
                  {topic}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Flow */}
        <section className="mb-10">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-[#261b2c]">
              Your Learning Flow
            </h2>

            <p className="mt-2 text-[#756879]">
              Learn concepts, practice them and prove what you can do.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["01", "Learn", "Understand the concept"],
              ["02", "Practice", "Solve small challenges"],
              ["03", "Quiz", "Test your understanding"],
              ["04", "Earn XP", "Build your learning profile"],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-bold text-pink-400">
                  {number}
                </span>

                <h3 className="mt-3 font-bold text-[#291e31]">{title}</h3>

                <p className="mt-2 text-sm text-[#7b6c7f]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom */}
        <section className="rounded-[2rem] border border-pink-200 bg-[#fce7f3] px-6 py-10 text-center md:px-10">
          <h2 className="text-2xl font-bold text-[#321f2d]">
            Start building your computer science skills.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-[#735d6d]">
            Begin with Python or JavaScript and gradually work your way toward
            advanced computing concepts.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/learn/computer-science/python"
              className="rounded-xl bg-pink-500 px-6 py-3 font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-pink-600 hover:shadow-lg"
            >
              Learn Python
            </Link>

            <Link
              href="/learn/computer-science/javascript-typescript"
              className="rounded-xl border border-pink-300 bg-white px-6 py-3 font-semibold text-pink-600 transition hover:-translate-y-1 hover:bg-pink-50"
            >
              Learn JavaScript
            </Link>
          </div>
        </section>
      </div>

      <style jsx>{`
        section,
        .group {
          animation: fadeUp 0.65s ease both;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}