import React from 'react'

function Todo(props) {
    return (
        <li className="todo">
            <svg id={`complete-${props._id}`} className={`check-mark check-${props.completed}`} xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#000" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg>
            <p className={`todo-content status-${props.completed}`}>{props.title} </p>
            <p id={`status-${props._id}`}>{props.completed}</p>
            <svg id={`delete-${props._id}`} onClick={() => props.delete(props._id)} className="cross" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
        </li>
    )
}

export default Todo