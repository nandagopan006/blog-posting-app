import { createContext, useState } from "react";
import blogData from "../utils/blogData";

const BlogContext =createContext()

function BlogProvider({children}){
    
  const [blogs, setBlogs] = useState(blogData);

  function addBlog(newBlog){
    setBlogs((currentBlogs)=> [...currentBlogs,newBlog]);
  }
  function updateBlog(updatedBlog){

    setBlogs((currentBlogs)=>
    currentBlogs.map((blog)=> blog.id === updatedBlog.id ? updatedBlog : blog
))
  }

  function deleteBlog(id){
    setBlogs((currentBlogs)=> currentBlogs.filter((blog)=> blog.id !== id))
  }

    return (

       <BlogContext.Provider value={{ blogs, addBlog, updateBlog, deleteBlog }} >

            {children}
        </BlogContext.Provider>
    )
}

export {BlogProvider};
export default BlogContext;
