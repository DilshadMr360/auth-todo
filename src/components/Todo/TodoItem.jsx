import React, { useState, useContext } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { TodoContext } from "../../context/TodoContext";

const TodoItem = ({ todo }) => {
  const { toggleComplete, deleteTodo, saveTodo } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [errors, setErrors] = useState({ title: "", description: "" });

  const handleComplete = () => {
    toggleComplete(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmedTitle = editedTitle.trim();
    const trimmedDescription = editedDescription.trim();

    // Reset errors
    setErrors({ title: "", description: "" });

    if (trimmedTitle === "" || trimmedDescription === "") {
      if (trimmedTitle === "") {
        setErrors((prev) => ({ ...prev, title: "Title is required" }));
      }
      if (trimmedDescription === "") {
        setErrors((prev) => ({
          ...prev,
          description: "Description is required",
        }));
      }
      return; // Stop if there are validation errors
    }

    saveTodo({
      ...todo,
      title: trimmedTitle,
      description: trimmedDescription,
    });
    setIsEditing(false);
  };

  return (
    <div
      className={`p-4 bg-white rounded shadow-md mx-2 my-2 ${
        todo.completed ? "bg-green-200" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full">
          {/* Hiding the checkbox when editing */}
          {!isEditing && (
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleComplete}
              className="w-5 h-5 mr-4"
            />
          )}

          {/* Title and Description */}
          <div className="flex flex-col w-full gap-2">
            {isEditing ? (
              <>
                {/* Editable fields */}
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className={`px-3 py-2 border rounded ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Edit title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className={`px-3 py-2 border rounded ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Edit description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </>
            ) : (
              <>
                {/* Display static title and description */}
                <h3
                  className={`text-lg ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.title}
                </h3>
                <p
                  className={`text-sm ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.description}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center ml-4 space-x-4">
          {!isEditing ? (
            <>
              <button
                onClick={handleComplete}
                className={`px-2 py-1 text-sm text-white rounded ${
                  todo.completed
                    ? "bg-gray-500 hover:bg-gray-700"
                    : "bg-green-500 hover:bg-green-700"
                }`}
              >
                {todo.completed ? "Undo" : "Completed"}
              </button>
              <button
                onClick={handleEdit}
                className="text-green-500 hover:text-green-700"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </>
          ) : (
            <button
              onClick={handleSave}
              className="px-2 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-700"
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
