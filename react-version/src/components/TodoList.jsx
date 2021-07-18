import React, { useState, useEffect } from 'react'
import Todo from './Todo'
import TodoInput from './TodoInput'

const compareTodos = (a,b) => {
    if (a.completed && b.completed)
        return 0
    if (!a.completed && b.completed)
        return 1
    if (a.completed && !b.completed)
        return -1
    return 0
}

function TodoList() {
    const [data, setData] = useState(undefined)
    const [filter, setFilter] = useState('all')
    const url = 'https://express-planner.herokuapp.com'
    let numTodos = 0

    const getData = async() => {
        const res = await fetch(url)
        const todos = await res.json()
        todos.sort(compareTodos)

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
        
        setData(data.filter(todo => todo._id !== id))
    }

    const deleteCompleted = () => {
        const completed = data.filter(todo => todo.completed)
        completed.forEach(async todo => {
            await fetch(`${url}/${todo._id}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: todo._id
                }) 
              })
        })
        
        setData(data.filter(todo => !todo.completed))
    }

    const toggleTodo = async (id, completed) => {
        await fetch(`${url}/${id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: !completed
            }) 
          })

        // In-place version might be more performant?
        // items[items.findIndex(el => el.id === item.id)] = item;

        const updatedItems = data.map(todo => {
            if (todo._id === id) {
                todo.completed = !todo.completed
            }
            return todo
        }).sort(compareTodos)
        setData(updatedItems)
    }

    const submitTodo = async (value) => {
        await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: value,
                body: 'No Body Implementation yet'
            }) 
        })
        
        getData()
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <React.Fragment>
            <TodoInput submit={submitTodo}></TodoInput>
            <main id="main-content" className="main-content">
                <ol className="todo-list">
                    {!data
                        ? (<li className="todo">
                                <p className={`todo-content loading`}>Loading </p>
                            </li>)
                        : data.map(todo => {
                            if (filter === 'all' || todo.completed === filter) {
                                numTodos++
                                return <Todo key={todo._id} _id={todo._id} completed={todo.completed} title={todo.title} toggle={toggleTodo} delete={deleteTodo}></Todo>
                            }
                            return ''
                        })
                    }
                </ol>

                <footer id="list-footer" className="flex-row list-footer">
                    <p id="items-left">{numTodos} items left</p>
                    <button id="all-button" onClick={() => setFilter('all')} className={`filter-button ${filter === 'all' ? 'active-filter' : ''}`}>All</button>
                    <button id="active-button" onClick={() => setFilter(false)} className={`filter-button ${filter === false ? 'active-filter' : ''}`}>Active</button>
                    <button id="completed-button" onClick={() => setFilter(true)} className={`filter-button ${filter === true ? 'active-filter' : ''}`}>Completed</button>
                    <button id="clear-button" onClick={() => deleteCompleted()} className="clear-button">Clear Completed</button>
                </footer>
            </main>
            <aside className="mobile-filters">
                <button id="mobile-all-button" onClick={() => setFilter('all')} className={`filter-button ${filter === 'all' ? 'active-filter' : ''}`}>All</button>
                <button id="mobile-active-button" onClick={() => setFilter(false)} className={`filter-button ${filter === false ? 'active-filter' : ''}`}>Active</button>
                <button id="mobile-completed-button" onClick={() => setFilter(true)} className={`filter-button ${filter === true ? 'active-filter' : ''}`}>Completed</button>
            </aside>
        </React.Fragment>
    )
}

export default TodoList