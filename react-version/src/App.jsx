import React from 'react'
import './App.css'
import TodoList from './components/TodoList'
import TodoHeader from './components/TodoHeader'
import hero from './images/bg-desktop-light.jpg'


function App() {
  return (
    <React.Fragment>
      <img className="hero" id="hero" src={hero} alt="Hero"></img>
      <section id="content" className="container">
        <TodoHeader></TodoHeader>
        <TodoList></TodoList>
      </section>
    </React.Fragment>
  )
}

export default App
