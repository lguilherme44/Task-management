import React from "react";

import { createContext } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  async function addTask() {}

  async function removeTask() {}

  return <AppContext.Provider value={() => {}}>{children}</AppContext.Provider>;
};
