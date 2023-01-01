import React, { useState } from "react";
import axios from "axios";
import "./forgetPasswordEmail.scss";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import OtpPasswordreset from "./OtpPasswordreset";

const ForgetPasswordEmail = () => {
  const [email, setEmail] = useState("");

  const [otpForm, showForm] = useState(true);

  const sendOTP = (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("Enter your Email", {
        toastId: "error",
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }
    const data = {
      email: email,
    };

    axios
      .post("http://localhost:90/otp-send", data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (res.data.statusText == "Success") {
            toast.success(res.data.message, {
              position: "top-center",
              autoClose: 4000,
            });
            showForm(false);
          }
          if (res.data.statusText == "Failed") {
            toast.warn(res.data.message, {
              position: "top-center",
              autoClose: 4000,
            });
          }
        } else {
          toast.error("Somthing went wrong!", {
            toastId: "error",
            position: "top-center",
            autoClose: 4000,
          });
        }
      })

      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="forget-container">
      {otpForm ? (
        // Email Sending
        <div className="forget">
          <h2 className="forget__heading">Enter your Email</h2>
          <form className="forget__form">
            <div className="forget__input">
              <p className="feild_heading" htmlFor="">
                Email Address
              </p>
              <input
                type="email"
                name="Email"
                id=""
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <button className="forget__btn" onClick={sendOTP}>
              Send OTP
            </button>
          </form>
        </div>
      ) : (
        // Password Reset form
        <OtpPasswordreset email={email}></OtpPasswordreset>
      )}
    </div>
  );
};

export default ForgetPasswordEmail;
