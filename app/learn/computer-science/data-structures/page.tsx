"use client";

import Link from "next/link";
import { ArrowLeft, Database, Layers, GitBranch, Network } from "lucide-react";

const topics = [
  {
    title: "Arrays",
    description: "Learn how data is stored and accessed using indexed collections.",
    icon: Layers,
  },
  {
    title: "Linked Lists",
    description: "Understand nodes, pointers and dynamic data structures.",
    icon: GitBranch,
  },
  {
    title: "Stacks & Queues",
    description: "Explore LIFO and FIFO structures through practical examples.",
    icon: Database,
  },
  {
    title: "Trees & Graphs",
    description: "Discover hierarchical and connected data structures.",
    icon: Network,
  },
];

export default function DataStructuresPage() {
  return (
    <main className="min-h-screen bg-[#fff1f7] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/learn/computer-science"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-pink-600"
        >
          <ArrowLeft size={18} />
          Back to Computer Science
        </Link>

        <section className="mb-10 rounded-3xl border border-pink-100 bg-white p-8 shadow-sm md:p-12">
          <div className="mb-4 inline-flex rounded-2xl bg-pink-100 p-3 text-pink-600">
            <Database size={28} />
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-pink-600">
            Computer Science
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Data Structures
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Learn how computers organize, store and manage information.
            Explore the fundamental structures used in programming and
            problem-solving.
          </p>
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Explore the topics
            </h2>
            <p className="mt-1 text-slate-600">
              Build your understanding step by step.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {topics.map((topic) => {
              const Icon = topic.icon;

              return (
                <div
                  key={topic.title}
                  className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">
                    {topic.title}
                  </h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    {topic.description}
                  </p>

                  <div className="mt-5 text-sm font-semibold text-pink-600">
                    Coming soon
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
