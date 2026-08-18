import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";


function PublicRoute({children}){

    const {user , loading} =useContext(AuthContext);

    if (loading){
        return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="h-6 w-6 animate-spin rounded-full border border-white/10 border-t-violet-400" />
        <p className="text-xs tracking-[0.12em] text-slate-600 uppercase">Loading</p>
      </div>
        );
    }

    if (user) {
        return <Navigate to="/blogs" replace /> 
    }
    return children ;

}

export default PublicRoute;