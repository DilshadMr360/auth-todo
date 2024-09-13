import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/register"); // Redirect to login page after logout
  };

  return (
    <div className="flex items-center justify-between w-full p-4 text-white bg-green-500">
      <div className="text-lg font-bold">Welcome to Todo App!</div>
      {user ? (
        <div className="flex items-center space-x-4">
          <span>Hi, {user.name}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-green-700 rounded hover:bg-green-800"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <a href="/login" className="px-4 py-2 hover:underline">
            Login
          </a>
          <a href="/register" className="px-4 py-2 hover:underline">
            Register
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
