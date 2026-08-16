import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import BlogContext from "../context/BlogContext";

function BlogCard({blog}) {
    const navigate=useNavigate()
    const {deleteBlog}= useContext(BlogContext)
function handleEdit(){
    navigate(`/blogs/edit/${blog.id}`);

}

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "15px", borderRadius: "6px" }}>
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
      
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handleEdit} >Edit</button>
        <button onClick={()=>deleteBlog(blog.id)}>Delete</button>
      </div>
    </div>
  );
}

export default BlogCard;
