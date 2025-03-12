import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Auth from "./components/Auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase"; // Ensure correct path

export default function App() {
  const [user, setUser] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [todos, setTodos] = useState([{ input: "Hello! Add your first todo!", complete: true }]);
  const [selectedTab, setSelectedTab] = useState("Open");

  // ✅ Load user & first-time flag from localStorage on mount
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const firstTime = localStorage.getItem("isFirstTime") !== "false";

    setIsFirstTime(firstTime);
    if (savedUser) setUser(savedUser);
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

  // ✅ Handle Logout & Redirect to Sign-Up
  async function handleLogout() {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      localStorage.setItem("isFirstTime", "true"); // ✅ Ensure Sign-Up page is shown
      setUser(null);
      setIsFirstTime(true);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  }

  // ✅ Track Firebase Auth State (Login / Logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
        localStorage.setItem("isFirstTime", "false"); // ✅ Switch to Login if user exists
      } else {
        setUser(null);
        setIsFirstTime(true); // ✅ Ensure first-time users see Sign-Up
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {!user ? (
        <Auth setUser={setUser} isFirstTime={isFirstTime} setIsFirstTime={setIsFirstTime} />
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
