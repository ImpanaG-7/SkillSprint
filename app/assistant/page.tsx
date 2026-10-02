"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Bot,
  Send,
  Sparkles,
  User,
  Lightbulb,
  BookOpen,
} from "lucide-react";
import { useRouter } from "next/navigation";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AssistantPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m your AI Learning Mentor. Ask me anything about your lessons, get a hint, or ask me to explain a concept step-by-step.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(message?: string) {
    const text = (message ?? input).trim();

    if (!text || loading) {
      return;
    }

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: text,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "I couldn't connect to the AI mentor. Please make sure Ollama is running and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fff1f7] text-slate-900">
      <header className="border-b border-pink-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <button
            onClick={() => router.push("/learn")}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Learning Hub
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-100">
              <Bot className="h-5 w-5 text-pink-600" />
            </div>

            <span className="font-black text-slate-800">
              AI Learning Mentor
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-8">
        <section className="mb-6 rounded-3xl border border-pink-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pink-100">
              <Sparkles className="h-7 w-7 text-pink-600" />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-pink-600">
                Smart Education
              </p>

              <h1 className="mt-1 text-3xl font-black">
                Learn with your AI Mentor
              </h1>

              <p className="mt-2 max-w-2xl leading-6 text-slate-600">
                Ask questions, understand difficult concepts, get hints,
                check your answers and learn step-by-step.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-6 grid gap-3 sm:grid-cols-3">
          <button
            onClick={() =>
              sendMessage("Explain climate change in simple words.")
            }
            className="rounded-2xl border border-pink-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <BookOpen className="h-5 w-5 text-pink-600" />

            <p className="mt-3 text-sm font-bold">
              Explain a concept
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Get a simple explanation
            </p>
          </button>

          <button
            onClick={() =>
              sendMessage(
                "Give me a hint for solving a difficult mathematics problem."
              )
            }
            className="rounded-2xl border border-pink-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Lightbulb className="h-5 w-5 text-pink-600" />

            <p className="mt-3 text-sm font-bold">
              Give me a hint
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Learn without getting the answer immediately
            </p>
          </button>

          <button
            onClick={() =>
              sendMessage(
                "Teach me one interesting computer science concept."
              )
            }
            className="rounded-2xl border border-pink-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Sparkles className="h-5 w-5 text-pink-600" />

            <p className="mt-3 text-sm font-bold">
              Teach me something
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Discover something new
            </p>
          </button>
        </section>

        <section className="overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-lg">
          <div className="h-[500px] overflow-y-auto p-5">
            <div className="space-y-5">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pink-100">
                      <Bot className="h-5 w-5 text-pink-600" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "rounded-br-md bg-pink-600 text-white"
                        : "rounded-bl-md bg-slate-100 text-slate-700"
                    }`}
                  >
                    {message.content}
                  </div>

                  {message.role === "user" && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-200">
                      <User className="h-5 w-5 text-slate-600" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-100">
                    <Bot className="h-5 w-5 text-pink-600" />
                  </div>

                  <div className="rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3 text-sm text-slate-500">
                    Thinking...
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-slate-100 bg-slate-50 p-4">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Ask your AI Learning Mentor..."
                disabled={loading}
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
              />

              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-600 text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-2 text-center text-xs text-slate-400">
              AI mentor • Step-by-step learning • Student focused
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}