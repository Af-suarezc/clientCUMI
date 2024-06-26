import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8080/api/auth/login", inputs, {
      withCredentials: true,
    });
    console.log("HOLA DESDE LOGIN EN CONTEXT")
    console.log(res.data)


    setCurrentUser(res.data)
    console.log(currentUser)
  };

  useEffect(() => {
    console.log("DESDE EL USEFECT");
    console.log(currentUser)
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};