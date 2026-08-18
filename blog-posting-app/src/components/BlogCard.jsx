import { useNavigate } from "react-router-dom";
import { useContext,useState } from "react";

import BlogContext from "../context/BlogContext";
import AuthContext from "../context/AuthContext";

/* card actions stay quiet until you hover the card (desktop only) -
   on touch screens there is no hover, so they are always visible */
const ACTION =
  "rounded-md px-2 py-1 text-xs font-medium text-slate-400 transition-colors duration-300 ease-brand hover:text-white focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-slate-400";

function BlogCard({ blog, index = 0 }) {
  const navigate = useNavigate();

  const { deleteBlog } = useContext(BlogContext);
  const { user } = useContext(AuthContext);

  const isAuthor = user?.uid === blog.authorId;
  const [error, setError] = useState("");

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
    <article
      className="group flex animate-fade-up flex-col rounded-xl border border-white/[0.07] bg-white/[0.015] p-5 transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.035] sm:p-6"
      style={{ animationDelay: `${Math.min(index, 12) * 70}ms` }}
    >
      <span className="mb-3 flex items-center gap-1.5 text-[0.68rem] font-medium tracking-[0.12em] text-slate-500 uppercase">
        <span
          className={
            isAuthor
              ? "h-1 w-1 rounded-full bg-violet-400 transition-transform duration-500 ease-brand group-hover:scale-150"
              : "h-1 w-1 rounded-full bg-slate-600 transition-transform duration-500 ease-brand group-hover:scale-150"
          }
        />
        {isAuthor ? "Your post" : "Community"}
      </span>

      <h3 className="mb-2 text-base font-semibold tracking-tight break-words text-slate-200 transition-colors duration-300 ease-brand group-hover:text-white sm:text-lg">
        {blog.title}
      </h3>

      <p className="mb-5 line-clamp-5 text-sm leading-relaxed break-words whitespace-pre-wrap text-slate-500 transition-colors duration-500 ease-brand group-hover:text-slate-400">
        {blog.content}
      </p>

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
  );
}

export default BlogCard;
