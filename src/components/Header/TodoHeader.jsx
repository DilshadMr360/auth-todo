// TodoHeader.js
import React from "react";

const TodoHeader = ({ text }) => {
  return (
    <header className="py-4 text-white bg-green-500 md:mt-10">
      <div className="container mx-auto text-center">
        <h1 className="text-xl font-semibold md:text-3xl">{text}</h1>
      </div>
    </header>
  );
};

export default TodoHeader;
