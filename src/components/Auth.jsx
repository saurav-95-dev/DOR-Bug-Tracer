import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase"; // Import Firebase auth and provider
import { useState } from "react";

export default function Auth() {
  const [user, setUser] = useState(null);

  // Handle Google Sign-In
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // Save user details in state
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  // Handle Sign-Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {user ? (
        <>
          <h2>Welcome, {user.displayName}!</h2>
          <img src={user.photoURL} alt="Profile" style={{ borderRadius: "50%", width: "100px" }} />
          <p>Email: {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={handleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
}
