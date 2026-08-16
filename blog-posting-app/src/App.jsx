import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import BlogList from "./pages/BlogList";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";
import NotFound from "./pages/NotFound";




function App() {

 return (
    <div>
      <Navbar />

      <main>
        <Routes>

          <Route path="/login" element={<Login />} />

          <Route path="/blogs" element={<BlogList />} />

          <Route path="/blogs/add" element={<AddBlog />} />

          <Route path="/blogs/edit/:id" element={<EditBlog />} />
          
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </main>
    </div>
  );
}

export default App;