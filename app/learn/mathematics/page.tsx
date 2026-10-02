"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calculator,
  ChartNoAxesColumn,
  FunctionSquare,
  Percent,
  Sigma,
} from "lucide-react";

const topics = [
  {
    title: "Algebra",
    description:
      "Learn equations, expressions, variables, inequalities and mathematical relationships.",
    icon: Calculator,
    color: "bg-blue-100 text-blue-600",
    href: "/learn/mathematics/algebra",
  },
  {
    title: "Calculus",
    description:
      "Explore limits, differentiation, integration and how quantities change.",
    icon: FunctionSquare,
    color: "bg-purple-100 text-purple-600",
    href: "/learn/mathematics/calculus",
  },
  {
    title: "Trigonometry",
    description:
      "Understand angles, triangles, trigonometric ratios and identities.",
    icon: Sigma,
    color: "bg-orange-100 text-orange-600",
    href: "/learn/mathematics/trigonometry",
  },
  {
    title: "Probability",
    description:
      "Learn how to measure uncertainty and calculate the likelihood of events.",
    icon: Percent,
    color: "bg-green-100 text-green-600",
    href: "/learn/mathematics/probability",
  },
  {
    title: "Statistics",
    description:
      "Understand data, averages, distributions, graphs and statistical reasoning.",
    icon: ChartNoAxesColumn,
    color: "bg-pink-100 text-pink-600",
    href: "/learn/mathematics/statistics",
  },
];

export default function MathematicsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100">

      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Back */}
        <Link
          href="/learn"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Learn
        </Link>

        {/* Header */}
        <section className="rounded-3xl bg-white p-8 shadow-lg">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <Sigma size={34} />
            </div>

            <div>
              <p className="text-sm font-bold text-blue-600">
                MATHEMATICS
              </p>

              <h1 className="mt-1 text-3xl font-extrabold text-slate-900 md:text-4xl">
                Mathematics
              </h1>
            </div>

          </div>

          <p className="mt-6 max-w-3xl leading-7 text-slate-600">
            Build strong mathematical thinking through interactive learning
            paths covering algebra, calculus, trigonometry, probability and
            statistics.
          </p>

          <div className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm font-medium text-blue-700">
            Choose a topic to explore its learning path.
          </div>

        </section>

        {/* Topics */}
        <section className="mt-10">

          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-900">
              Mathematics Topics
            </h2>

            <p className="mt-1 text-slate-500">
              Select a subject to begin learning.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {topics.map((topic) => {

              const Icon = topic.icon;

              return (
                <Link
                  key={topic.title}
                  href={topic.href}
                  className="group rounded-3xl bg-white p-6 shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-xl"
                >

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${topic.color}`}
                  >
                    <Icon size={28} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    {topic.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {topic.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm font-bold text-blue-600">
                    Explore Topic
                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>

                </Link>
              );
            })}

          </div>

        </section>

      </div>
    </main>
  );
}