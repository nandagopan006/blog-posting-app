import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import BlogContext from "../context/BlogContext";
import AuthContext from "../context/AuthContext";

const INPUT =
  "w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-slate-100 transition-all duration-300 ease-brand placeholder:text-slate-600 hover:border-white/15 focus:border-violet-400/60 focus:bg-white/[0.04] focus:ring-2 focus:ring-violet-500/25 focus:outline-none";

const LABEL = "text-[0.7rem] font-medium tracking-[0.12em] text-slate-500 uppercase";

const BTN_GHOST =
  "inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-slate-400 transition-colors duration-300 ease-brand hover:text-white focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:outline-none sm:w-auto";

const BTN_PRIMARY =
  "relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition-all duration-300 ease-brand hover:-translate-y-px hover:bg-violet-300 focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:outline-none active:translate-y-0 active:scale-95 sm:w-auto after:absolute after:inset-y-0 after:left-0 after:w-1/3 after:-translate-x-[130%] after:bg-gradient-to-r after:from-transparent after:via-white/70 after:to-transparent after:content-[''] hover:after:animate-shimmer";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { blogs, updateBlog } = useContext(BlogContext);
  const { user } = useContext(AuthContext);

  const existingBlog = blogs.find(
    (blog) => String(blog.id) === id
  );

  const [title, setTitle] = useState(
    existingBlog?.title ?? ""
  );

  const [content, setContent] = useState(
    existingBlog?.content ?? ""
  );

  const [error, setError] = useState("");


  if (!existingBlog) {
    return (
      <div className="animate-fade-up py-20 text-center">
        <div className="mx-auto mb-5 h-px w-10 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

        <h2 className="text-lg font-medium text-slate-300">Blog not found</h2>

        <p className="mx-auto mt-2 mb-7 max-w-xs text-sm text-slate-500">
          This blog may have been deleted or the link is incorrect.
        </p>

        <button onClick={() => navigate("/blogs")} className={BTN_PRIMARY}>
          Back to Blogs
        </button>
      </div>
    );
  }

  const isAuthor = user?.uid === existingBlog.authorId;

  if (!isAuthor) {
    return (
      <div className="animate-fade-up py-20 text-center">
        <div className="mx-auto mb-5 h-px w-10 bg-gradient-to-r from-transparent via-rose-400/60 to-transparent" />

        <h2 className="text-lg font-medium text-slate-300">
          You cannot edit this blog.
        </h2>

        <p className="mx-auto mt-2 mb-7 max-w-xs text-sm text-slate-500">
          Only the author of a blog is allowed to edit it.
        </p>

        <button onClick={() => navigate("/blogs")} className={BTN_PRIMARY}>
          Back to Blogs
        </button>
      </div>
    );
  }

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleContent(e) {
    setContent(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!title.trim() && !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!content.trim()) {
      setError("Content is required.");
      return;
    }

    const updatedBlog = {
      id: existingBlog.id,
      title: title.trim(),
      content: content.trim(),
    };

    try {

      await updateBlog(updatedBlog);

      navigate("/blogs");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 animate-fade-up">
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Edit Blog
        </h1>

        <p className="mt-1.5 text-sm text-slate-500">
          Update the title or content, then save.
        </p>
      </div>

      {error && (
        <p className="mb-5 animate-fade-up rounded-lg border border-rose-400/25 bg-rose-400/5 px-4 py-2.5 text-sm leading-relaxed break-words text-rose-300">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex animate-fade-up flex-col gap-5"
        style={{ animationDelay: "80ms" }}
      >
        <div className="flex flex-col gap-2">
          <label className={LABEL} htmlFor="edit-title">Title</label>

          <input
            id="edit-title"
            className={INPUT}
            type="text"
            placeholder="Enter the Title"
            value={title}
            onChange={handleTitle}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={LABEL} htmlFor="edit-content">Content</label>

          <textarea
            id="edit-content"
            className={`${INPUT} min-h-52 resize-y leading-relaxed sm:min-h-64`}
            placeholder="Write your blog content here..."
            value={content}
            onChange={handleContent}
          />
        </div>

        <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end sm:gap-3">
          <button
            type="button"
            onClick={() => navigate("/blogs")}
            className={BTN_GHOST}
          >
            Cancel
          </button>

          <button
            type="submit"
            className={BTN_PRIMARY}
          >
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBlog;
