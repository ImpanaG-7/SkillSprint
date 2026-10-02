"use client";

import { ArrowLeft, ArrowRight, BookOpen, Code2 } from "lucide-react";
import Link from "next/link";

export default function JavaScriptTypeScriptLesson() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link
          href="/learn/computer-science/javascript-typescript"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to JavaScript & TypeScript
        </Link>

        <section className="mb-8 rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 via-slate-900 to-slate-950 p-8">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/15 text-yellow-400">
            <Code2 size={32} />
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-yellow-400">
            JavaScript & TypeScript
          </p>

          <h1 className="mb-4 text-4xl font-bold">
            Introduction to JavaScript & TypeScript
          </h1>

          <p className="max-w-3xl text-slate-300">
            Discover the languages that power modern web applications and
            understand why JavaScript and TypeScript are important for
            developers.
          </p>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <div className="mb-4 flex items-center gap-3">
              <BookOpen className="text-yellow-400" size={22} />
              <h2 className="text-2xl font-bold">What is JavaScript?</h2>
            </div>

            <p className="leading-7 text-slate-300">
              JavaScript is a programming language widely used to make
              websites interactive and dynamic. It can respond to user
              actions, update webpage content, communicate with servers and
              power complete web applications.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <h2 className="mb-4 text-2xl font-bold">
              Why is JavaScript important?
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Build interactive websites",
                "Create modern web applications",
                "Work with APIs and servers",
                "Build frontend and backend systems",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-slate-300"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <h2 className="mb-4 text-2xl font-bold">Your First Program</h2>

            <p className="mb-4 text-slate-300">
              JavaScript can display a message using{" "}
              <span className="font-mono text-yellow-400">console.log()</span>.
            </p>

            <pre className="overflow-x-auto rounded-xl bg-black p-5 text-sm text-green-400">
              <code>{`console.log("Hello, EcoQuest!");`}</code>
            </pre>

            <p className="mt-4 text-sm text-slate-400">
              This statement prints the message in the browser's developer
              console.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <h2 className="mb-4 text-2xl font-bold">What is TypeScript?</h2>

            <p className="leading-7 text-slate-300">
              TypeScript is a programming language built on top of JavaScript.
              It adds features such as static typing, which helps developers
              detect certain programming errors earlier and build larger
              applications more safely.
            </p>
          </section>

          <section className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-7">
            <h2 className="mb-4 text-2xl font-bold text-yellow-400">
              Key Takeaways
            </h2>

            <ul className="space-y-3 text-slate-300">
              <li>✓ JavaScript makes websites interactive.</li>
              <li>✓ JavaScript is widely used in modern web development.</li>
              <li>✓ TypeScript extends JavaScript with static typing.</li>
              <li>✓ Both are important for modern application development.</li>
            </ul>
          </section>
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            href="/learn/computer-science/javascript-typescript"
            className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-yellow-400"
          >
            Complete Lesson
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}