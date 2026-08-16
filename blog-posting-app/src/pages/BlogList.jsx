import BlogCard from "../components/BlogCard";
import { useContext } from "react";
import BlogContext from "../context/BlogContext";

function BlogList() {
    const {blogs}=useContext(BlogContext)
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog}  />
      ))}
    </div>
  );
}

export default BlogList;