

function BlogCard({ blog }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "15px", borderRadius: "6px" }}>
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
      
      <div style={{ display: "flex", gap: "10px" }}>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default BlogCard;
