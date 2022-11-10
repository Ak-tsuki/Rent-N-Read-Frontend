import React from "react";
import "./login.scss";
import { FaUserAlt } from "react-icons/fa";
import { ImKey } from "react-icons/im";
import { Link } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import background from "../../assets/background.svg";
import axios from "axios";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const login = (e) => {
    e.preventDefault();

    if (username.length == 0 || password.length == 0) {
      setError(true);
    }

    const data = {
      username: username,
      password: password,
    };
    axios
      .post("http://localhost:90/user/login", data)
      .then((res) => {
        console.log(res);
        if (res.data.token) {
          console.log(res.data);
          localStorage.setItem("userType", res.data.userType);
          localStorage.setItem("token", res.data.token);
          toast.success("User Logged In  Sucessfully", {
            position: "top-center",
            autoClose: 4000,
          });
          if (localStorage.getItem("userType") === "admin") {
            // console.log(res)
            window.location.replace("/register");
          } else {
            console.log(res.data);
            window.location.replace("/");
          }
        } else {
          toast.error("User Not Logged In", {
            position: "top-center",
            autoClose: 4000,
          });
          console.log(res);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="login-container">
      {/* <img
        src={background}
        alt="background"
        className="login-container__background"
      /> */}
      <div className="login">
        <h2 className="login__heading">Sign In to Rent N' Read</h2>
        <p className="login__sub-heading">
          Not registered?{" "}
          <Link to="/register" className="login-link">
            Sign Up
          </Link>
        </p>
        <form className="login__form" onSubmit={login}>
          <div className="login__input">
            <FaUserAlt size={20} className="login__input--icon" />
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            {error && username.length <= 0 ? (
              <label>Username cannot be empty</label>
            ) : (
              ""
            )}
          </div>
          <div className="login__input">
            <ImKey size={20} className="login__input--icon" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {error && password.length <= 0 ? (
              <label>Password cannot be empty</label>
            ) : (
              ""
            )}
          </div>
          <button type="submit" className="login__btn" onClick={login}>
            Sign In
          </button>
        </form>
        <button className="login__google">
          <AiFillGoogleCircle className="login__google--icon" size={30} />
          Sign in with google
        </button>
      </div>
    </div>
  );
};

export default Login;
