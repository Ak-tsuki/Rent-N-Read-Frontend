import React from "react";
import register_image from "../../assets/register-image.svg";
import { FaUserAlt, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ImKey } from "react-icons/im";
import { AiFillGoogleCircle } from "react-icons/ai";
import "./register.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    console.log(data);
    axios
      .post("http://localhost:90/user/register", data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          toast.success("User Registered Sucessfully", {
            position: "top-center",
            autoClose: 4000,
          });
          window.location.replace("/login");
        } else {
          toast.error("User Not Registered", {
            position: "top-center",
            autoClose: 4000,
          });
        }
        console.log(response.data.msg);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="register-container">
        <div className="register">
          <div className="register__image">
            <img
              src={register_image}
              alt="register_image"
              className="register__image--img"
            />
          </div>
          <div className="register__form">
            <h2 className="register__heading">Sign Up to Rent N' Read</h2>
            <h4 className="register__sub-heading">
              Already a member{" "}
              <Link to="/login" className="login-link">
                Sign In
              </Link>{" "}
            </h4>
            <form>
              <div className="register__input">
                <FaUserAlt size={20} className="register__input--icon" />
                <input
                  required={true}
                  type="text"
                  placeholder="Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="register__input">
                <MdEmail size={20} className="register__input--icon" />
                <input
                  required={true}
                  type="email"
                  placeholder="Email address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="register__input">
                <FaPhone size={20} className="register__input--icon" />
                <input
                  required={true}
                  type="number"
                  placeholder="Contact No."
                  onChange={(e) => {
                    setContactNo(e.target.value);
                  }}
                />
              </div>
              <div className="register__input">
                <ImKey size={20} className="register__input--icon" />
                <input
                  required={true}
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <button
                type="submit"
                className="register__btn"
                onClick={registerUser}
              >
                Create an account
              </button>
            </form>
            <button type="submit" className="register__google">
              <AiFillGoogleCircle
                className="register__google--icon"
                size={30}
              />
              Sign up with google
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
