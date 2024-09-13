import React, { useContext, useState, useEffect, createContext } from "react";
import { AuthContext } from "./AuthContext";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const storedTodos =
        JSON.parse(localStorage.getItem(`todos_${user.id}`)) || [];
      setTodos(storedTodos);
    } else {
      setTodos([]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (!loading && user) {
      localStorage.setItem(`todos_${user.id}`, JSON.stringify(todos));
    }
  }, [todos, loading, user]);

  const addTodo = (todo) => {
    const newTodos = [...todos, { ...todo, id: Date.now(), completed: false }];
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
