import React, { Component } from "react";
import "./Main.css";
import TodoSubmit from "../../Components/TodoSubmit/TodoSubmit";
import axios from "axios";
class Main extends Component {
  AddTodo = event => {
    event.preventDefault();
    console.log("AddTodo invoked");

    const newTodo = {
      title: this.refs.ref_title.value,
      description: this.refs.ref_description.value
    };

    axios
      .post("http://localhost:5000/api/postTodo", newTodo)
      .then(res => {
        console.log("Inserted data successfully");
        this.props.getTodolist();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="Main">
        <h1>Welcome to my TODO LIST</h1>
        <p>React Express Postgres Fullstack application</p>

        <form onSubmit={this.AddTodo}>
          <input
            type="text"
            ref="ref_title"
            placeholder="Enter Title*"
            required
          />
          <input
            type="text"
            ref="ref_description"
            placeholder="Enter Description*"
            required
          />

          <br />
          <TodoSubmit />
        </form>
      </div>
    );
  }
}

export default Main;
