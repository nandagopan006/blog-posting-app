import BlogCard from "../components/BlogCard";
import { useContext } from "react";
import { Link } from "react-router-dom";
import BlogContext from "../context/BlogContext";

const BTN_PRIMARY =
  "relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition-all duration-300 ease-brand hover:-translate-y-px hover:bg-violet-300 focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:outline-none active:translate-y-0 active:scale-95 sm:w-auto after:absolute after:inset-y-0 after:left-0 after:w-1/3 after:-translate-x-[130%] after:bg-gradient-to-r after:from-transparent after:via-white/70 after:to-transparent after:content-[''] hover:after:animate-shimmer";

function BlogList() {
    const {blogs}=useContext(BlogContext)
  return (
    <div>
      <div className="mb-10 flex animate-fade-up flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-baseline gap-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Blogs
            <span className="text-base font-normal text-slate-600 tabular-nums">
              {blogs.length}
            </span>
          </h1>

          <p className="mt-1.5 text-sm text-slate-500">
            Everything published so far.
          </p>
        </div>

        <Link to="/blogs/add" className={BTN_PRIMARY}>
          New Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div
          className="animate-fade-up py-20 text-center"
          style={{ animationDelay: "80ms" }}
        >
          <div className="mx-auto mb-5 h-px w-10 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

          <h3 className="text-lg font-medium text-slate-300">No blogs yet</h3>

          <p className="mx-auto mt-2 mb-7 max-w-xs text-sm text-slate-500">
            Nothing has been published so far. Write the first one.
          </p>

          <Link to="/blogs/add" className={BTN_PRIMARY}>
            Create your first blog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index}  />
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogList;
