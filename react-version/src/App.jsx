import React from 'react'
import './App.css'
import TodoList from './components/TodoList'
import TodoHeader from './components/TodoHeader'
import hero from './images/bg-desktop-light.jpg'


function App() {
  const data = [
    {_id: '1', completed:false, title: 'sample 1'},
    {_id: '2', completed:false, title: 'sample 2'},
    {_id: '3', completed:false, title: 'sample 3'},
    {_id: '4', completed:false, title: 'sample 4'},
  ]
  return (
    <React.Fragment>
      <img className="hero" id="hero" src={hero} alt="Hero"></img>
      <section id="content" className="container">
        <TodoHeader></TodoHeader>
        <TodoList data={data}></TodoList>
      </section>
    </React.Fragment>
  )
}

export default App
