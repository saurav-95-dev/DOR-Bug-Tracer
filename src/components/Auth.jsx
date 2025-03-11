import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import "./Auth.css"; // Import CSS

export default function Auth({ setUser }) {
  const [user, setLocalUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLocalUser(user);
      setUser(user);
    });

    return () => unsubscribe();
  }, [setUser]);

  const provider = new GoogleAuthProvider();

  const handleSignIn = async () => {
    try {
      provider.setCustomParameters({ prompt: "select_account" });

      const result = await signInWithPopup(auth, provider);
      setLocalUser(result.user);
      setUser(result.user);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setLocalUser(null);
      setUser(null);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {user ? (
          <>
            <h2>Welcome, {user.displayName}!</h2>
            <button className="signout-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <h2>Welcome back!</h2>
            <p className="subtext">
              Discover the world’s best community of interior designers
            </p>

            <button className="google-btn" onClick={handleSignIn}>
              <img
                src="src/assets/google (1).png"
                alt="Google Logo"
                className="google-logo"
              />
              Log in with Google
            </button>

            <div className="separator">
              <span>OR</span>
            </div>

            <form>
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={handleChange}
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />

              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
