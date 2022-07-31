import React, { Fragment, useContext } from "react";
import TodoContext from "../../context/todo/todoContext";
import TodoItem from "./TodoItem";
const Todos = () => {
  const todoContext = useContext(TodoContext);
  const { todos } = todoContext;

  return (
    <Fragment>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </Fragment>
  );
};
export default Todos;
