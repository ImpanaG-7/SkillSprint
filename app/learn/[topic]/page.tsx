"use client";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Leaf,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const topicData: Record<
  string,
  {
    title: string;
    description: string;
    lessons: string[];
  }
> = {
  climate: {
    title: "Climate & Environment",
    description:
      "Understand climate change, pollution, natural resources and the environment around us.",
    lessons: [
      "What is Climate Change?",
      "Causes of Climate Change",
      "Pollution and Its Effects",
      "How Can We Protect Our Environment?",
    ],
  },

  water: {
    title: "Water Conservation",
    description:
      "Learn why water matters and discover simple ways to conserve and protect it.",
    lessons: [
      "Why Water Matters",
      "Water Scarcity",
      "Ways to Save Water",
      "Protecting Freshwater Resources",
    ],
  },

  waste: {
    title: "Waste Management",
    description:
      "Learn about waste segregation, recycling, reuse and responsible waste disposal.",
    lessons: [
      "Understanding Waste",
      "Waste Segregation",
      "Recycling and Reuse",
      "Responsible Waste Disposal",
    ],
  },

  biodiversity: {
    title: "Biodiversity",
    description:
      "Explore ecosystems, plants, animals and the importance of protecting biodiversity.",
    lessons: [
      "What is Biodiversity?",
      "Ecosystems",
      "Threats to Biodiversity",
      "Protecting Nature",
    ],
  },
};

export default function TopicPage() {
  const params = useParams();
  const router = useRouter();

  const topic = String(params.topic || "").toLowerCase();
  const data = topicData[topic];

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-green-50 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Topic Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            Topic: {topic}
          </p>

          <button
            onClick={() => router.push("/learn")}
            className="mt-5 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white"
          >
            Back to Learn
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-100">
      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* Back */}
        <button
          onClick={() => router.push("/learn")}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-900"
        >
          <ArrowLeft size={18} />
          Back to Learn
        </button>

        {/* Header */}
        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-green-100 p-4 text-green-600">
              <Leaf size={34} />
            </div>

            <div>
              <p className="text-sm font-semibold text-green-600">
                ECOQUEST LEARNING PATH
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                {data.title}
              </h1>
            </div>

          </div>

          <p className="mt-6 max-w-3xl leading-7 text-slate-600">
            {data.description}
          </p>

          <div className="mt-6 flex items-center gap-2 rounded-xl bg-green-50 p-4 text-green-700">
            <BookOpen size={20} />

            <span className="font-medium">
              Complete each lesson and take the quiz to earn XP.
            </span>
          </div>

        </div>

        {/* Learning Path */}
        <div className="mt-8">

          <h2 className="text-2xl font-bold text-slate-900">
            Learning Path
          </h2>

          <p className="mt-1 text-slate-500">
            Start with Lesson 1 and continue step by step.
          </p>

          <div className="mt-5 space-y-4">

            {data.lessons.map((lesson, index) => (

              <button
                key={lesson}
                type="button"
                onClick={() =>
                  router.push(
                    `/learn/${topic}/lesson/${index + 1}`
                  )
                }
                className="flex w-full items-center justify-between rounded-2xl bg-white p-5 text-left shadow-md transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {lesson}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Beginner lesson • Learn + Take Quiz
                    </p>
                  </div>

                </div>

                <ArrowRight
                  size={20}
                  className="shrink-0 text-green-600"
                />

              </button>

            ))}

          </div>

        </div>

      </div>
    </main>
  );
}