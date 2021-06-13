import React, { useState } from "react";
import api from "../services/api";
import { createContext } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(false);

  async function sigIn(email, password) {
    setLoading(true);
    const { data, problem } = await api.post("sessions", { email, password });

    if (problem && !data) {
      setLoading(false);
      return toast.error("Falha ao conectar-se com a API.");
    }

    if (data.error) {
      setLoading(false);
      return toast.error(data.error);
    }

    localStorage.setItem("userName", data.user.name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userToken", data.token);
    localStorage.setItem("userId", data.user.id);

    setIsLogged(true);
    setLoading(false);
  }

  async function logOff() {
    // localStorage.clear();
    return setIsLogged(false);
  }

  return (
    <AuthContext.Provider
      value={{ sigIn, isLogged, setIsLogged, logOff, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
