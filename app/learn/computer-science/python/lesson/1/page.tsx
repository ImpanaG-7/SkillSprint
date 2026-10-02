"use client";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Code2,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function PythonLessonPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100">
      <div className="mx-auto max-w-4xl px-6 py-10">

        {/* Back */}
        <button
          onClick={() =>
            router.push("/learn/computer-science/python")
          }
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
        >
          <ArrowLeft size={18} />
          Back to Python
        </button>

        {/* Lesson Header */}
        <section className="rounded-3xl bg-white p-8 shadow-lg">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-yellow-100 p-4 text-yellow-600">
              <Code2 size={36} />
            </div>

            <div>

              <p className="text-sm font-bold tracking-wide text-indigo-600">
                PYTHON • LESSON 1
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">
                Python Fundamentals
              </h1>

            </div>

          </div>

          <p className="mt-6 leading-7 text-slate-600">
            Welcome to your first Python lesson. In this lesson, you'll
            understand what Python is, why it is popular and how to write
            your first Python program.
          </p>

          {/* XP */}
          <div className="mt-6 flex items-center gap-2 rounded-2xl bg-indigo-50 p-4 text-indigo-700">

            <Sparkles size={20} />

            <span className="font-semibold">
              Complete this lesson and earn +30 XP.
            </span>

          </div>

        </section>

        {/* Section 1 */}
        <section className="mt-8 rounded-3xl bg-white p-8 shadow-md">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <BookOpen size={24} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              What is Python?
            </h2>

          </div>

          <p className="mt-5 leading-8 text-slate-600">
            Python is a high-level, general-purpose programming language.
            It was designed to make programming easier to read and write.
            Python is widely used in web development, automation, data
            science, artificial intelligence, machine learning and many
            other areas.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            One of Python's biggest advantages is its simple and readable
            syntax. This makes Python a popular language for beginners as
            well as professional developers.
          </p>

        </section>

        {/* Section 2 */}
        <section className="mt-8 rounded-3xl bg-white p-8 shadow-md">

          <h2 className="text-2xl font-bold text-slate-900">
            Why Learn Python?
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">

            <div className="rounded-2xl bg-blue-50 p-5">

              <h3 className="font-bold text-blue-800">
                Easy to Learn
              </h3>

              <p className="mt-2 text-sm leading-6 text-blue-700">
                Python has clean and readable syntax that is friendly for
                beginners.
              </p>

            </div>

            <div className="rounded-2xl bg-green-50 p-5">

              <h3 className="font-bold text-green-800">
                Many Applications
              </h3>

              <p className="mt-2 text-sm leading-6 text-green-700">
                Python is used for websites, automation, AI, data science
                and much more.
              </p>

            </div>

            <div className="rounded-2xl bg-purple-50 p-5">

              <h3 className="font-bold text-purple-800">
                Huge Ecosystem
              </h3>

              <p className="mt-2 text-sm leading-6 text-purple-700">
                Thousands of libraries and frameworks are available for
                Python developers.
              </p>

            </div>

            <div className="rounded-2xl bg-yellow-50 p-5">

              <h3 className="font-bold text-yellow-800">
                Used in AI
              </h3>

              <p className="mt-2 text-sm leading-6 text-yellow-700">
                Python is widely used in artificial intelligence and
                machine learning.
              </p>

            </div>

          </div>

        </section>

        {/* Section 3 */}
        <section className="mt-8 rounded-3xl bg-white p-8 shadow-md">

          <h2 className="text-2xl font-bold text-slate-900">
            Your First Python Program
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            One of the simplest Python programs prints a message on the
            screen.
          </p>

          {/* Code Block */}
          <div className="mt-6 overflow-hidden rounded-2xl bg-slate-950">

            <div className="flex items-center gap-2 border-b border-slate-800 px-5 py-3">

              <Code2 size={18} className="text-indigo-400" />

              <span className="text-sm font-semibold text-slate-300">
                Python
              </span>

            </div>

            <pre className="overflow-x-auto p-6 text-sm leading-7 text-green-300">
              <code>{`print("Hello, EcoQuest!")`}</code>
            </pre>

          </div>

          <p className="mt-5 leading-7 text-slate-600">
            The <strong>print()</strong> function tells Python to display
            something on the screen. In this example, Python displays:
          </p>

          <div className="mt-4 rounded-2xl bg-green-50 p-5">

            <p className="font-mono font-semibold text-green-700">
              Hello, EcoQuest!
            </p>

          </div>

        </section>

        {/* Section 4 */}
        <section className="mt-8 rounded-3xl bg-white p-8 shadow-md">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-yellow-100 p-3 text-yellow-600">
              <Lightbulb size={24} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Key Takeaways
            </h2>

          </div>

          <div className="mt-5 space-y-3">

            <div className="flex gap-3">

              <CheckCircle
                size={20}
                className="mt-1 shrink-0 text-green-600"
              />

              <p className="text-slate-600">
                Python is a high-level, general-purpose programming language.
              </p>

            </div>

            <div className="flex gap-3">

              <CheckCircle
                size={20}
                className="mt-1 shrink-0 text-green-600"
              />

              <p className="text-slate-600">
                Python is known for simple and readable syntax.
              </p>

            </div>

            <div className="flex gap-3">

              <CheckCircle
                size={20}
                className="mt-1 shrink-0 text-green-600"
              />

              <p className="text-slate-600">
                Python is used in web development, automation, AI and data science.
              </p>

            </div>

            <div className="flex gap-3">

              <CheckCircle
                size={20}
                className="mt-1 shrink-0 text-green-600"
              />

              <p className="text-slate-600">
                The print() function can display information on the screen.
              </p>

            </div>

          </div>

        </section>

        {/* Quiz CTA */}
        <section className="mt-8 rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-center text-white shadow-xl">

          <Sparkles
            size={42}
            className="mx-auto text-yellow-300"
          />

          <h2 className="mt-4 text-2xl font-bold">
            Ready to test your knowledge?
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-indigo-100">
            Complete a quick quiz about Python Fundamentals and earn
            +30 XP.
          </p>

          <button
            onClick={() =>
              router.push(
                "/learn/computer-science/python/lesson/1/quiz"
              )
            }
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-bold text-indigo-700 transition hover:bg-indigo-50"
          >
            Take Python Quiz
            <ArrowRight size={19} />
          </button>

        </section>

      </div>
    </main>
  );
}