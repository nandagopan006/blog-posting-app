import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const INPUT =
  "w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-slate-100 transition-all duration-300 ease-brand placeholder:text-slate-600 hover:border-white/15 focus:border-violet-400/60 focus:bg-white/[0.04] focus:ring-2 focus:ring-violet-500/25 focus:outline-none";

const LABEL = "text-[0.7rem] font-medium tracking-[0.12em] text-slate-500 uppercase";

const BTN_PRIMARY =
  "relative mt-1 w-full overflow-hidden rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition-all duration-300 ease-brand hover:-translate-y-px hover:bg-violet-300 focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:outline-none active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:bg-white after:absolute after:inset-y-0 after:left-0 after:w-1/3 after:-translate-x-[130%] after:bg-gradient-to-r after:from-transparent after:via-white/70 after:to-transparent after:content-[''] hover:after:animate-shimmer";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      await login(email, password);
      navigate("/blogs");

    } catch (error) {
      console.log(error);

      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex items-center justify-center py-6 sm:min-h-[62vh]">
      <div className="w-full max-w-sm">
        {/* each block enters slightly after the one above it */}
        <div className="mb-8 animate-fade-up text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to continue to your blogs.
          </p>
        </div>

        {error && (
          <p className="mb-5 animate-fade-up rounded-lg border border-rose-400/25 bg-rose-400/5 px-4 py-2.5 text-sm leading-relaxed break-words text-rose-300">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex animate-fade-up flex-col gap-4"
          style={{ animationDelay: "90ms" }}
        >
          <div className="flex flex-col gap-2">
            <label className={LABEL} htmlFor="login-email">Email</label>

            <input
              id="login-email"
              className={INPUT}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={LABEL} htmlFor="login-password">Password</label>

            <input
              id="login-password"
              className={INPUT}
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit" disabled={submitting} className={BTN_PRIMARY}>
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p
          className="mt-8 animate-fade-up text-center text-sm text-slate-500"
          style={{ animationDelay: "170ms" }}
        >
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-slate-300 underline-offset-4 transition-colors duration-300 ease-brand hover:text-violet-300 hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
