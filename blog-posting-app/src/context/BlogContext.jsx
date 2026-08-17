import { createContext,useContext, useState ,useEffect } from "react";
import { addBlog as addBlogToFirestore,
        getBlogs,
        updateBlog as updateBlogToFirestore,
        deleteBlog as deleteBlogFromFirestore,

} from "../services/firestoreService";
import AuthContext from "./AuthContext";

const BlogContext =createContext()



function BlogProvider({children}){

    const { user } = useContext(AuthContext);
    
  const [blogs, setBlogs] = useState([]);

  useEffect(()=>{

    if (!user){
        return;
    }
    async function loadBlogs(){

    try {
        
        const blogFromFirestore =await getBlogs()
        setBlogs(blogFromFirestore);
    
    } catch(error){
        console.log(error);
    }
}
loadBlogs();

  },[user]);

  async function addBlog(title,content){

    const blogRef= await addBlogToFirestore(title,content,user.uid);

    const newBlog ={
        id : blogRef.id,
        title,
        content,
        authorId : user.uid,
    };

    setBlogs((currentBlogs)=> [...currentBlogs,newBlog]);
  }


   async function updateBlog(updatedBlog){

    await updateBlogToFirestore(
        updatedBlog.id,
        updatedBlog.title,
        updatedBlog.content
    );

    setBlogs((currentBlogs)=>
    currentBlogs.map((blog)=> blog.id === updatedBlog.id ? {
          ...blog,
          title: updatedBlog.title,
          content: updatedBlog.content,
        }
      : blog
))
  }

   async function deleteBlog(id){
    await deleteBlogFromFirestore(id);
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
