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

export default (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    default:
      return state;
  }
};
