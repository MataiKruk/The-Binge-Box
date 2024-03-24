import React from "react";
import { useAuth, useUser } from "../../context/AuthContext";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";

const Main: React.FC = () => {
  const navigate = useNavigate();
  const user = useUser();
  const { signInWithGoogle, signOutUser } = useAuth();

  return (
    <div className="signin-container">
      <div className="logo-container">
        <img src="/images/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="buttons-container">
        {!user ? (
          <>
            <button onClick={() => navigate("/sign-in")} className="signin-btn">
              Sign In
            </button>

            <button onClick={() => navigate("/sign-up")} className="signup-btn">
              Sign Up
            </button>

            <button className="google-signin-btn" onClick={signInWithGoogle}>
              Sign in with Google
            </button>
          </>
        ) : (
          <button onClick={signOutUser} className="signout-btn">
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Main;
