import React, { Component } from "react";
import "./App.css";
import Main from "./Containers/Main/Main";
import TodoList from "./Containers/TodoList/TodoList";
import axios from "axios";
class App extends Component {
  state = {
    todolist: []
  };

  getTodolist = () => {
    axios
      .get("http://localhost:5000/api/todos")
      .then(res => {
        console.log(res.data);
        this.setState({ todolist: res.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <Main getTodolist={this.getTodolist} />
        <TodoList
          todolist={this.state.todolist}
          getTodolist={this.getTodolist}
        />
      </div>
    );
  }
}
export default App;
