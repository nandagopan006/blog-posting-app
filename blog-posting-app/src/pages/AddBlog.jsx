
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import BlogContext from "../context/BlogContext";

const INPUT =
  "w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-slate-100 transition-all duration-300 ease-brand placeholder:text-slate-600 hover:border-white/15 focus:border-violet-400/60 focus:bg-white/[0.04] focus:ring-2 focus:ring-violet-500/25 focus:outline-none";

const LABEL = "text-[0.7rem] font-medium tracking-[0.12em] text-slate-500 uppercase";

const BTN_PRIMARY =
  "relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition-all duration-300 ease-brand hover:-translate-y-px hover:bg-violet-300 focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:outline-none active:translate-y-0 active:scale-95 sm:w-auto after:absolute after:inset-y-0 after:left-0 after:w-1/3 after:-translate-x-[130%] after:bg-gradient-to-r after:from-transparent after:via-white/70 after:to-transparent after:content-[''] hover:after:animate-shimmer";


function AddBlog() {

    const {addBlog}=useContext(BlogContext)

    const [title,setTitle]=useState("")
    const [content,setContent] = useState("")
    const [error,setError]=useState("")


    const navigate=useNavigate()

    function handleTitle(event){
    setTitle(event.target.value)
    }

    function handleContent(event){
        setContent(event.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault()
        setError("")



        if (!title.trim() && !content.trim()) {
      setError("Title and content are required.");
      return;
    }
    if (!title.trim()){

        setError("Title is required.")
        return;

    }
    if (!content.trim()){
        setError("Content is required")
        return ;
    }

    try{
        await addBlog(title,content)

        //  Reset form state & redirect to the blogs list
        setTitle("");
        setContent("");

        // Redirect to blogs page
        navigate("/blogs")

    }catch (error) {
        console.log(error)
        setError(error.message)
    }



    }


  return (

    <div className="mx-auto max-w-2xl">
      <div className="mb-8 animate-fade-up">
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Add Blog
        </h1>

        <p className="mt-1.5 text-sm text-slate-500">
          Give it a clear title and write the story below.
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
            <label className={LABEL} htmlFor="add-title">Title</label>
            <input id="add-title" className={INPUT} type="text" placeholder="Enter the Title" value={title} onChange={handleTitle}/>
          </div>

          <div className="flex flex-col gap-2">
            <label className={LABEL} htmlFor="add-content">Content</label>
            <textarea
            id="add-content"
            className={`${INPUT} min-h-52 resize-y leading-relaxed sm:min-h-64`}
            placeholder="Write your blog content here..."
            value={content}
            onChange={handleContent}
          />
          </div>

        <div className="flex justify-end pt-1">
          <button type="submit" className={BTN_PRIMARY}>Create blog</button>
        </div>

      </form>

    </div>
  )
}

export default AddBlog;
