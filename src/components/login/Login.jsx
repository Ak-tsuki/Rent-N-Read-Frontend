import React from "react";
import "./login.scss";
import { FaUserAlt } from "react-icons/fa";
import { ImKey } from "react-icons/im";
import { Link } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import background from "../../assets/background.svg";
const Login = () => {
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
          <Link to="/" className="login-link">
            Sign In
          </Link>
        </p>
        <form className="login__form">
          <div className="login__input">
            <FaUserAlt size={20} className="login__input--icon" />
            <input type="text" placeholder="Username" />
          </div>
          <div className="login__input">
            <ImKey size={20} className="login__input--icon" />
            <input type="password" placeholder="Password" />
          </div>
          <button type="submit" className="login__btn">
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
