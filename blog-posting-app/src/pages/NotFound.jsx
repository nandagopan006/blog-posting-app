function NotFound() {
  return (
    <div className="flex min-h-[55vh] animate-fade-up flex-col items-center justify-center text-center">
      <span className="text-5xl font-semibold tracking-tighter text-white/90 sm:text-6xl">
        404
      </span>

      <div className="my-5 h-px w-10 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

      <h1 className="text-lg font-medium text-slate-300">Page Not Found</h1>

      <p className="mt-2 text-sm text-slate-500">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}

export default NotFound;
