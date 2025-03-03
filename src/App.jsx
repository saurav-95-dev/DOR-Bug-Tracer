import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import PriorityFilter from "./components/PriorityFilter";

export default function App() {
  const [todos, setTodos] = useState([{ input: 'Hello! Add your first todo!', complete: true, priority: "Low" }]);
  const [selectedTab, setSelectedTab] = useState("Open"); 
  const [selectedPriority, setSelectedPriority] = useState("All");

  function handleAddTodo(newTodo, priority) {
    const newTodoList = [...todos, { input: newTodo, complete: false, priority }];
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleCompleteTodo(index) {
    const newTodoList = [...todos];
    newTodoList[index].complete = true;
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((_, valIndex) => index !== valIndex);
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleEditTodo(index, newInput) {
    const newTodoList = [...todos];
    newTodoList[index].input = newInput;
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleSaveData(currTodos) {
    localStorage.setItem("todo-app", JSON.stringify({ todos: currTodos }));
  }

  useEffect(() => {
    const db = JSON.parse(localStorage.getItem("todo-app"));
    if (db?.todos) setTodos(db.todos);
  }, []);

  return (
    <>
      <Header todos={todos} />
      <Tabs todos={todos} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <PriorityFilter selectedPriority={selectedPriority} setSelectedPriority={setSelectedPriority} />
      <TodoList 
        handleEditTodo={handleEditTodo}
        handleCompleteTodo={handleCompleteTodo}
        handleDeleteTodo={handleDeleteTodo}
        todos={todos}
        selectedTab={selectedTab}
        selectedPriority={selectedPriority}
      />
      <TodoInput handleAddTodo={handleAddTodo} />
    </>
  );
}
