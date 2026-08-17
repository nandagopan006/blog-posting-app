import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";


function PublicRoute({children}){

    const {user , loading} =useContext(AuthContext);

    if (loading){
        return <p>loading...</p>
    }

    if (user) {
        return <Navigate to="/blogs" /> 
    }
    return children ;

}

export default PublicRoute;