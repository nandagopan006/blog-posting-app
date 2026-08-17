import { useNavigate } from "react-router-dom";
import { useContext,useState } from "react";

import BlogContext from "../context/BlogContext";
import AuthContext from "../context/AuthContext";

function BlogCard({ blog }) {
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
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "6px",
      }}
    >
      <h3>{blog.title}</h3>

      <p>{blog.content}</p>
      {error && <p style={{ color: "red" }}>{error}</p>} 
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleEdit}
          disabled={!isAuthor}
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          disabled={!isAuthor}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BlogCard;