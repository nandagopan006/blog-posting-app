import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navbar() {
  const { user, loading, logout } = useContext(AuthContext);

  function activeClass({ isActive }) {
    return isActive ? "active-link" : "";
  }

  return (
    <nav>
      <h2>Blog App</h2>

      <div>
        {loading ? null : user ? (
          <>
            <NavLink to="/blogs" className={activeClass}>
              Blogs
            </NavLink>

            {" | "}

            <NavLink to="/blogs/add" className={activeClass}>
              Add Blog
            </NavLink>

            {" | "}

            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={activeClass}>
              Login
            </NavLink>

            {" | "}

            <NavLink to="/register" className={activeClass}>
              Register
            </NavLink>

            
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
