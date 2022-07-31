import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoContext from "./todoContext";
import todoReducer from "./todoReducer";
import {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_TODOS,
  CLEAR_FILTERS,
  SET_ALERT,
} from "../types";
const TodoState = (props) => {
  const initialState = {
    todos: [
      {
        user: "danbad@gmail.com",
        id: uuidv4(),
        name: "fixbike",
        duedate: new Date(),
        description: "Fix bike",
        category: "General",
        severity: "Critical",
        date: new Date(),
      },
      {
        user: "jon.doe",
        id: uuidv4(),
        name: "make pike",
        duedate: new Date(),
        description: "pike make now",
        category: "Arms",
        severity: "Casual",
        date: new Date(),
      },
    ],
  };
  const [state, dispatch] = useReducer(todoReducer, initialState);

  //   Add Todo
  const addTodo = (todo) => {
    todo.id = uuidv4();
    dispatch({ type: ADD_TODO, payload: todo });
  };
  // Delete Todo

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
export default TodoState;
