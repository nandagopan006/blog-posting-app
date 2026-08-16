import { useParams ,useNavigate} from "react-router-dom";
import { useState } from "react";


function EditBlog({blogs,updateBlog}) {

    const { id } = useParams()
    const navigate=useNavigate()

    const existingBlog =blogs.find((blog) => String(blog.id) === id)

    const [title, setTitle] = useState(existingBlog?.title ?? "")
    const [content, setContent] = useState(existingBlog?.content ?? "");
    const [error,setError]=useState("")

    if (!existingBlog){
        return (
      <div style={{ padding: "20px" }}>
        <h2>Blog not found</h2>
        <button onClick={() => navigate("/blogs")}>Back to Blogs</button>
      </div>
    );
    }

    function handleTitle(e){
        setTitle(e.target.value)
    }
    function handleContent(e){
        setContent(e.target.value)
    }

    function handleSubmit(e){

        e.preventDefault();

        if (!title.trim() && !content.trim()){
            setError("Title and content are required.")
            return;
        }
        if (!title){
            setError("Title is required");
            return;
        }
    if (!content){
        setError("Title is required");
            return;

    }

        const updatedBlog={
            id:existingBlog.id,
            title,
            content,
        }
        updateBlog(updatedBlog)
        navigate("/blogs")
    }

    

  return (
    <div>
      <h2>Edit Blog</h2>

       {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div>
          <textarea
            value={content}
            onChange={handleContent}
          />
        </div>
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
}

export default EditBlog;