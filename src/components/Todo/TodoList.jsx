import React, { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos, editingTodo } = useContext(TodoContext);

  return (
    <div className={`px-4 py-8 mx-4 mt-5 ${todos.length > 0 ? 'bg-green-500 rounded-lg md:rounded-xl lg:rounded-2xl' : ''}`}>
      
      {/* Conditionally show the title if there is at least one todo */}
      {todos.length > 0 && (
        <h2 className="mb-4 text-2xl font-bold text-center text-white">Todo List</h2>
      )}

      {/* Grid layout */}
      <div className="grid grid-cols-1 gap-4">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div key={todo.id} className="w-full">
              {editingTodo && editingTodo.id === todo.id ? (
                <EditTodo />
              ) : (
                <TodoItem todo={todo} />
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-white">No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
