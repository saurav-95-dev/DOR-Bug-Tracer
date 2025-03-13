import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import "./Auth.css";

export default function Auth({ setUser, isFirstTime, setIsFirstTime }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [setUser]);

  const provider = new GoogleAuthProvider();

  const handleSignInWithGoogle = async () => {
    try {
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("isFirstTime", "false"); // ✅ Ensure Login page on revisit
      setIsFirstTime(false);
    } catch (error) {
      alert("Google Sign-in error: " + error.message);
      console.error("Google Sign-in error:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isFirstTime) {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        setUser(userCredential.user);
        localStorage.setItem("user", JSON.stringify(userCredential.user));
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        setUser(userCredential.user);
        localStorage.setItem("user", JSON.stringify(userCredential.user));
      }
      localStorage.setItem("isFirstTime", "false"); // ✅ Ensure Login page next time
      setIsFirstTime(false);
    } catch (error) {
      alert("Authentication error: " + error.message);
      console.error("Auth error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user");
      localStorage.setItem("isFirstTime", "true"); // ✅ Reset to Sign-Up
      setIsFirstTime(true);
    } catch (error) {
      alert("Logout error: " + error.message);
      console.error("Logout error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isFirstTime ? "Sign Up" : "Log In"}</h2>
        <button className="google-btn" onClick={handleSignInWithGoogle}>
          <img src="/assets/google-icon.png" alt="Google Logo" className="google-logo" />
          {isFirstTime ? "Sign up" : "Log in"} with Google
        </button>
        <div className="separator"><span>OR</span></div>
        <form onSubmit={handleFormSubmit}>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="login-btn">{isFirstTime ? "Sign Up" : "Log In"}</button>
        </form>
      </div>
    </div>
  );
}

