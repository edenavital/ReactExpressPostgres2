import React from "react";
import "./TodoItem.css";

const TodoItem = props => (
  <div className="TodoItem">
    <div>
      <p>
        Title: {props.title}, Description: {props.description}
      </p>
    </div>
  </div>
);

export default TodoItem;
