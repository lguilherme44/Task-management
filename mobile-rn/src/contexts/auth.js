import React, { createContext, useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as auth from "../services/auth";

const AuthContext = createContext({ signed: false, user: {} });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState("");

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem("@RNAuth:user");
      const storageToken = await AsyncStorage.getItem("@RNAuth:token");

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      } else if (!storageUser && !storageToken) {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function signIn(email, password) {
    const response = await auth.signIn(email, password);

    console.log(response.data.user.id);

    setUser(response.data.user);

    await AsyncStorage.setItem(
      "@RNAuth:user",
      JSON.stringify(response.data.user)
    );
    await AsyncStorage.setItem("@RNAuth:token", response.data.token);
    await AsyncStorage.setItem(
      "@RNAuth:userId",
      JSON.stringify(response.data.user.id)
    );
  }

  async function signOut() {
    await AsyncStorage.clear();

    setUser(null);
  }

  async function getUserConnected() {
    const json = await AsyncStorage.getItem("@RNAuth:userId");
    if (json) {
      setIsConnected(json);
    }
    return JSON.parse(json);
  }

  useEffect(() => {
    getUserConnected();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user: {}, signIn, signOut, isConnected }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
