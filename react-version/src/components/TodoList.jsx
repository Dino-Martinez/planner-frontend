import React, { useState, useEffect } from 'react'
import Todo from './Todo'

function TodoList(props) {
    const [data, setData] = useState(undefined)
    const url = 'https://express-planner.herokuapp.com'

    const getData = async() => {
        const res = await fetch(url)
        const todos = await res.json()
        todos.sort((a,b) => {
            if (a.completed && b.completed)
                return 0
            if (!a.completed && b.completed)
                return 1
            if (a.completed && !b.completed)
                return -1
            return 0
        })
        setData(todos)
    }

    const deleteTodo = async (id) => {
        await fetch(`${url}/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            }) 
          })
    }

    const toggleTodo = (id) => {

    }

    const createTodo = (id) => {
    
    }

    useEffect(() => {
        console.log('hi')
        getData()
    }, [])

    return (
        <ol className="todo-list">
            {!data
                ? <p>Loading...</p>
                : data.map(todo => {
                    return <Todo key={todo._id} _id={todo._id} completed={todo.completed} title={todo.title} delete={deleteTodo}></Todo>
                })
            }
        </ol>
    )
}

export default TodoList