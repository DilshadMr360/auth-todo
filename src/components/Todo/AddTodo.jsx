import React, { useState, useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import Navbar from "../Navbar/Navbar";

const AddTodo = () => {
  const { addTodo } = useContext(TodoContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ title: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({ title: "", description: "" });

    // Validation
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    let hasError = false;

    if (trimmedTitle === "") {
      setErrors((prev) => ({ ...prev, title: "Please add a title." }));
      hasError = true;
    }

    if (trimmedDescription === "") {
      setErrors((prev) => ({
        ...prev,
        description: "Please add a description.",
      }));
      hasError = true;
    }

    if (hasError) return; // Stop form submission if there are errors

    addTodo({ title: trimmedTitle, description: trimmedDescription });
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center w-full mt-5">
        <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
                  errors.title ? "border-red-500" : "focus:border-green-500"
                }`}
                placeholder="Enter title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
                  errors.description
                    ? "border-red-500"
                    : "focus:border-green-500"
                }`}
                placeholder="Enter description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white transition-colors duration-300 bg-green-500 rounded hover:bg-green-600"
            >
              Add Todo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
