"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Camera,
  CheckCircle2,
  MapPin,
  Upload,
  X,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export default function CampusWaterChallenge() {
  const [userId, setUserId] = useState<string | null>(null);
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [location, setLocation] = useState("");
  const [observation, setObservation] = useState("");

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadMission();
  }, []);

  async function loadMission() {
    if (!supabase) {
      setMessage("Supabase configuration is missing.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Please log in first.");
      return;
    }

    setUserId(user.id);

    const { data: profile } = await supabase
      .from("profiles")
      .select("xp")
      .eq("id", user.id)
      .single();

    if (profile) {
      setXp(profile.xp || 0);
    }

    const { data: mission } = await supabase
      .from("missions")
      .select("id")
      .eq("title", "Campus Water Challenge")
      .single();

    if (!mission) return;

    const { data: submission } = await supabase
      .from("mission_submissions")
      .select("id")
      .eq("mission_id", mission.id)
      .eq("user_id", user.id)
      .eq("status", "completed")
      .maybeSingle();

    if (submission) {
      setCompleted(true);
    }
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setPhoto(file);

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    setMessage("");
  }

  function removePhoto() {
    setPhoto(null);
    setPreview(null);
  }

  async function submitEvidence() {
    if (!supabase || !userId) {
      setMessage("Please log in before submitting evidence.");
      return;
    }

    if (!photo) {
      setMessage("Please select a photo first.");
      return;
    }

    if (!location.trim()) {
      setMessage("Please enter the location.");
      return;
    }

    if (!observation.trim()) {
      setMessage("Please describe what you observed.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      // Find the mission
      const { data: mission, error: missionError } = await supabase
        .from("missions")
        .select("id, xp_reward")
        .eq("title", "Campus Water Challenge")
        .single();

      if (missionError || !mission) {
        throw new Error("Campus Water Challenge was not found.");
      }

      // Create a unique file name
      const safeFileName = photo.name
        .replace(/[^a-zA-Z0-9.-]/g, "-")
        .toLowerCase();

      const filePath = `${userId}/${Date.now()}-${safeFileName}`;

      // Upload photo to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("mission-evidence")
        .upload(filePath, photo, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // Save evidence information in the database
      const { error: evidenceError } = await supabase
        .from("mission_evidence")
        .insert({
          mission_id: mission.id,
          user_id: userId,
          photo_path: filePath,
          location: location.trim(),
          observation: observation.trim(),
          verified: false,
        });

      if (evidenceError) {
        // Remove uploaded photo if database save fails
        await supabase.storage
          .from("mission-evidence")
          .remove([filePath]);

        throw new Error(evidenceError.message);
      }

      /*
        IMPORTANT:
        The user may have already completed this mission.

        If the mission is already completed:
        - Save the evidence
        - DO NOT award XP again
      */
      if (!completed) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("xp, level")
          .eq("id", userId)
          .single();

        if (profileError || !profile) {
          throw new Error("Could not load your profile.");
        }

        const currentXP = profile.xp || 0;
        const rewardXP = mission.xp_reward || 150;
        const newXP = currentXP + rewardXP;
        const newLevel = Math.max(1, Math.floor(newXP / 500) + 1);

        const { error: submissionError } = await supabase
          .from("mission_submissions")
          .insert({
            mission_id: mission.id,
            user_id: userId,
            status: "completed",
          });

        if (submissionError) {
          throw new Error(submissionError.message);
        }

        const { error: transactionError } = await supabase
          .from("xp_transactions")
          .insert({
            user_id: userId,
            xp_amount: rewardXP,
            source: "Campus Water Challenge - Photo Evidence",
          });

        if (transactionError) {
          throw new Error(transactionError.message);
        }

        const { error: profileUpdateError } = await supabase
          .from("profiles")
          .update({
            xp: newXP,
            level: newLevel,
          })
          .eq("id", userId);

        if (profileUpdateError) {
          throw new Error(profileUpdateError.message);
        }

        setXp(newXP);
        setCompleted(true);

        setMessage(
          `Evidence uploaded successfully! You earned ${rewardXP} XP.`
        );
      } else {
        setMessage(
          "Evidence uploaded successfully! Your mission was already completed, so no duplicate XP was awarded."
        );
      }

      setPhoto(null);
      setPreview(null);
      setLocation("");
      setObservation("");
    } catch (error) {
      console.error("Evidence submission error:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while uploading your evidence."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f3fff7] text-slate-900">
      {/* Header */}
      <header className="border-b border-emerald-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/missions"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-600"
          >
            <ArrowLeft size={18} />
            Back to Missions
          </Link>

          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <Sparkles size={16} />
            {xp} XP
          </div>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            <span>💧</span>
            Cross-Domain Mission
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Campus Water Challenge
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Investigate water usage around your campus, document your
            observations, and propose a practical solution using multiple
            academic skills.
          </p>
        </div>

        {/* Mission flow */}
        <div className="mb-10 grid gap-4 md:grid-cols-4">
          {[
            ["01", "Explore", "Observe a real-world problem"],
            ["02", "Measure", "Collect useful information"],
            ["03", "Document", "Capture photo evidence"],
            ["04", "Apply", "Propose a solution"],
          ].map(([number, title, description]) => (
            <div
              key={number}
              className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"
            >
              <div className="text-sm font-bold text-emerald-500">
                {number}
              </div>

              <h3 className="mt-2 text-lg font-bold">{title}</h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Evidence card */}
        <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">
              Submit Photo Evidence
            </h2>

            <p className="mt-2 text-slate-500">
              Upload a photo of the water-related observation you found.
            </p>
          </div>

          {/* Photo upload */}
          {!preview ? (
            <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 px-6 py-14 text-center transition hover:border-emerald-400 hover:bg-emerald-50">
              <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
                <Camera className="text-emerald-600" size={32} />
              </div>

              <h3 className="text-lg font-bold">
                Upload mission photo
              </h3>

              <p className="mt-2 max-w-md text-sm text-slate-500">
                Take a photo of a water tap, leak, tank, drainage area,
                water usage point, or another relevant observation.
              </p>

              <span className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition group-hover:bg-emerald-700">
                <Upload size={17} />
                Choose Photo
              </span>

              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-slate-50">
              <img
                src={preview}
                alt="Mission evidence preview"
                className="max-h-[450px] w-full object-contain"
              />

              <button
                type="button"
                onClick={removePhoto}
                className="absolute right-4 top-4 rounded-full bg-white p-2 text-slate-700 shadow-md transition hover:bg-red-50 hover:text-red-600"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold shadow">
                <CheckCircle2
                  size={17}
                  className="text-emerald-600"
                />
                Photo selected
              </div>
            </div>
          )}

          {/* Details */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <MapPin size={17} className="text-emerald-600" />
                Location
              </label>

              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Example: Main Building - Ground Floor"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                What did you observe?
              </label>

              <input
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Example: Tap is leaking continuously"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={submitEvidence}
            disabled={uploading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Uploading Evidence...
              </>
            ) : (
              <>
                <Upload size={19} />
                Submit Evidence
              </>
            )}
          </button>

          {/* Message */}
          {message && (
            <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
              {message}
            </div>
          )}
        </div>

        {/* Learning connection */}
        <div className="mt-8 rounded-3xl bg-slate-900 p-7 text-white">
          <div className="mb-4 flex items-center gap-2 text-emerald-300">
            <Sparkles size={18} />
            <span className="text-sm font-semibold">
              Smart Education
            </span>
          </div>

          <h2 className="text-2xl font-bold">
            One real-world problem. Multiple skills.
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div>
              <div className="text-2xl">📐</div>
              <p className="mt-2 font-semibold">Mathematics</p>
              <p className="mt-1 text-sm text-slate-400">
                Measurements and data
              </p>
            </div>

            <div>
              <div className="text-2xl">🔬</div>
              <p className="mt-2 font-semibold">Science</p>
              <p className="mt-1 text-sm text-slate-400">
                Water and conservation
              </p>
            </div>

            <div>
              <div className="text-2xl">💻</div>
              <p className="mt-2 font-semibold">Computer Science</p>
              <p className="mt-1 text-sm text-slate-400">
                Data and visualization
              </p>
            </div>

            <div>
              <div className="text-2xl">🌱</div>
              <p className="mt-2 font-semibold">Environment</p>
              <p className="mt-1 text-sm text-slate-400">
                Sustainability
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}