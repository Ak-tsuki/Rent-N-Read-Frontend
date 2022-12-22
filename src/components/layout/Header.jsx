import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import "./header.scss";
const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuClickHandler = (e) => {
    e.preventDefault();
    setOpenMenu((p) => !p);
  };
  const logout = () => {
    localStorage.clear();
    window.location.replace("/login");
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:90/thirdpartyRouter/login/sucess", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  console.log(user);

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
        <Link className="nav__links">About</Link>
        {localStorage.getItem("token") ? (
          <Link className="nav__btn nav__links" to="login" onClick={logout}>
            Log out
          </Link>
        ) : (
          <Link className="nav__btn nav__links" to="login">
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
