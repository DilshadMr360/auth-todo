import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-700">
          404 - Page Not Found
        </h1>
        <p className="mt-4 text-gray-600">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block px-4 py-2 mt-6 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
