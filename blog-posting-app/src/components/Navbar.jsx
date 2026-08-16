import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Blog App</h2>

       <div>
        <NavLink to="/login" className={({ isActive }) =>
            isActive ? "active-link" : ""
          }>Login</NavLink>

        {" | "}

        <NavLink to="/blogs"  className={({ isActive }) =>
            isActive ? "active-link" : ""
          }>Blogs</NavLink>

        {" | "}

        <NavLink to="/blogs/add" className={({ isActive }) =>
            isActive ? "active-link" : ""
          }>Add Blog</NavLink>

     </div>
    </nav>
  );
}

export default Navbar;


