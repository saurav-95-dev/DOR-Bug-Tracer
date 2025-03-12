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
  const [isNewUser, setIsNewUser] = useState(true);
  const [todos, setTodos] = useState([{ input: "Hello! Add your first todo!", complete: true }]);
  const [selectedTab, setSelectedTab] = useState("Open");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      setIsNewUser(false); // If user exists, it's not a new user
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setIsNewUser(false); // User is now considered returning
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });
    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
      setIsNewUser(true); // Reset to signup flow after logout
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  }

  return (
    <>
      {!user ? (
        <Auth setUser={setUser} isNewUser={isNewUser} setIsNewUser={setIsNewUser} />
      ) : (
        <>
          <Header todos={todos} />
          <Tabs todos={todos} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <TodoList handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo} todos={todos} selectedTab={selectedTab} />
          <TodoInput handleAddTodo={handleAddTodo} />
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </>
  );
}
