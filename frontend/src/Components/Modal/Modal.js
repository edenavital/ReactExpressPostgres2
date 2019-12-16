import React, { Component } from "react";
import "./Modal.css";
import TodoSubmit from "../TodoSubmit/TodoSubmit";
import Backdrop from "../Backdrop/Backdrop";
import axios from "axios";
//Manager - TodoList container - by state
//Props: closeModal, todoItem
class Modal extends Component {
  editTodo = (event, todo) => {
    event.preventDefault();

    const editedTodo = {
      id: todo.id,
      title: this.refs.ref_title.value,
      description: this.refs.ref_description.value
    };

    console.log("EDIT TODO invoked with todo:", editedTodo);
    axios
      .put("http://localhost:5000/api/update/" + editedTodo.id, editedTodo)
      .then(res => {
        console.log(`ID OF TODO: ${todo.id} HAS BEEN EDITED!`);
        this.props.getTodolist();
        this.props.closeModal();
      })
      .catch(err => {
        this.props.closeModal();
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <Backdrop closeModal={this.props.closeModal} />

        <div className="Modal">
          <main>
            <h2>Edit mode</h2>
            <p>Click on the Submit icon to edit the todo!</p>
            <form onSubmit={event => this.editTodo(event, this.props.todo)}>
              <input
                type="text"
                ref="ref_title"
                placeholder={this.props.todo.title}
                required
              />
              <input
                type="text"
                ref="ref_description"
                placeholder={this.props.todo.description}
                required
              />
              <br />
              <TodoSubmit />
            </form>
          </main>
        </div>
      </>
    );
  }
}
export default Modal;
