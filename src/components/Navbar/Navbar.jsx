import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "No, stay",
      width: "400px",
      padding: "2rem",
      customClass: {
        popup: "smaller-alert",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
        MySwal.fire("Logged out!", "You have been logged out.", "success");
      }
    });
  };

  return (
    <div className="flex items-center justify-between w-full p-4 text-white bg-green-500">
      <div className="text-lg font-bold">Welcome to Todo App!</div>
      {user ? (
        <div className="flex items-center space-x-4">
          <span>Hi, {user.name}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
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
