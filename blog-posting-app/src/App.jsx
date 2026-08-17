import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import Login from "./pages/Login";
import BlogList from "./pages/BlogList";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";




function App() {

 return (
    <div>
      <Navbar />

      <main>
        <Routes>

          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
            } />

          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>

            } />

          <Route path="/blogs" element={

          <ProtectedRoute>
            <BlogList />
          </ProtectedRoute>} />

          <Route
            path="/blogs/add"
            element={
              <ProtectedRoute>
                <AddBlog />
              </ProtectedRoute>
            }
          />

          <Route
            path="/blogs/edit/:id"
            element={
              <ProtectedRoute>
                <EditBlog />
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </main>
    </div>
  );
}

export default App;