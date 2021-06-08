import React, { useEffect, useState } from "react";
import api from "../services/api";
import { createContext } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("today");

  async function addTask() {}

  async function loadTasks() {
    setLoading(true);
    await api
      .get(`/task/filter/${filter}/${parseInt(1, 10)}`)
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function removeTask(route) {
    const { data } = await api.delete(`/task/${route.params.id}`);

    if (data) {
      setLoading(false);
      loadTasks();
    }
    return data;
  }

  return (
    <AppContext.Provider
      value={{
        removeTask,
        addTask,
        loading,
        setLoading,
        tasks,
        setFilter,
        filter,
        loadTasks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
