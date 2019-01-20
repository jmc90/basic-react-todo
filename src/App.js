import React, { Component } from 'react';
import Todo from './Todo'
import axios from 'axios'
import TodoForm from './TodoForm';

class App extends Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      title: ''
    }
  }

  componentDidMount() {
    axios.get(`https://api.vschool.io/Jon/todo`)
         .then(response => {
           console.log(response)
            this.setState({
                todos: response.data
            })
         })
         .catch(err => console.log(err))
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const newTodo = {
      title: this.state.title
    }
    axios.post(`https://api.vschool.io/Jon/todo`, newTodo)
        .then(response => {
          this.setState(prevState => {
            return {
              todos: [...prevState.todos, response.data],
              title: ''
            }
          })
        })
  }

  handleDelete = (id) => {
    axios.delete(`https://api.vschool.io/Jon/todo/${id}`)
        .then(response => {
          alert(response.data.msg)
          this.setState(prevState => {
            return {
              todos: prevState.todos.filter(todo => todo._id !== id)
            }
          })
        })
  }

  handleEdit = (id, updates) => {
    axios.put(`https://api.vschool.io/Jon/todo/${id}`, updates)
        .then (response => {
          console.log(response.data)
          this.setState(prevState => {
            return {
              todos: prevState.todos.map(todo => todo._id === id ? response.data : todo)
            }
          })
        })
  }

  render() {

    const mappedTodos = this.state.todos.map(todo => 
                        <Todo 
                          title={todo.title}
                          id={todo._id} 
                          key={todo._id}
                          handleDelete={this.handleDelete}
                          handleEdit={this.handleEdit} />)
    return (
      <div >
        <TodoForm 
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          title={this.state.title} />
        {mappedTodos}
      </div>
    )
  }
}

export default App;
