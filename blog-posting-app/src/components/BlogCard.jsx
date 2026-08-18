import { useNavigate } from "react-router-dom";
import { useContext,useState,useEffect } from "react";
import { createPortal } from "react-dom";

import BlogContext from "../context/BlogContext";
import AuthContext from "../context/AuthContext";

/* card actions stay quiet until you hover the card (desktop only) -
   on touch screens there is no hover, so they are always visible */
const ACTION =
  "rounded-md px-2 py-1 text-xs font-medium text-slate-400 transition-colors duration-300 ease-brand hover:text-white focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-slate-400";

function EyeIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 12S6 5.75 12 5.75 21.5 12 21.5 12 18 18.25 12 18.25 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3.1" />
    </svg>
  );
}

function BlogCard({ blog, index = 0 }) {
  const navigate = useNavigate();

  const { deleteBlog } = useContext(BlogContext);
  const { user } = useContext(AuthContext);

  const isAuthor = user?.uid === blog.authorId;
  const [error, setError] = useState("");
  const [isReading, setIsReading] = useState(false);

  /* while the modal is open: lock page scroll and close on Escape */
  useEffect(() => {
    if (!isReading) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsReading(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isReading]);

  function handleEdit() {
    if (!isAuthor) {
      return;
    }

    navigate(`/blogs/edit/${blog.id}`);
  }

  async function handleDelete() {
    if (!isAuthor) {
      return;
    }

    setError("")

    try {
        await deleteBlog(blog.id);

    } catch (error){
        console.log(error);
        setError(error.message)
    }

  }

  return (
    <>
      <article
        className="group flex animate-fade-up flex-col rounded-xl border border-white/[0.07] bg-white/[0.015] p-5 transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.035] sm:p-6"
        style={{ animationDelay: `${Math.min(index, 12) * 70}ms` }}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <span className="flex items-center gap-1.5 pt-0.5 text-[0.68rem] font-medium tracking-[0.12em] text-slate-500 uppercase">
            <span
              className={
                isAuthor
                  ? "h-1 w-1 rounded-full bg-violet-400 transition-transform duration-500 ease-brand group-hover:scale-150"
                  : "h-1 w-1 rounded-full bg-slate-600 transition-transform duration-500 ease-brand group-hover:scale-150"
              }
            />
            {isAuthor ? "Your post" : "Community"}
          </span>

          <button
            type="button"
            onClick={() => setIsReading(true)}
            aria-label={`Read full blog: ${blog.title}`}
            title="Read full blog"
            className="-mt-1 -mr-1 shrink-0 rounded-lg border border-white/[0.07] p-1.5 text-slate-500 transition-all duration-300 ease-brand hover:scale-110 hover:border-white/20 hover:text-violet-300 focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:outline-none active:scale-95"
          >
            <EyeIcon className="h-4 w-4" />
          </button>
        </div>

        <h3 className="mb-2 text-base font-semibold tracking-tight break-words text-slate-200 transition-colors duration-300 ease-brand group-hover:text-white sm:text-lg">
          {blog.title}
        </h3>

        <p className="mb-4 line-clamp-4 text-sm leading-relaxed break-words whitespace-pre-wrap text-slate-500 transition-colors duration-500 ease-brand group-hover:text-slate-400">
          {blog.content}
        </p>

        <button
          type="button"
          onClick={() => setIsReading(true)}
          className="mb-5 self-start text-xs font-medium text-violet-400/80 transition-all duration-300 ease-brand hover:text-violet-300 focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:outline-none"
        >
          Read more
          <span className="ml-1 inline-block transition-transform duration-300 ease-brand group-hover:translate-x-0.5">
            &rarr;
          </span>
        </button>

        {error && (
          <p className="mb-4 animate-fade-up rounded-lg border border-rose-400/25 bg-rose-400/5 px-3 py-2 text-xs leading-relaxed break-words text-rose-300">
            {error}
          </p>
        )}

        <div className="mt-auto flex items-center gap-1 border-t border-white/[0.06] pt-3 transition-opacity duration-500 ease-brand sm:opacity-60 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
          <button
            onClick={handleEdit}
            disabled={!isAuthor}
            className={ACTION}
          >
            Edit
          </button>

          <span className="text-white/10">/</span>

          <button
            onClick={handleDelete}
            disabled={!isAuthor}
            className={`${ACTION} hover:text-rose-300 disabled:hover:text-slate-400`}
          >
            Delete
          </button>
        </div>
      </article>

      {/* portalled to <body> so the card's hover transform cannot trap it */}
      {isReading &&
        createPortal(
          <div
            className="fixed inset-0 z-100 flex animate-backdrop-in items-end justify-center bg-black/75 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={() => setIsReading(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`blog-modal-title-${blog.id}`}
          >
            <div
              className="flex max-h-[88vh] w-full animate-sheet-in flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-ink shadow-2xl shadow-black/60 sm:max-h-[82vh] sm:max-w-2xl sm:animate-modal-in sm:rounded-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              {/* grab handle - mobile sheet affordance only */}
              <div className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-white/15 sm:hidden" />

              <div className="flex items-start justify-between gap-4 border-b border-white/[0.07] px-5 pt-4 pb-4 sm:px-7 sm:pt-6">
                <div className="min-w-0">
                  <span className="flex items-center gap-1.5 text-[0.68rem] font-medium tracking-[0.12em] text-slate-500 uppercase">
                    <span
                      className={
                        isAuthor
                          ? "h-1 w-1 rounded-full bg-violet-400"
                          : "h-1 w-1 rounded-full bg-slate-600"
                      }
                    />
                    {isAuthor ? "Your post" : "Community"}
                  </span>

                  <h2
                    id={`blog-modal-title-${blog.id}`}
                    className="mt-2 text-lg font-semibold tracking-tight break-words text-white sm:text-2xl"
                  >
                    {blog.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setIsReading(false)}
                  aria-label="Close"
                  autoFocus
                  className="-mt-1 shrink-0 rounded-lg border border-white/[0.07] p-2 text-slate-400 transition-all duration-300 ease-brand hover:rotate-90 hover:border-white/20 hover:text-white focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:outline-none active:scale-95"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6">
                <p className="text-sm leading-[1.85] break-words whitespace-pre-wrap text-slate-300 sm:text-[0.95rem]">
                  {blog.content}
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default BlogCard;
