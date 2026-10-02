"use client";

import {
  Eye,
  EyeOff,
  Gamepad2,
  Loader2,
  Lock,
  Mail,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (!email.trim() || !password.trim()) {
        setError("Please enter your email and password.");
        return;
      }

      if (password.length < 6) {
        setError("Password must contain at least 6 characters.");
        return;
      }

      if (isSignup) {
        // CREATE ACCOUNT
        const { data, error: signupError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });

        if (signupError) {
          throw signupError;
        }

        // If Supabase immediately creates a session
        if (data.session) {
          router.push("/dashboard");
          router.refresh();
          return;
        }

        // If email confirmation is required
        setMessage(
          "Account created! Check your email if Supabase asks you to confirm your account."
        );

        setIsSignup(false);
      } else {
        // LOGIN
        const { data, error: loginError } =
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });

        if (loginError) {
          throw loginError;
        }

        if (!data.session) {
          throw new Error("Login succeeded but no session was created.");
        }

        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      console.error("Authentication error:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-blue-100">
      <div className="flex min-h-screen items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg">
                <Gamepad2 size={26} />
              </div>

              <div className="text-left">
                <h1 className="text-2xl font-bold text-slate-900">
                  SkillSprint
                </h1>

                <p className="text-xs font-medium text-slate-500">
                  Smart Learning Platform
                </p>
              </div>
            </Link>
          </div>

          {/* Card */}
          <section className="rounded-3xl bg-white p-8 shadow-xl md:p-10">

            {/* Heading */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                {isSignup ? (
                  <UserPlus size={28} />
                ) : (
                  <Lock size={26} />
                )}
              </div>

              <h2 className="mt-5 text-3xl font-bold text-slate-900">
                {isSignup ? "Create Account" : "Welcome Back"}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {isSignup
                  ? "Create your SkillSprint student account."
                  : "Log in to continue your learning journey."}
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-50"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="At least 6 characters"
                    autoComplete={
                      isSignup ? "new-password" : "current-password"
                    }
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-600">
                  <strong className="font-semibold">
                    Error:
                  </strong>{" "}
                  {error}
                </div>
              )}

              {/* Success */}
              {message && (
                <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-700">
                  {message}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-bold text-white shadow-md transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />
                    {isSignup
                      ? "Creating Account..."
                      : "Logging In..."}
                  </>
                ) : isSignup ? (
                  <>
                    <UserPlus size={19} />
                    Create Account
                  </>
                ) : (
                  "Log In"
                )}
              </button>
            </form>

            {/* Switch */}
            <div className="mt-7 text-center">
              <p className="text-sm text-slate-500">
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </p>

              <button
                type="button"
                onClick={() => {
                  setIsSignup((previous) => !previous);
                  setError("");
                  setMessage("");
                }}
                disabled={loading}
                className="mt-2 font-bold text-indigo-600 transition hover:text-indigo-800 disabled:text-indigo-300"
              >
                {isSignup
                  ? "Log in instead"
                  : "Create a new account"}
              </button>
            </div>

          </section>

          {/* Back */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
            >
              ← Back to SkillSprint
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}