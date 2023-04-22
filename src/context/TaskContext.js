"use client";
import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const createTask = (title, description) =>
    setTasks([
      ...tasks,
      {
        title,
        description,
        id: uuid(),
      },
    ]);

  const deleteTask = (id) =>
    setTasks([...tasks.filter((tasks) => tasks.id !== id)]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
