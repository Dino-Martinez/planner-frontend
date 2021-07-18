import React, { useState } from 'react'

function TodoInput(props) {
    const [value, setValue] = useState('')

    return (
        <article id="create-todo" className="todo">
            <svg onClick={()=>{ props.submit(value); setValue('') }}id="submit-create" className="check-mark submit-create" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#fff" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg>
            <input value={value} onChange={(e) => {setValue(e.target.value)}} onKeyDown={(e) => { if (e.key === 'Enter') {props.submit(value); setValue('')} }} id="todo-input" className="todo-content" type="text" name="create-todo" placeholder="Create new todo..." />
        </article>
    )
}

export default TodoInput