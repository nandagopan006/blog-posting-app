import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import BlogContext from "../context/BlogContext";
import AuthContext from "../context/AuthContext";

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
      <div style={{ padding: "20px" }}>
        <h2>Blog not found</h2>

        <button onClick={() => navigate("/blogs")}>
          Back to Blogs
        </button>
      </div>
    );
  }

  const isAuthor = user?.uid === existingBlog.authorId;

  if (!isAuthor) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>You cannot edit this blog.</h2>

        <button onClick={() => navigate("/blogs")}>
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
    <div>
      <h2>Edit Blog</h2>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

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

        <button
          type="submit"
        
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;