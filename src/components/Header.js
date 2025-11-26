import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);

  return (
    <div className="header">
      <Link to="/">
        <div className="logo-container">
          <img className="logo" src={LOGO_URL} />
        </div>
      </Link>

      <div className="nav-items">
        <ul>
          <li>Online Status: {onlineStatus ? "✅" : "⭕"} </li>
          <li>
            {" "}
            <Link to="/"> Home </Link>
          </li>
          <li>
            {" "}
            <Link to="/about"> About Us </Link>
          </li>
          <li>
            {" "}
            <Link to="/contact"> Contact Us </Link>
          </li>
          <li>
            {" "}
            <Link to="/cart"> Cart </Link>{" "}
          </li>

          <button
            className="login-btn"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {" "}
            {btnName}
            <li>{loggedInUser}</li>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
