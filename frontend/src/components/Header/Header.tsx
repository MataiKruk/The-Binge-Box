import { NavLink } from "react-router-dom";
import { useAuth, useUser } from "../../context/AuthContext";
import "./Header.css";
import { Link } from "react-router-dom";
import { Avatar } from "../Avatar/Avatar";

const Header = () => {
  const user = useUser();
  const { signOutUser } = useAuth();

  return (
    <div className="nav">
      <Link to="/home">
        <p className="nav-logo">The Binge Box</p>
      </Link>

      <div className="nav-right">
        {user ? (
          <>
            <p>{user.email}</p>

            <a href="#" onClick={signOutUser}>
              Logout
            </a>

            <Avatar
              src={user?.photoURL ?? undefined}
              alt={user?.displayName ?? undefined}
            />
          </>
        ) : (
          <NavLink to="/sign-in">Login</NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
