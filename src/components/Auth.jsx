import { useState } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "./Auth.css";

export default function Auth({ setUser }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState(null);
  const provider = new GoogleAuthProvider();

  const handleAuthWithGoogle = async () => {
    try {
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAuthWithEmail = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        setUser(userCredential.user);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        setUser(userCredential.user);
      }
      localStorage.setItem("user", JSON.stringify(auth.currentUser));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
        
        {error && <p className="error-message">{error}</p>}

        <button className="google-btn" onClick={handleAuthWithGoogle}>
          <img src="/assets/google-icon.png" alt="Google Logo" className="google-logo" />
          {isSignUp ? "Sign up with Google" : "Login with Google"}
        </button>

        <div className="separator"><span>OR</span></div>

        <form onSubmit={handleAuthWithEmail}>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <button type="submit" className="login-btn">{isSignUp ? "Sign Up" : "Login"}</button>
        </form>

        <p className="toggle-text">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <span className="toggle-link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Login here" : "Sign up here"}
          </span>
        </p>
      </div>
    </div>
  );
}
