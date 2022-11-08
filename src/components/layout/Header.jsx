import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.svg";
import "./header.scss";
const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuClickHandler = (e) => {
    e.preventDefault();
    setOpenMenu((p) => !p);
  };
  return (
    <div className="header">
      <div className="header__logo">
       <Link></Link> <img src={logo} alt="logo" className="header__logo--img" />
      </div>
      <div
        className={`menu ${openMenu ? "menu--open" : ""}`}
        onClick={menuClickHandler}
      >
        <div className="menu__line "></div>
        <div className="menu__line "></div>
        <div className="menu__line  "></div>
      </div>
      <nav className={`nav ${openMenu ? "nav--slide" : ""}`}>
        <Link to="/" className="nav__links ">Home</Link>
        <Link className="nav__links">Books</Link>
        <Link className="nav__links">About</Link>
        <Link className="nav__btn nav__links">Sign In</Link>
      </nav>
    </div>
  );
};

export default Header;
