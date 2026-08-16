import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import BlogList from "./pages/BlogList";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";
import NotFound from "./pages/NotFound";
import blogData from "./utils/blogData";
import { useState } from "react";



function App() {

const [blogs,setBlogs]=useState(blogData)

function addBlog(newBlog){

  setBlogs((prevBlogs) => [...prevBlogs,newBlog]);
}
function updateBlog(updatedBlog){

  setBlogs((prevBlog)=> 
  
    prevBlog.map((blog)=>{

      if (String(blog.id) === String(updatedBlog.id)){
        return updatedBlog
      }
      return blog
    })
  )
}

  return (
    <div>
      <Navbar />

      <main>

        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/blogs" element={<BlogList blogs ={blogs} />}/>
          <Route path="/blogs/add" element={<AddBlog addBlog={addBlog} />} />
          <Route path="/blogs/edit/:id" element={<EditBlog blogs={blogs} updateBlog={updateBlog} />} />
          <Route path="*" element={<NotFound />} />

        </Routes>


      </main>
    </div>
  );
}

export default App;