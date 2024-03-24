import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth";
import { createContext, useContext } from "react";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export interface AuthContextModel {
  user: User | null; // null when not logged in
}

const defaultValue: AuthContextModel = {
  user: null,
};

const AuthContext = createContext(defaultValue);

export const useUser = () => {
  const { user } = useContext(AuthContext);
  return user;
};

export const useAuth = () => {
  const navigate = useNavigate();

  const signInWithEmail = async (email: string, password: string) => {
    console.log("Signing in");
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/home");
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      console.log("Signed out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return { signInWithEmail, signInWithGoogle, signOutUser };
};

export default AuthContext;
