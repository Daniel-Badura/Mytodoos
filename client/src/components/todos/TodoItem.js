import React from "react";
import TodoContext from "../../context/todo/todoContext";
const TodoItem = ({ todo }) => {
  const { name, category, severity, date, duedate } = todo;
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}
        {""}
        <span
          className={
            "badge " +
            (severity === "Critical" ? "badge-success" : "badbe-primary")
          }
        >
          {" "}
          {severity.charAt(0).toUpperCase() + severity.slice(1)}
        </span>
      </h3>
      <div className="text-right">
        Due:{" "}
        {Date(date)
          .toString()
          .slice(0, 10)}
      </div>

      <p className="btn btn-primary btn-sm">Edit</p>
      <p className="btn btn-danger btn-sm">Delete</p>
    </div>
  );
};
export default TodoItem;
