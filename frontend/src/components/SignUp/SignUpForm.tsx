import { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import "./SignUpForm.css";
import { useNavigate } from "react-router-dom";

type SignUpFormData = {
  username: string;
  password: string;
};

export interface SignUpFormProps {}

export default function SignUpForm(props: SignUpFormProps) {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as SignUpFormData;

    if (!("username" in data) || !("password" in data))
      setError("Username and password is required.");

    try {
      await createUserWithEmailAndPassword(auth, data.username, data.password);
      navigate("/home");
    } catch (e) {
      setError(`Error: ${e}`);
    }
  };

  return (
    <div className="form-container">
      <form className="sign-up-form" onSubmit={handleSubmit} {...props}>
        {error && <p className="form-error">{error}</p>}
        <label htmlFor="username">Email</label>
        <input name="username" placeholder="Email" required />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
