export default function Navbar() {
  return (
    <header className="sticky top-4 z-50 flex justify-center px-6">
      <nav className="flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/40 bg-white/70 px-6 py-4 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white">
            E
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">SkillSprint</h1>
            <p className="text-xs text-slate-500">Smart Education</p>
          </div>
        </div>

        <div className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#features" className="hover:text-green-600">
            Features
          </a>

          <a href="#journey" className="hover:text-green-600">
            Journey
          </a>

          <a href="#leaderboard" className="hover:text-green-600">
            Leaderboard
          </a>
        </div>

        <button className="rounded-xl bg-green-600 px-5 py-2 text-white transition hover:bg-green-700">
          Login
        </button>
      </nav>
    </header>
  );
}