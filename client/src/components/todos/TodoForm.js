import React, { useState, useContext } from "react";
import TodoContext from "../../context/todo/todoContext";

const TodoForm = () => {
  const todoContext = useContext(TodoContext);

  const [todo, setTodo] = useState({
    name: "",
    severity: "",
    category: "",
  });

  const { name, severity, category } = todo;
  const onChange = (e) => setTodo({ ...todo, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    todoContext.addTodo(todo);
    setTodo({
      name: "",
      severity: "",
      category: "",
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">Add Todo</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Severity"
        name="severity"
        value={severity}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="category"
        name="category"
        value={category}
        onChange={onChange}
      />
      <input
        placeholder="Due Date"
        type="date"
        name="duedate"
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value="Add Todo"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default TodoForm;
