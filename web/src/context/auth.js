import React, { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  async function sigIn(email, password) {
    const { data, problem } = await api.post("sessions", { email, password });

    if (problem && !data) {
      return toast.error("Failed to connect with API.");
    }

    if (data.error) {
      return toast.error(data.error);
    }

    localStorage.setItem("userName", data.user.name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userToken", data.token);
    localStorage.setItem("userId", data.user.id);

    setIsLogged(true);
  }

  async function logOff() {
    localStorage.clear();
    return setIsLogged(false);
  }

  return (
    <AuthContext.Provider value={{ sigIn, isLogged, setIsLogged, logOff }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
