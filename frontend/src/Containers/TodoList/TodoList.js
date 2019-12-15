import React, { Component } from "react";
import "./TodoList.css";
import TodoItem from "../../Components/TodoItem/TodoItem";

//SHOULD GET PROPS.TODOS
class TodoList extends Component {
  componentDidMount() {
    this.props.getTodolist();
  }

  render() {
    let todosList = this.props.todolist.map(todo => (
      <li key={todo.id}>
        <TodoItem title={todo.title} description={todo.description} />
      </li>
    ));

    return (
      <div className="TodoList">
        <ul>{todosList}</ul>
      </div>
    );
  }
}

export default TodoList;
