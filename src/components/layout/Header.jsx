import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import "./header.scss";
import AccountMenu from "./profile_dropdown";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuClickHandler = (e) => {
    e.preventDefault();
    setOpenMenu((p) => !p);
  };
  const logout = () => {
    if (localStorage.getItem("googlelogin")) {
      localStorage.clear();
      window.open("http://localhost:90/thirdpartyRouter/logout", "_self");
    } else {
      localStorage.clear();
      window.location.replace("/login");
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="header__logo">
          <img src={logo} alt="logo" className="header__logo--img" />
        </div>
      </Link>
      <div
        className={`menu ${openMenu ? "menu--open" : ""}`}
        onClick={menuClickHandler}
      >
        <div className="menu__line "></div>
        <div className="menu__line "></div>
        <div className="menu__line  "></div>
      </div>
      <nav className={`nav ${openMenu ? "nav--slide" : ""}`}>
        <Link to="/" className="nav__links ">
          Home
        </Link>
        <Link className="nav__links" to="/books">
          Books
        </Link>
        <Link className="nav__links" to="/about">
          About
        </Link>
        <Link className="nav__links" to="/contact">
          Contact Us
        </Link>
        {localStorage.getItem("token") ? (
          <AccountMenu></AccountMenu>
        ) : (
          // <Link className="nav__btn nav__links" to="login" onClick={logout}>
          //   Log out
          // </Link>
          <Link className="nav__btn nav__links" to="login">
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
