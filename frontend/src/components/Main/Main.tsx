import React from "react";
import "./Main.css";
import { auth } from "../../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const Main: React.FC = () => {
  const handleSignIn = () => {
    console.log("Signing in...");
  };

  const handleSignUp = () => {
    console.log("Navigating to sign up...");
  };
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };
  const signOutUser = async () => {
    try {
      await signOut(auth);
      console.log("Signed out successfully!");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="signin-container">
      <div className="logo-container">
        <img src="/images/logo.png" alt="Logo" className="logo" />{" "}
      </div>
      <div className="buttons-container">
        <button onClick={handleSignIn} className="signin-btn">
          Sign In
        </button>
        <button onClick={handleSignUp} className="signup-btn">
          Sign Up
        </button>
        <button className="google-signin-btn" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
        <button onClick={signOutUser} className="signout-btn">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Main;
