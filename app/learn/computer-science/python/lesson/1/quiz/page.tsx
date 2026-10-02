"use client";

import {
  ArrowLeft,
  CheckCircle,
  Circle,
  Loader2,
  Trophy,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const questions = [
  {
    question: "What is Python?",
    options: [
      "A programming language",
      "A database",
      "An operating system",
      "A web browser",
    ],
    answer: "A programming language",
  },
  {
    question: "Which function is commonly used to display output in Python?",
    options: [
      "display()",
      "print()",
      "show()",
      "output()",
    ],
    answer: "print()",
  },
  {
    question: 'What does print("Hello") do?',
    options: [
      "Creates a variable",
      "Displays Hello",
      "Deletes Hello",
      "Starts a loop",
    ],
    answer: "Displays Hello",
  },
  {
    question: "Which symbol is used to start a comment in Python?",
    options: ["//", "#", "/*", "--"],
    answer: "#",
  },
];

export default function PythonQuizPage() {
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const question = questions[currentQuestion];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = async () => {
    if (!selectedAnswer || saving) return;

    const isCorrect = selectedAnswer === question.answer;

    const finalScore = isCorrect ? score + 1 : score;

    if (isCorrect) {
      setScore((previous) => previous + 1);
    }

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
      setSelectedAnswer("");
      return;
    }

    setSaving(true);
    setSaveError("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        setSaveError(
          "You need to be logged in to save your XP."
        );
        setSaving(false);
        setFinished(true);
        return;
      }

      const xpEarned = finalScore * 25;

      const { error: xpError } = await supabase
        .from("xp_transactions")
        .insert({
          user_id: user.id,
          xp_amount: xpEarned,
          source: "Python Fundamentals Quiz",
        });

      if (xpError) {
        throw xpError;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("xp, level")
        .eq("id", user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        throw profileError;
      }

      if (profile) {
        const newXP = (profile.xp ?? 0) + xpEarned;

        const newLevel = Math.max(
          1,
          Math.floor(newXP / 500) + 1
        );

        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            xp: newXP,
            level: newLevel,
          })
          .eq("id", user.id);

        if (updateError) {
          throw updateError;
        }
      }

      setFinished(true);
    } catch (error) {
      console.error("XP save error:", error);

      setSaveError(
        "Your quiz was completed, but we couldn't save XP. Please try again."
      );

      setFinished(true);
    } finally {
      setSaving(false);
    }
  };

  const xpEarned = score * 25;

  if (finished) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-blue-100">
        <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 py-10">
          <section className="w-full rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
              <Trophy size={42} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-widest text-indigo-600">
              Quiz Complete
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              Great Work! 🎉
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-slate-500">
              You completed the Python Fundamentals quiz.
              Your result has been processed.
            </p>

            <div className="mx-auto mt-8 grid max-w-lg gap-4 sm:grid-cols-2">

              <div className="rounded-2xl bg-indigo-50 p-6">
                <p className="text-sm font-semibold text-indigo-600">
                  Score
                </p>

                <p className="mt-2 text-4xl font-bold text-indigo-700">
                  {score}/{questions.length}
                </p>
              </div>

              <div className="rounded-2xl bg-yellow-50 p-6">
                <p className="text-sm font-semibold text-yellow-600">
                  XP Earned
                </p>

                <p className="mt-2 text-4xl font-bold text-yellow-700">
                  +{xpEarned}
                </p>
              </div>

            </div>

            {saveError && (
              <div className="mx-auto mt-6 max-w-lg rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {saveError}
              </div>
            )}

            {!saveError && (
              <div className="mx-auto mt-6 max-w-lg rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
                ✓ XP saved to your SkillSprint profile
              </div>
            )}

            <button
              onClick={() =>
                router.push(
                  "/learn/computer-science/python"
                )
              }
              className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Back to Python
            </button>

          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-blue-100">
      <div className="mx-auto max-w-4xl px-6 py-10">

        <button
          onClick={() =>
            router.push(
              "/learn/computer-science/python/lesson/1"
            )
          }
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
        >
          <ArrowLeft size={18} />
          Back to Lesson
        </button>

        <section className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl">

          <p className="text-sm font-bold uppercase tracking-widest text-indigo-300">
            Python Fundamentals
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Quick Quiz
          </h1>

          <p className="mt-3 text-slate-300">
            Test what you learned from the first Python lesson.
          </p>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all"
              style={{
                width: `${
                  ((currentQuestion + 1) /
                    questions.length) *
                  100
                }%`,
              }}
            />
          </div>

          <p className="mt-3 text-sm text-slate-400">
            Question {currentQuestion + 1} of {questions.length}
          </p>

        </section>

        <section className="mt-6 rounded-3xl bg-white p-7 shadow-lg md:p-9">

          <h2 className="text-2xl font-bold leading-9 text-slate-900">
            {question.question}
          </h2>

          <div className="mt-7 space-y-3">

            {question.options.map((option) => {
              const selected = selectedAnswer === option;

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={saving}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                    selected
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50"
                  }`}
                >
                  {selected ? (
                    <CheckCircle
                      size={22}
                      className="shrink-0 text-indigo-600"
                    />
                  ) : (
                    <Circle
                      size={22}
                      className="shrink-0 text-slate-400"
                    />
                  )}

                  <span className="font-medium">
                    {option}
                  </span>
                </button>
              );
            })}

          </div>

          <button
            onClick={handleNext}
            disabled={!selectedAnswer || saving}
            className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold transition ${
              selectedAnswer && !saving
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "cursor-not-allowed bg-slate-200 text-slate-400"
            }`}
          >
            {saving ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Saving XP...
              </>
            ) : currentQuestion === questions.length - 1 ? (
              "Finish Quiz"
            ) : (
              "Next Question"
            )}
          </button>

        </section>

      </div>
    </main>
  );
}