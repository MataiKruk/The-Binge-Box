import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">SignIn</NavLink>
        </li>
        <li>
          <NavLink to="/search">Search</NavLink>
        </li>
        <li>
          <NavLink to="/advanced-search">Advanced Search</NavLink>
        </li>
      </ul>
    </div>
  );
};
export default Header;
