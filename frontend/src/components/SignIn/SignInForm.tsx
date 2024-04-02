import { FormEvent, useState } from "react";
import { useAuth } from "../../context/AuthContext";

type SignInFormData = {
  username: string;
  password: string;
};

export interface SignInFormProps {}

export default function SignInForm(props: SignInFormProps) {
  const [error, setError] = useState<string>();
  const { signInWithEmail } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as SignInFormData;

    if (!("username" in data) || !("password" in data))
      setError("Username and password is required.");

    try {
      await signInWithEmail(data.username, data.password);
    } catch (e) {
      setError(`Error: ${e}`);
    }
  };

  return (
    <div className="form-container">
      <form className="sign-in-form" onSubmit={handleSubmit} {...props}>
        {error && <p className="form-error">{error}</p>}
        <label htmlFor="username">Email</label>
        <input id="username" name="username" placeholder="Email" required />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
