import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { type TaskItemProps } from "../libs/Task";

export const useTaskStore = create<TaskItemProps>((set) => {
  return {
    tasks: [],
    setTasks: (tasks) => set({ tasks }),
    addTask: (title, description, dueDate, assignees) =>
      set((state) => {
        const newTask = {
          id: uuidv4(),
          title,
          description,
          dueDate,
          isDone: false,
          doneAt: null,
          assignees: assignees,
        };
        const newTasks = [newTask, ...state.tasks];
        localStorage.setItem("taskStorage", JSON.stringify(newTasks));

        return {
          tasks: newTasks,
        };
      }),
    toggleTask: (id) =>
      set((state) => {
        const newTasks = state.tasks.map((task) =>
          task.id === id
            ? {
                ...task,
                isDone: !task.isDone,
                doneAt: task.isDone ? null : new Date().toLocaleDateString(),
              }
            : task
        );

        localStorage.setItem("taskStorage", JSON.stringify(newTasks));

        return {
          tasks: newTasks,
        };
      }),
    removeTask: (id) =>
      set((state) => {
        const newTasks = state.tasks.filter((task) => task.id !== id);
        localStorage.setItem("taskStorage", JSON.stringify(newTasks));
        return { tasks: newTasks };
      }),
  };
});