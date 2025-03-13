// App.jsx
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Auth from "./components/Auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

export default function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([{ input: "Hello! Add your first todo!", complete: true }]);
  const [selectedTab, setSelectedTab] = useState("Open");

  useEffect(() => {
    localStorage.removeItem("user"); // Ensure login page appears on revisit
  }, []);

  function handleAddTodo(newTodo) {
    const newTodoList = [...todos, { input: newTodo, complete: false }];
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
    if (!localStorage.getItem("todo-app")) return;
    let db = JSON.parse(localStorage.getItem("todo-app"));
    setTodos(db.todos);
  }, []);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(null); // Ensure login is required on revisiting
      }
    });
    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  }
  return (
    <>
      {!user ? (
        <Auth setUser={setUser} />
      ) : (
        <>
          <Header todos={todos} />
          <Tabs todos={todos} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <TodoList handleEditTodo={handleEditTodo} handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo} todos={todos} selectedTab={selectedTab} />
          <TodoInput handleAddTodo={handleAddTodo} />
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </>
  );
}