import { useContext } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navbar() {
  const { user, loading, logout } = useContext(AuthContext);

  const navigate=useNavigate()


  function activeClass({ isActive }) {
    return isActive ? "active-link" : "";
  }
  async function handleLogout(){
    try {
        await logout()
        navigate("/login")
    } catch (error) {
        console.log(error);

    }
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

            <button onClick={handleLogout}>Logout</button>
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
