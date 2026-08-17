
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import BlogContext from "../context/BlogContext";



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

    <>
    <h1>Add Blog</h1>

    <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form  onSubmit={handleSubmit}>

            <input type="text" placeholder="Enter the Title" value={title} onChange={handleTitle}/>
            <textarea
            placeholder="Content"
            value={content}
            onChange={handleContent}
          />

        <button type="submit">Create blog</button>

        </form>




    </div>
    
    </>
  )
}

export default AddBlog;