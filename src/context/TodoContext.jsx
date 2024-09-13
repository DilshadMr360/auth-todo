import React, { createContext, useState, useEffect } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    console.log("Loaded todos from local storage:", storedTodos);
    setTodos(storedTodos);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log("Saving todos to local storage:", todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, loading]);

  const addTodo = (todo) => {
    const newTodos = [...todos, { ...todo, id: Date.now(), completed: false }];
    console.log("Adding todo:", newTodos);
    setTodos(newTodos);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditingTodo(todoToEdit);
  };

  const saveTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setEditingTodo(null);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleComplete,
        deleteTodo,
        editTodo,
        saveTodo,
        editingTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
