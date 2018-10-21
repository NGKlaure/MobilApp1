import React from "react";
import ReactDOM from "react-dom";

//import "./styles.css";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

//create a Student props
const Student = props => (
  <li key={props.student.id}>
    <input
      type="checkbox"
      checked={props.student.checked}
      onChange={props.onToggle}
    />{" "}
    <button onClick={props.onDelete}>delete</button>{" "}
    <span>{props.student.name}</span>
  </li>
);
//1. create a class with a constructor
//to define your object
let id = 0; // as reference to each student
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
  }
  addStudent() {
    const text = prompt("Enter a student:");
    if (this.state.students.filter(std => std.name === text).length !== 0) {
      alert("Name exists! Try a different name.");
      return;
    }
    this.setState({
      students: [
        ...this.state.students,
        { name: text, id: id++, checked: false }
      ]
    });
  }

  deleteStudent(id) {
    this.setState({
      students: this.state.students.filter(std => std.id !== id)
    });
  }

  toggleStudent(id) {
    this.setState({
      students: this.state.students.map(std => {
        if (std.id !== id) return std;
        return {
          id: std.id,
          name: std.name,
          checked: !std.checked
        };
      })
    });
  }

  render() {
    return (
      <div style={styles} className="App">
        <h1>Hello CodeSandbox</h1>
        <h1>student count: {this.state.students.length}</h1>
        <h1>
          noShow count:
          {this.state.students.reduce((total, std) => {
            if (std.checked === false) return ++total;
            else return total;
          }, 0)}
          {this.state.students.filter(std => !std.checked).length}
        </h1>
        <button onClick={() => this.addStudent()}> add Student </button>
        <ul>
          {this.state.students.map(std => (
            <Student
              student={std}
              onDelete={() => this.deleteStudent(std.id)}
              onToggle={() => this.toggleStudent(std.id)}
            />
          ))}
        </ul>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
