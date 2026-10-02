"use client";

import { ArrowLeft, BookOpen, CheckCircle, Leaf } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const lessons: Record<
  string,
  {
    title: string;
    content: string[];
    fact: string;
  }
> = {
  "1": {
    title: "What is Climate Change?",
    content: [
      "Climate change refers to long-term changes in Earth's temperature and weather patterns.",
      "Human activities such as burning fossil fuels can increase greenhouse gases in the atmosphere.",
      "These changes can affect ecosystems, water resources, agriculture and communities.",
    ],
    fact: "Small actions can contribute to a healthier environment when many people participate.",
  },

  "2": {
    title: "Causes of Climate Change",
    content: [
      "Greenhouse gases trap heat in Earth's atmosphere.",
      "Major sources include energy production, transportation, industry and land-use changes.",
      "Understanding the causes helps us identify ways to reduce environmental impact.",
    ],
    fact: "Reducing unnecessary energy use is one simple way to lower environmental impact.",
  },

  "3": {
    title: "Pollution and Its Effects",
    content: [
      "Pollution occurs when harmful substances enter the air, water or soil.",
      "Different types of pollution can affect ecosystems, wildlife and human communities.",
      "Reducing waste and using resources responsibly can help reduce pollution.",
    ],
    fact: "Waste reduction and responsible disposal can help keep local environments cleaner.",
  },

  "4": {
    title: "How Can We Protect Our Environment?",
    content: [
      "Environmental protection involves using natural resources responsibly.",
      "Actions such as reducing waste, saving water, conserving energy and protecting biodiversity can help.",
      "Learning about environmental challenges helps students make informed everyday choices.",
    ],
    fact: "Learning becomes more meaningful when knowledge is connected to real-world action.",
  },
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();

  const lessonId = String(params.lesson || "");
  const lesson = lessons[lessonId];

  if (!lesson) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-green-50 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Lesson Not Found
          </h1>

          <button
            onClick={() => router.back()}
            className="mt-5 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-100">
      <div className="mx-auto max-w-4xl px-6 py-10">

        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 font-medium text-green-700"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-green-100 p-4 text-green-600">
              <Leaf size={32} />
            </div>

            <div>
              <p className="text-sm font-bold text-green-600">
                ECOQUEST • LESSON {lessonId}
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                {lesson.title}
              </h1>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {lesson.content.map((paragraph) => (
              <p
                key={paragraph}
                className="text-lg leading-8 text-slate-600"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-green-50 p-6">
            <div className="flex items-center gap-3">
              <BookOpen className="text-green-600" size={24} />

              <h2 className="font-bold text-slate-900">
                Key Takeaway
              </h2>
            </div>

            <p className="mt-3 leading-7 text-slate-600">
              {lesson.fact}
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-green-100 p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" size={24} />

              <div>
                <h2 className="font-bold text-slate-900">
                  Ready for the quiz?
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Test what you learned and earn XP.
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                router.push(
                  `/learn/${params.topic}/lesson/${lessonId}/quiz`
                )
              }
              className="mt-5 w-full rounded-xl bg-green-600 px-6 py-4 font-bold text-white hover:bg-green-700"
            >
              Take Quiz →
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}