import { signOut } from "firebase/auth";
import { auth, provider } from "../firebase"; 
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Auth({ setUser }) {
  const [user, setLocalUser] = useState(null);

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

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-96 text-center">
        {user ? (
          <>
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-300"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              Welcome, {user.displayName}!
            </h2>
            <button
              onClick={handleSignOut}
              className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-700">Welcome to Todo App</h2>
            <p className="text-gray-500 mt-2">Sign in to continue</p>
            <button
              onClick={handleSignIn}
              className="mt-6 flex items-center justify-center gap-2 bg-blue-500 text-white w-full px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                alt="Google"
                className="w-5 h-5"
              />
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
}
