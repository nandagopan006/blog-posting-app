import BlogCard from "../components/BlogCard";


function BlogList({blogs}) {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default BlogList;