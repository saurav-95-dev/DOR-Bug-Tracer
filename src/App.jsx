import { useState , useEffect } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";


export default function App() {

  //useState and useEffect hook : 

  //Array of objects will be passed as a props:s
  // const todos = [
  //   { input: 'Hello! Add your first todo!', complete: true },
  //   { input: 'Get the groceries!', complete: false },
  //   { input: 'Learn how to web design', complete: false },
  //   { input: 'Say hi to gran gran', complete: true },
  // ]
  
  //Defining a stateful variable:
  const [todos , setTodos] = useState([ { input: 'Hello! Add your first todo!', complete: true }]);
  const [selectedTab , setSelectedTab] = useState("Open"); //Send these stateful variables to the Tabs component as props.

  //Handler functions :
  function handleAddTodo(newTodo){
   
    const newTodoList = [...todos , { input: newTodo , complete: false }];
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleCompleteTodo(index){
          //Create a duplicate of the original todos array : 
          const newTodoList = [...todos];
          //Extract the particular todo which has to be updated:
          const completedTodo  = todos[index];
          //Now modify the status of that particular eextracted todo:
          completedTodo['complete'] = true;
          //Appending the completedTodo in the newTodoList index array:
          newTodoList[index] = completedTodo;
          //Now overwriting the values via setTodo:
          setTodos(newTodoList);
          handleSaveData(newTodoList);


  }

  function handleDeleteTodo(index){
    let newTodoList = todos.filter((val , valIndex)=>{
        return index !==valIndex;
       

    })
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }
  

  function handleEditTodo(index, newInput) {
    const newTodoList = [...todos];
    newTodoList[index].input = newInput;
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleSaveData(currTodos){
    localStorage.setItem("todo-app" , JSON.stringify({todos : currTodos}))

  }

  useEffect(()=>{
    if(!localStorage || !localStorage.getItem("todo-app"))
      return;
    console.log("Use Effect is running");
    //This will get the persisted data last updated when the page will render(open the app!)
    let db = JSON.parse(localStorage.getItem("todo-app"));
    setTodos(db.todos);

      
  } , [])

  return (
    <>
      <Header todos={ todos} />
      <Tabs todos={ todos} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      <TodoList  handleEditTodo={handleEditTodo} handleCompleteTodo={handleCompleteTodo}  handleDeleteTodo={handleDeleteTodo} todos={ todos} selectedTab={selectedTab}/> 
      <TodoInput handleAddTodo = {handleAddTodo} />
    </>
  )
}