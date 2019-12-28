import React, { Component } from "react";
import "./TodoList.css";
import TodoItem from "../../Components/TodoItem/TodoItem";
import axios from "axios";
import Modal from "../../Components/Modal/Modal";

//props.todolist, props.getTodolist()
class TodoList extends Component {
  state = {
    todo: "",
    isModalVisible: false
  };

  //When mounts, get the todos
  componentDidMount() {
    this.props.getTodolist();
  }

  deleteTodo = id => {
    axios
      .delete("/api/delete/" + id)
      .then(res => {
        console.log(`The id of TODO has been deleted!`);
        this.props.getTodolist();
      })
      .catch(err => console.log(err));
  };

  //Show Modal
  openModal = todo => {
    this.setState({ isModalVisible: true, todo: todo });
  };
  //Hide Modal
  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    let todosList = this.props.todolist.map(todo => (
      <li key={todo.id}>
        <TodoItem
          todo={todo}
          deleteTodo={() => this.deleteTodo(todo.id)}
          openModal={() => this.openModal(todo)}
        />
      </li>
    ));

    let modal = this.state.isModalVisible ? (
      <Modal
        closeModal={this.closeModal}
        todo={this.state.todo}
        getTodolist={this.props.getTodolist}
      />
    ) : null;

    return (
      <div className="TodoList">
        {modal}
        <ul>{todosList}</ul>
      </div>
    );
  }
}

export default TodoList;
