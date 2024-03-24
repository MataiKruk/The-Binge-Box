import { NavLink } from "react-router-dom";
import { useAuth, useUser } from "../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const user = useUser();
  const { signOutUser } = useAuth();

  return (
    <div className="nav">
      <p className="nav-logo">The Binge Box</p>

      <div className="nav-right">
        {user ? (
          <>
            <p>{user.email}</p>

            <a href="#" onClick={signOutUser}>
              Logout
            </a>

            {user?.photoURL && (
              <div className="avatar">
                <img src={user.photoURL} alt={user?.displayName ?? "Avatar"} />
              </div>
            )}
          </>
        ) : (
          <NavLink to="/sign-in">Login</NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
