import { createContext, useEffect, useState } from "react";
import {  
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,

 } from "firebase/auth";

import auth from "../services/authService";

const AuthContext = createContext();

function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function register(email,password){

    const userCredential =await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
    await signOut(auth);
    return userCredential.user;
  }

    async function login (email,password){
        const userCredential =await signInWithEmailAndPassword(auth,email,password);
        return  userCredential.user
    }
    
    async function logout() {
        await signOut(auth)
        
    }

  return (

    <AuthContext.Provider value={{ user , loading , register , login , logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export { AuthProvider };
export default AuthContext;