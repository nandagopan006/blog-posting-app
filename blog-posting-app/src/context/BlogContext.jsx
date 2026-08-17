import { createContext, useState } from "react";
import { addBlog as addBlogToFirestore } from "../services/firestoreService";


const BlogContext =createContext()

function BlogProvider({children}){
    
  const [blogs, setBlogs] = useState([]);

  async function addBlog(title,content){

    const blogRef= await addBlogToFirestore(title,content);

    const newBlog ={
        id : blogRef.id,
        title,
        content,
    };

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
