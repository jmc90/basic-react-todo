import React from 'react'

const TodoForm = ({handleChange, handleSubmit, title}) => {
  return (
    <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            name="title" 
            value={title} 
            onChange={handleChange} 
            placeholder="Title" />
        <button>Add Todo</button>
    </form>
  )
}

export default TodoForm

