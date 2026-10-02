"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

type Student = {
  id: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
};

type Submission = {
  id: number;
  user_id: string;
  mission_id: number;
  status: string;
  submitted_at: string;
};

export default function TeacherDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [missionCount, setMissionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTeacherDashboard();
  }, []);

  async function loadTeacherDashboard() {
    try {
      setLoading(true);
      setError("");

      if (!supabase) {
        setError("Supabase configuration is missing.");
        setLoading(false);
        return;
      }

      // Get students
      const { data: studentData, error: studentError } =
        await supabase
          .from("profiles")
          .select("id, email, xp, level, streak")
          .order("xp", { ascending: false });

      if (studentError) {
        throw studentError;
      }

      setStudents(studentData || []);

      // Get mission submissions
      const { data: submissionData, error: submissionError } =
        await supabase
          .from("mission_submissions")
          .select(
            "id, user_id, mission_id, status, submitted_at"
          )
          .order("submitted_at", { ascending: false });

      if (submissionError) {
        throw submissionError;
      }

      setSubmissions(submissionData || []);

      // Get missions
      const { data: missionData, error: missionError } =
        await supabase
          .from("missions")
          .select("id");

      if (missionError) {
        throw missionError;
      }

      setMissionCount(missionData?.length || 0);

    } catch (err) {
      console.error("Teacher dashboard error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  const totalXP = students.reduce(
    (total, student) => total + (student.xp || 0),
    0
  );

  const averageXP =
    students.length > 0
      ? Math.round(totalXP / students.length)
      : 0;

  const activeStudents = students.filter(
    (student) => student.streak > 0
  ).length;

  const completedMissions = submissions.filter(
    (submission) => submission.status === "completed"
  ).length;

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">

          <div className="text-5xl mb-4">
            👩‍🏫
          </div>

          <p className="text-slate-400">
            Loading teacher dashboard...
          </p>

        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 text-white px-6 py-10">

        <div className="max-w-3xl mx-auto">

          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8">

            <div className="text-5xl mb-4">
              ⚠️
            </div>

            <h1 className="text-2xl font-bold mb-3">
              Teacher Dashboard Error
            </h1>

            <p className="text-red-300">
              {error}
            </p>

            <button
              onClick={loadTeacherDashboard}
              className="mt-6 px-5 py-3 rounded-xl bg-white text-slate-950 font-semibold"
            >
              Try Again
            </button>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>

            <p className="text-blue-400 font-semibold mb-2">
              TEACHER CONTROL CENTER
            </p>

            <h1 className="text-4xl md:text-5xl font-bold">
              Teacher Dashboard 👩‍🏫
            </h1>

            <p className="text-slate-400 mt-2">
              Monitor student learning, engagement and real-world challenges.
            </p>

          </div>

          <button
            onClick={loadTeacherDashboard}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold"
          >
            ↻ Refresh Data
          </button>

        </div>

        {/* Statistics */}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-slate-400 text-sm">
              Students
            </p>

            <p className="text-3xl font-bold mt-2">
              {students.length}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-slate-400 text-sm">
              Total XP
            </p>

            <p className="text-3xl font-bold text-yellow-400 mt-2">
              {totalXP}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-slate-400 text-sm">
              Average XP
            </p>

            <p className="text-3xl font-bold text-purple-400 mt-2">
              {averageXP}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-slate-400 text-sm">
              Active Students
            </p>

            <p className="text-3xl font-bold text-orange-400 mt-2">
              {activeStudents}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-slate-400 text-sm">
              Missions
            </p>

            <p className="text-3xl font-bold text-cyan-400 mt-2">
              {missionCount}
            </p>

          </div>

        </section>

        {/* Student Progress */}

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 mb-10">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl font-bold">
                Student Progress
              </h2>

              <p className="text-slate-400 mt-1">
                Live XP, level and streak data from Supabase.
              </p>

            </div>

            <span className="text-sm text-slate-500">
              {students.length} student
              {students.length !== 1 ? "s" : ""}
            </span>

          </div>

          {students.length === 0 ? (

            <div className="text-center py-12 text-slate-500">
              No students found.
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead>

                  <tr className="border-b border-slate-800">

                    <th className="py-4 px-3 text-slate-400 font-medium">
                      #
                    </th>

                    <th className="py-4 px-3 text-slate-400 font-medium">
                      Student
                    </th>

                    <th className="py-4 px-3 text-slate-400 font-medium">
                      XP
                    </th>

                    <th className="py-4 px-3 text-slate-400 font-medium">
                      Level
                    </th>

                    <th className="py-4 px-3 text-slate-400 font-medium">
                      Streak
                    </th>

                    <th className="py-4 px-3 text-slate-400 font-medium">
                      Progress
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {students.map((student, index) => {

                    const progress =
                      Math.min(
                        ((student.xp % 500) / 500) * 100,
                        100
                      );

                    return (
                      <tr
                        key={student.id}
                        className="border-b border-slate-800/70 hover:bg-slate-800/30"
                      >

                        <td className="py-4 px-3 font-bold">
                          {index + 1}
                        </td>

                        <td className="py-4 px-3">

                          <div className="font-medium">
                            {student.email}
                          </div>

                          <div className="text-xs text-slate-500">
                            Student
                          </div>

                        </td>

                        <td className="py-4 px-3 text-yellow-400 font-bold">
                          {student.xp}
                        </td>

                        <td className="py-4 px-3">
                          Level {student.level}
                        </td>

                        <td className="py-4 px-3 text-orange-400">
                          {student.streak} 🔥
                        </td>

                        <td className="py-4 px-3 min-w-[180px]">

                          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">

                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{
                                width: `${progress}%`,
                              }}
                            />

                          </div>

                          <p className="text-xs text-slate-500 mt-2">
                            {Math.round(progress)}% to next level
                          </p>

                        </td>

                      </tr>
                    );

                  })}

                </tbody>

              </table>

            </div>

          )}

        </section>

        {/* Learning Insights */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-blue-400 font-semibold mb-2">
              LEARNING INSIGHT
            </p>

            <h2 className="text-2xl font-bold mb-3">
              Student Engagement
            </h2>

            <p className="text-slate-400">
              {activeStudents} of {students.length} student
              {students.length !== 1 ? "s are" : " is"} currently
              showing a learning streak.
            </p>

            <div className="mt-6">

              <div className="flex justify-between text-sm mb-2">

                <span className="text-slate-400">
                  Active engagement
                </span>

                <span className="text-emerald-400 font-semibold">
                  {students.length > 0
                    ? Math.round(
                        (activeStudents /
                          students.length) *
                          100
                      )
                    : 0}
                  %
                </span>

              </div>

              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">

                <div
                  className="h-full bg-emerald-500"
                  style={{
                    width: `${
                      students.length > 0
                        ? (activeStudents /
                            students.length) *
                          100
                        : 0
                    }%`,
                  }}
                />

              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

            <p className="text-cyan-400 font-semibold mb-2">
              CROSS-DOMAIN LEARNING
            </p>

            <h2 className="text-2xl font-bold mb-3">
              Mission Activity 💧
            </h2>

            <p className="text-slate-400">
              Students are using multiple academic domains
              to solve real-world problems.
            </p>

            <div className="mt-6 flex items-center gap-6">

              <div>

                <p className="text-3xl font-bold text-cyan-400">
                  {completedMissions}
                </p>

                <p className="text-sm text-slate-500">
                  Completed missions
                </p>

              </div>

              <div>

                <p className="text-3xl font-bold text-white">
                  {missionCount}
                </p>

                <p className="text-sm text-slate-500">
                  Available missions
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* Teacher Value */}

        <section className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8">

          <p className="text-blue-400 font-semibold mb-2">
            TEACHER INSIGHTS
          </p>

          <h2 className="text-2xl font-bold mb-3">
            From Activity to Demonstrated Skills
          </h2>

          <p className="text-slate-400 max-w-3xl">
            The platform connects student activity with measurable
            learning progress. Teachers can monitor XP, levels,
            streaks and real-world mission participation from one
            dashboard.
          </p>

        </section>

      </div>

    </main>
  );
}