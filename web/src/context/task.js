import { createContext, useState } from "react";

const TaskContext = createContext();

export function TaskContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  async function addTask() {}

  async function removeTask() {}

  return (
    <TaskContext.Provider value={{ tasks, loading, setFilter }}>
      {children}
    </TaskContext.Provider>
  );
}
