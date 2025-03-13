// Auth.jsx
import { useState } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "./Auth.css";

export default function Auth({ setUser }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSignUp, setIsSignUp] = useState(true);

  const provider = new GoogleAuthProvider();

  const handleSignInWithGoogle = async () => {
    try {
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
    } catch (error) {
      alert("Google Sign-in error: " + error.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      }
      setUser(userCredential.user);
      localStorage.setItem("user", JSON.stringify(userCredential.user));
    } catch (error) {
      alert("Authentication error: " + error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
        <button className="google-btn" onClick={handleSignInWithGoogle}>
          <img src="/assets/google-icon.png" alt="Google Logo" className="google-logo" />
          {isSignUp ? "Sign up" : "Log in"} with Google
        </button>
        <div className="separator"><span>OR</span></div>
        <form onSubmit={handleFormSubmit}>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="login-btn">{isSignUp ? "Sign Up" : "Log In"}</button>
        </form>
        <p onClick={() => setIsSignUp(!isSignUp)} className="toggle-link">
          {isSignUp ? "Already have an account? Log in" : "Don't have an account? Sign up"}
        </p>
      </div>
    </div>
  );
}
