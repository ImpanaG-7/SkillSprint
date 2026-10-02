"use client";

import {
  ArrowLeft,
  CheckCircle,
  CircleHelp,
  Trophy,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Question = {
  id: number;
  quiz_id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
};

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();

  const topic = String(params.topic || "");
  const lessonId = Number(params.lesson || "");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch quiz questions from Supabase
  useEffect(() => {
    async function loadQuiz() {
      setLoading(true);
      setError("");

      try {
        // Find quiz for this lesson
        const { data: quiz, error: quizError } = await supabase
          .from("quizzes")
          .select("id")
          .eq("lesson_id", lessonId)
          .single();

       if (quizError) {
  console.error("Quiz error:", quizError);

  setError(
    `Quiz error: ${quizError.message} | Code: ${quizError.code}`
  );

  setLoading(false);
  return;
}

        // Fetch questions for this quiz
        const { data: questionData, error: questionError } =
          await supabase
            .from("questions")
            .select(
              `
              id,
              quiz_id,
              question,
              option_a,
              option_b,
              option_c,
              option_d,
              correct_answer
            `
            )
            .eq("quiz_id", quiz.id)
            .order("id");

        if (questionError) {
          console.error("Question error:", questionError);
          setError("Could not load quiz questions.");
          setLoading(false);
          return;
        }

        if (!questionData || questionData.length === 0) {
          setError("No questions found for this quiz.");
          setLoading(false);
          return;
        }

        setQuestions(questionData);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while loading the quiz.");
      }

      setLoading(false);
    }

    if (lessonId) {
      loadQuiz();
    }
  }, [lessonId]);

  // Loading screen
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-green-50 p-6">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />

          <p className="mt-4 font-medium text-slate-600">
            Loading your quiz...
          </p>
        </div>
      </main>
    );
  }

  // Error screen
  if (error || questions.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-green-50 p-6">
        <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
          <CircleHelp
            size={50}
            className="mx-auto text-red-500"
          />

          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Quiz Not Found
          </h1>

          <p className="mt-2 text-slate-600">
            {error || "No quiz questions are available."}
          </p>

          <button
            onClick={() => router.back()}
            className="mt-6 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  const quiz = questions[currentQuestion];

  const options = [
    quiz.option_a,
    quiz.option_b,
    quiz.option_c,
    quiz.option_d,
  ];

  const isCorrect = selectedAnswer === quiz.correct_answer;

  const isLastQuestion =
    currentQuestion === questions.length - 1;

  function handleSubmit() {
    if (!selectedAnswer) return;

    setSubmitted(true);
  }

  function handleNext() {
    if (!isLastQuestion) {
      setCurrentQuestion((previous) => previous + 1);
      setSelectedAnswer("");
      setSubmitted(false);
    } else {
      router.push(`/learn/${topic}`);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-100">
      <div className="mx-auto max-w-3xl px-6 py-10">

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 font-medium text-green-700"
        >
          <ArrowLeft size={18} />
          Back to Lesson
        </button>

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-green-100 p-4 text-green-600">
              <CircleHelp size={32} />
            </div>

            <div>
              <p className="text-sm font-bold text-green-600">
                ECOQUEST • QUIZ
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                Test Your Knowledge
              </h1>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-8">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-600">
                Question {currentQuestion + 1} of{" "}
                {questions.length}
              </span>

              <span className="font-semibold text-green-600">
                +30 XP
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-green-500 transition-all"
                style={{
                  width: `${
                    ((currentQuestion + 1) /
                      questions.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold leading-9 text-slate-900">
              {quiz.question}
            </h2>

            <div className="mt-6 space-y-3">
              {options.map((option) => {
                const selected = selectedAnswer === option;

                let optionClass =
                  "border-slate-200 bg-white hover:border-green-300 hover:bg-green-50";

                if (selected) {
                  optionClass =
                    "border-green-500 bg-green-50 ring-2 ring-green-200";
                }

                if (
                  submitted &&
                  option === quiz.correct_answer
                ) {
                  optionClass =
                    "border-green-500 bg-green-100 ring-2 ring-green-200";
                }

                if (
                  submitted &&
                  selected &&
                  option !== quiz.correct_answer
                ) {
                  optionClass =
                    "border-red-400 bg-red-50 ring-2 ring-red-200";
                }

                return (
                  <button
                    key={option}
                    type="button"
                    disabled={submitted}
                    onClick={() => setSelectedAnswer(option)}
                    className={`flex w-full items-center rounded-2xl border p-5 text-left transition ${optionClass}`}
                  >
                    <span className="font-medium text-slate-800">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result */}
          {submitted && (
            <div
              className={`mt-6 rounded-2xl p-5 ${
                isCorrect ? "bg-green-50" : "bg-red-50"
              }`}
            >
              {isCorrect ? (
                <>
                  <div className="flex items-center gap-3">
                    <CheckCircle
                      className="text-green-600"
                      size={28}
                    />

                    <h3 className="text-xl font-bold text-green-800">
                      Correct! 🎉
                    </h3>
                  </div>

                  <p className="mt-2 text-green-700">
                    Great job! You earned +30 XP.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-red-700">
                    Not quite!
                  </h3>

                  <p className="mt-2 text-red-600">
                    The correct answer is:
                  </p>

                  <p className="mt-1 font-semibold text-red-800">
                    {quiz.correct_answer}
                  </p>
                </>
              )}
            </div>
          )}

          {/* Button */}
          <div className="mt-8">
            {!submitted ? (
              <button
                type="button"
                disabled={!selectedAnswer}
                onClick={handleSubmit}
                className="w-full rounded-xl bg-green-600 px-6 py-4 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Submit Answer
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 font-bold text-white hover:bg-green-700"
              >
                <Trophy size={20} />

                {isLastQuestion
                  ? "Finish Quiz"
                  : "Next Question"}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}