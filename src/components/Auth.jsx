import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "./Auth.css";

export default function Auth({ setUser, isNewUser, setIsNewUser }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const provider = new GoogleAuthProvider();

  const handleSignInWithGoogle = async () => {
    try {
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setIsNewUser(false);
    } catch (error) {
      console.error("Google Sign-in error:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNewUser) {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        setUser(userCredential.user);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        setUser(userCredential.user);
      }
      setIsNewUser(false);
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isNewUser ? "Sign Up" : "Log In"}</h2>
        <button className="google-btn" onClick={handleSignInWithGoogle}>
          <img src="src/assets/google (1).png" alt="Google Logo" className="google-logo" />
          {isNewUser ? "Sign up" : "Log in"} with Google
        </button>
        <div className="separator"><span>OR</span></div>
        <form onSubmit={handleFormSubmit}>
          {isNewUser && (
            <>
              <label>Full Name</label>
              <input type="text" name="fullName" placeholder="Enter your name" value={formData.fullName} onChange={handleChange} />
            </>
          )}
          <label>Email</label>
          <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
          {isNewUser && (
            <>
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} />
            </>
          )}
          <button type="submit" className="login-btn">{isNewUser ? "Sign Up" : "Log In"}</button>
        </form>
        <p className="toggle-auth" onClick={() => setIsNewUser(!isNewUser)}>
          {isNewUser ? "Already have an account? Log in" : "New user? Sign up here"}
        </p>
      </div>
    </div>
  );
}
