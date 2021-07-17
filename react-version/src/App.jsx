import './App.css'
import TodoList from './components/TodoList'

function App() {
  const data = [
    {_id: '1', completed:false, title: 'sample 1'},
    {_id: '2', completed:false, title: 'sample 2'},
    {_id: '3', completed:false, title: 'sample 3'},
    {_id: '4', completed:false, title: 'sample 4'},
  ]
  return (
    <div>
      <TodoList data={data}></TodoList>
    </div>
  )
}

export default App
