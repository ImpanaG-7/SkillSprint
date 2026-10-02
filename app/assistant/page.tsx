"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Bot,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  MessageCircle,
  Send,
  Sparkles,
  User,
} from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const quickPrompts = [
  {
    icon: Lightbulb,
    title: "Explain a concept",
    prompt: "Explain photosynthesis in a simple way.",
  },
  {
    icon: BookOpen,
    title: "Help me learn",
    prompt: "Teach me an interesting computer science concept.",
  },
  {
    icon: CheckCircle2,
    title: "Give me a hint",
    prompt: "Give me a hint for solving a quadratic equation.",
  },
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m your AI Learning Mentor. Ask me about mathematics, science, environment, computer science, or any topic you want to understand.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(messageText?: string) {
    const message = (messageText ?? input).trim();

    if (!message || loading) return;

    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: message,
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
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data.reply ||
            "I couldn't generate a response. Please try again.",
        },
      ]);
    } catch (error) {
      console.error("Assistant error:", error);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I couldn't connect to the AI Mentor right now. Please make sure Ollama is running and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-slate-900">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-8 pt-10 md:px-10 md:pt-14">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-3 py-1.5 text-sm font-medium text-pink-700">
              <Sparkles className="h-4 w-4" />
              AI Learning Mentor
            </div>

            <h1 className="mt-6 max-w-2xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Learn with guidance,
              <span className="block text-slate-500">
                not just answers.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              Ask questions, understand difficult concepts, get hints, and
              explore new ideas with your personal learning mentor.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white">
                <Bot className="h-4 w-4" />
                AI-powered learning
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600">
                <MessageCircle className="h-4 w-4" />
                Ask anything
              </div>
            </div>
          </div>

          {/* Learning approach */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-100 text-pink-700">
              <Sparkles className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-950">
              Your mentor can help you
            </h2>

            <div className="mt-5 space-y-3">
              {[
                "Understand concepts step by step",
                "Get hints instead of just answers",
                "Explore examples and applications",
                "Learn across different subjects",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-[#f8f7f4] px-4 py-3"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />

                  <span className="text-sm text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main mentor area */}
      <section className="mx-auto max-w-7xl px-6 pb-14 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.32fr_0.68fr]">
          {/* Quick prompts */}
          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="px-2 pb-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Start here
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-950">
                Try a prompt
              </h2>
            </div>

            <div className="space-y-3">
              {quickPrompts.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => sendMessage(item.prompt)}
                    disabled={loading}
                    className="group w-full rounded-2xl border border-slate-200 bg-white p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-pink-200 hover:bg-pink-50/40 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-700">
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-950">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {item.prompt}
                        </p>
                      </div>

                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-pink-500" />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white">
              <Bot className="h-5 w-5 text-pink-300" />

              <p className="mt-4 text-sm font-semibold">
                Learning tip
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-300">
                Ask the mentor to explain something in a simpler way if the
                first explanation is difficult.
              </p>
            </div>
          </aside>

          {/* Chat */}
          <div className="flex min-h-[650px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {/* Chat header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 md:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-700">
                  <Bot className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-950">
                    Learning Mentor
                  </h2>

                  <div className="mt-0.5 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />

                    <span className="text-xs text-slate-500">
                      Ready to help
                    </span>
                  </div>
                </div>
              </div>

              <span className="hidden rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500 sm:block">
                llama3.2
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-5 overflow-y-auto bg-[#fcfbf9] p-5 md:p-7">
              {messages.map((message, index) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex gap-3 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isUser && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-700">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-3 ${
                        isUser
                          ? "rounded-br-md bg-slate-950 text-white"
                          : "rounded-bl-md border border-slate-200 bg-white text-slate-700 shadow-sm"
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm leading-6">
                        {message.content}
                      </p>
                    </div>

                    {isUser && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {loading && (
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-700">
                    <Bot className="h-4 w-4" />
                  </div>

                  <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-slate-200 bg-white p-4 md:p-5">
              <form onSubmit={handleSubmit}>
                <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-[#f8f7f4] p-2 transition focus-within:border-pink-300 focus-within:ring-2 focus-within:ring-pink-100">
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" &&
                        !event.shiftKey
                      ) {
                        event.preventDefault();
                        handleSubmit(
                          event as unknown as FormEvent<HTMLFormElement>
                        );
                      }
                    }}
                    placeholder="Ask your learning mentor..."
                    rows={1}
                    className="max-h-32 min-h-11 flex-1 resize-none border-0 bg-transparent px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />

                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-2 px-2 text-[11px] text-slate-400">
                  Press Enter to send · Shift + Enter for a new line
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}