import React, { Component, Fragment } from 'react'

class Todo extends Component {
  constructor() {
    super()
    this.state = {
      isEditing: false,
      title: ''
    }
  }

  editToggler = () => {
    this.setState(prevState => {
      return {
        isEditing: !prevState.isEditing
      }
    })
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const updates = {
      title: this.state.title
    }
    this.props.handleEdit(this.props.id, updates)
    this.setState({
      title: ''
    })
    this.editToggler()
  }

  render() {
    return (
      <Fragment>
        {this.state.isEditing ?
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.title}
                name="title"
                onChange={this.handleChange}
                placeholder={this.props.title} />
                <button>Submit Edit</button>
            </form>
            <button onClick={this.editToggler}>Close</button>
          </div>
          :
          <div>
            <h1>{this.props.title}</h1>
            <button onClick={() => this.props.handleDelete(this.props.id)}>Delete</button>
            <button onClick={this.editToggler}>Edit</button>
          </div>
        }
      </Fragment>
    )
  }
}

export default Todo
