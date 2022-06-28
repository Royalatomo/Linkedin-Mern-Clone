// Libraries
import React from "react";
import { Link } from "react-router-dom";

// Styled Components
import { Nav, NavLink, Register, Login } from "./Styles/HeaderStyled";

const Header = ({ hidden }) => {
  return (
    <Nav>
      <Link to="/" className="logo-div">
        <img src="/images/login-logo.svg" alt="" />
      </Link>

      <NavLink>
        {!hidden && (
          <>
            <Link to="/" className="icon-div">
              <i className="fa-solid fa-compass"></i>
              <span>discover</span>
            </Link>

            <Link to="/" className="icon-div">
              <i className="fa-solid fa-user-group"></i>
              <span>people</span>
            </Link>

            <Link to="/" className="icon-div">
              <i className="fa-solid fa-chalkboard-user"></i>
              <span>learning</span>
            </Link>

            <Link to="/" className="icon-div">
              <i className="fa-solid fa-briefcase"></i>
              <span>jobs</span>
            </Link>

            <div className="divider" />
          </>
        )}

        {/* Login/Register Button */}
        <Register className="register" to="/join-now">
          Join now
        </Register>
        <Login to="/login">Sing in</Login>
      </NavLink>
    </Nav>
  );
};

export default Header;
