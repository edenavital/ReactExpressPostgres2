import React from "react";
import "./TodoItem.css";

//props: todo, deleteTodo(id), openModal(todo)

const TodoItem = ({ todo, deleteTodo, openModal }) => {
  return (
    <div className="TodoItem">
      {todo.title} - {todo.description}
      <i className="fas fa-2x fa-trash-alt" onClick={deleteTodo}></i>
      <i className="fas fa-2x fa-edit edit" onClick={openModal}></i>
    </div>
  );
};
export default TodoItem;
