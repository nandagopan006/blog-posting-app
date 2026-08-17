import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import BlogContext from "../context/BlogContext";
import AuthContext from "../context/AuthContext";

function BlogCard({ blog }) {
  const navigate = useNavigate();

  const { deleteBlog } = useContext(BlogContext);
  const { user } = useContext(AuthContext);

  const isAuthor = user?.uid === blog.authorId;

  function handleEdit() {
    if (!isAuthor) {
      return;
    }

    navigate(`/blogs/edit/${blog.id}`);
  }

  function handleDelete() {
    if (!isAuthor) {
      return;
    }

    deleteBlog(blog.id);
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