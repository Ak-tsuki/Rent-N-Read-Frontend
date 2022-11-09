import React from "react";
import register_image from "../../assets/register-image.svg";
import { FaUserAlt, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ImKey } from "react-icons/im";
import { AiFillGoogleCircle } from "react-icons/ai";
import "./register.scss";
import { Link } from "react-router-dom";

import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [contact_no, setContactNo] = useState("");

  const [password, setPassword] = useState("");

  const registerUser = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      contact_no: contact_no,
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:90/user/register", data)
      .then((response) => {
        if (response.data.msg === "User Registered Successfully") {
          console.log("User Registered Successfully", response);
        } else {
          console.log(response);
        }
      })

      .catch();
  };

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
              <input type="text" placeholder="Username" 
              onChange={(e) => {
                setUsername(e.target.value);
              }}/>
            </div>
            <div className="register__input">
              <MdEmail size={20} className="register__input--icon" />
              <input type="email" placeholder="Email address" 
              onChange={(e) => {
                setEmail(e.target.value);
              }}/>
            </div>
            <div className="register__input">
              <FaPhone size={20} className="register__input--icon" />
              <input type="number" placeholder="Contact No." 
              onChange={(e) => {
                setContactNo(e.target.value);
              }}/>
            </div>
            <div className="register__input">
              <ImKey size={20} className="register__input--icon" />
              <input type="password" placeholder="Enter password" 
              onChange={(e) => {
                setPassword(e.target.value);
              }}/>
            </div>
            <button type="submit" className="register__btn" onClick={registerUser}>
              Create an account
            </button>
          </form>
          <button className="register__google">
            <AiFillGoogleCircle className="register__google--icon" size={30} />
            Sign up with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
