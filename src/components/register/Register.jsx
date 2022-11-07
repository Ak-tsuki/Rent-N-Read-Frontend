import React from "react";
import register_image from "../../assets/register-image.svg";
import { FaUserAlt, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ImKey } from "react-icons/im";
import { AiFillGoogleCircle } from "react-icons/ai";
import "./register.scss";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="register-container">
      <div className="register">
        <div className="register__image">
          <img src={register_image} alt="register_image" className="register__image--img" />
        </div>
        <div className="register__form">
          <h2 className="register__heading">Sign Up to Rent N' Read</h2>
          <h4 className="register__sub-heading">
            Already a member{" "}
            <Link to="/" className="login-link">
              Sign In
            </Link>{" "}
          </h4>
          <form>
            <div className="register__input">
              <FaUserAlt size={20} className="register__input--icon" />
              <input type="text" placeholder="Username" />
            </div>
            <div className="register__input">
              <MdEmail size={20} className="register__input--icon" />
              <input type="email" placeholder="Email address" />
            </div>
            <div className="register__input">
              <FaPhone size={20} className="register__input--icon" />
              <input type="number" placeholder="Contact No." />
            </div>
            <div className="register__input">
              <ImKey size={20} className="register__input--icon" />
              <input type="password" placeholder="Enter password" />
            </div>
            <button type="submit" className="register__btn">
              Create an account
            </button>
          </form>
          <button type="submit" className="register__google">
            <AiFillGoogleCircle className="register__google--icon" size={30} />
            Sign up with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
