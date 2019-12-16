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

  componentDidMount() {
    this.props.getTodolist();
  }

  deleteTodo = id => {
    axios
      .delete("http://localhost:5000/api/delete/" + id)
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
          getTodolist={this.props.getTodolist}
          openModal={() => this.openModal(todo)}
          closeModal={this.closeModal}
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
