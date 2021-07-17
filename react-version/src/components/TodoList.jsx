import React from 'react'
import Todo from './Todo'

function TodoList(props) {
    return (
        <ol className="todo-list">
            {props.data.map(todo => {
                return <Todo _id={todo._id} completed={todo.completed} title={todo.title}></Todo>
            })}
        </ol>
    )
}

export default TodoList