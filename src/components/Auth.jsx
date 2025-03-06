import {  signOut } from "firebase/auth";
import { auth, provider } from "../firebase"; // Ensure correct path
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import PropTypes from "prop-types";

export default function Auth({ setUser }) {
  const [user, setLocalUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLocalUser(user);
      setUser(user); // Update user in App.jsx
    });

    return () => unsubscribe();
  }, [setUser]);

  const provider = new GoogleAuthProvider();

const handleSignIn = async () => {
  try {
    // Forces Google sign-in prompt every time
    provider.setCustomParameters({ prompt: "select_account" });

    const result = await signInWithPopup(auth, provider);
    setLocalUser(result.user);
    setUser(result.user);
  } catch (error) {
    console.error("Sign-in error:", error);
  }
};

  // Handle Sign-Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setLocalUser(null);
      setUser(null);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {user ? (
        <>
          <h2>Welcome, {user.displayName}!</h2>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <h2>Welcome to Todo App</h2>
          <button onClick={handleSignIn}>Sign in with Google</button>
        </>
      )}
    </div>
  );
}

Auth.propTypes = {
  setUser: PropTypes.func.isRequired, // Ensures setUser is a required function prop
};