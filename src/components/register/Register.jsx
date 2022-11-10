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
  const [error, setError] = useState(false);

  const registerUser = (e) => {
    e.preventDefault();
    if (
      username.length == 0 ||
      email.length == 0 ||
      contact_no.length == 0 ||
      password.length == 0
    ) {
      setError(true);
    }

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
        } else if (response.status === 200) {
          toast.error("Username Already Registered", {
            toastId: "error",
            position: "top-center",
            autoClose: 4000,
          });
        } else if (response.status === 401) {
          toast.error("Something Went Wrong, Please Try Again!!", {
            toastId: "error",
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
      <div className="register-container" data-test="register">
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
            <form onSubmit={registerUser}>
              <div className="register__input">
                <FaUserAlt size={20} className="register__input--icon" />
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  data-test="username"
                />
                {error && username.length <= 0 ? (
                  <label>Username cannot be empty</label>
                ) : (
                  ""
                )}
              </div>

              <div className="register__input">
                <MdEmail size={20} className="register__input--icon" />
                <input
                  required
                  type="email"
                  placeholder="Email address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  data-test="email"
                />
                {error && email.length <= 0 ? (
                  <label>Email cannot be empty</label>
                ) : (
                  ""
                )}
              </div>

              <div className="register__input">
                <FaPhone size={20} className="register__input--icon" />
                <input
                  required
                  type="number"
                  placeholder="Contact No."
                  onChange={(e) => {
                    setContactNo(e.target.value);
                  }}
                  data-test="contactno"
                />
                {error && contact_no.length <= 0 ? (
                  <label>Contact number cannot be empty</label>
                ) : (
                  ""
                )}
              </div>

              <div className="register__input">
                <ImKey size={20} className="register__input--icon" />
                <input
                  required
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  data-test="password"
                />
                {error && password.length <= 0 ? (
                  <label>Password cannot be empty</label>
                ) : (
                  ""
                )}
              </div>

              <button
                type="submit"
                className="register__btn"
                onClick={registerUser}
                data-test="register-btn"
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
