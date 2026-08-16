import BlogCard from "../components/BlogCard";
import blogData from "../utils/blogData";

function BlogList() {
  return (
    <div>
      <h2>Blogs</h2>
      {blogData.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default BlogList;