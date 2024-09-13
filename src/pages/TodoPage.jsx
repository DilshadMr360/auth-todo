import React from 'react';
import AddTodo from '../components/Todo/AddTodo';
import TodoList from '../components/Todo/TodoList';

const TodoPage = () => {
  return (
    <div className="p-4">
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default TodoPage;
