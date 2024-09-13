import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TodoProvider } from "./context/TodoContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TodoPage from "./pages/TodoPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "../src/components/protectedRoutes/protectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <TodoProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/todos"
              element={<ProtectedRoute element={<TodoPage />} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <ToastContainer />
        </TodoProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
