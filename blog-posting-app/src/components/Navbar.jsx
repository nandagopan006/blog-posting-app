import { useContext } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

/* the underline is always in the DOM - it scales in, so it slides
   rather than pops when the active route changes */
const LINK_BASE =
  "relative rounded-md px-2 py-2 text-xs font-medium text-slate-400 transition-colors duration-300 ease-brand hover:text-white xs:px-2.5 sm:px-3 sm:text-sm after:absolute after:bottom-0.5 after:left-1/2 after:h-px after:w-5 after:-translate-x-1/2 after:scale-x-0 after:bg-violet-400 after:transition-transform after:duration-300 after:ease-brand after:content-['']";

const LINK_ACTIVE = "text-white after:scale-x-100";

function Navbar() {
  const { user, loading, logout } = useContext(AuthContext);

  const navigate=useNavigate()


  function activeClass({ isActive }) {
    return isActive ? `${LINK_BASE} ${LINK_ACTIVE}` : LINK_BASE;
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
    <nav className="fixed top-4 left-1/2 z-50 flex h-13 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 animate-slide-down items-center justify-between gap-2 rounded-full border border-white/[0.07] bg-ink/80 px-3 backdrop-blur-lg xs:gap-3 xs:px-4 sm:w-[calc(100%-3rem)] sm:px-5 lg:w-[calc(100%-4rem)]">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="h-1.5 w-1.5 shrink-0 animate-pulse-dot rounded-full bg-violet-400" />
        <h2 className="truncate text-sm font-semibold tracking-tight text-white">
          Blog App
        </h2>
      </div>

      <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
        {loading ? null : user ? (
          <>
            <NavLink to="/blogs" className={activeClass}>
              Blogs
            </NavLink>

            <NavLink to="/blogs/add" className={activeClass}>
              Write
            </NavLink>

            <button
              onClick={handleLogout}
              className="ml-0.5 rounded-full px-2 py-2 text-xs font-medium text-slate-500 xs:ml-1 xs:px-2.5 transition-colors duration-300 ease-brand hover:text-rose-300 focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:outline-none sm:px-3 sm:text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={activeClass}>
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="ml-0.5 rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-900 xs:ml-1 xs:px-3.5 transition-all duration-300 ease-brand hover:bg-violet-300 focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:outline-none active:scale-95 sm:text-sm"
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
