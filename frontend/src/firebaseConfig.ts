import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, } from
  "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBNJL-OPXCo9ATebziJhIQkhxFynch49y8",
    authDomain: "the-binge-box.firebaseapp.com",
    projectId: "the-binge-box",
    storageBucket: "the-binge-box.appspot.com",
    messagingSenderId: "945084600177",
    appId: "1:945084600177:web:e0cf85e9afc94a007b30d0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
 signInWithPopup(auth, authProvider);
}
export function signOut(): void {
 auth.signOut();
}
