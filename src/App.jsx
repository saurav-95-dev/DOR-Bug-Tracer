import Header from './components/Header'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import Tabs from './components/Tabs'
import { useState } from 'react'

function App() {
  //This is an array of objects:
  // const todos = [
  // { input: 'Hello! Add your first todo!', complete: true },
  // { input: 'Get the groceries!', complete: false },
  // { input: 'Learn how to web design', complete: false },
  // { input: 'Say hi to gran gran', complete: true },
  // ]
  const [todos, setTodos] = useState([{ input: 'Hello! Add your first todo!', complete: true },]);
  
  return (
    
    <>
      <Header todos={ todos} />
      <Tabs todos={ todos}/>
      <TodoList todos={ todos}/>
      <TodoInput />
    </>
      
  )
}

export default App
