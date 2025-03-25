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
  const [todos, setTodos] = useState([{ 
    input: "Hello! Add your first todo!", 
    complete: true, 
    file: null, 
    priority: "Medium" 
  }]);
  const [selectedTab, setSelectedTab] = useState("Open");
  const [selectedPriority, setSelectedPriority] = useState("All");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  function handleAddTodo(newTodo, file, priority) {
    const newTodoItem = {
      input: newTodo,
      complete: false,
      file: file
        ? {
            name: file.name,
            type: file.type,
            url: URL.createObjectURL(file),
          }
        : null,
      priority: priority || "Medium",
    };

    const newTodoList = [...todos, newTodoItem];
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

  function handleEditTodo(index, newInput, newPriority) {
    const newTodoList = [...todos];
    newTodoList[index].input = newInput;
    if (newPriority) {
      newTodoList[index].priority = newPriority;
    }
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

  async function handleLogout() {
    try {
      await signOut(auth);
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
        <div className="app-container">
          <Header todos={todos} />
          <Tabs
            todos={todos}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
          />
          <div className="todo-list-container">
            <TodoList
              handleEditTodo={handleEditTodo}
              handleCompleteTodo={handleCompleteTodo}
              handleDeleteTodo={handleDeleteTodo}
              todos={todos}
              selectedTab={selectedTab}
              selectedPriority={selectedPriority}
            />
          </div>
          <TodoInput handleAddTodo={handleAddTodo} />
          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}