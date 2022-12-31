import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import OtpPasswordreset from "./OtpPasswordreset";

const ForgetPasswordEmail = () => {
  const [email, setEmail] = useState("");

  const [otpForm, showForm] = useState(true);

  const sendOTP = (e) => {
    if (email === "") {
      toast.error("Enter Your Email", {
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
    <div>
      {otpForm ? (
        // Email Sending
        <div>
          <p>Enter Your Email</p>
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="Email"
            id=""
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button onClick={sendOTP}>Send OTP</button>
        </div>
      ) : (
        // Password Reset form
        <OtpPasswordreset email={email}></OtpPasswordreset>
      )}
    </div>
  );
};

export default ForgetPasswordEmail;
