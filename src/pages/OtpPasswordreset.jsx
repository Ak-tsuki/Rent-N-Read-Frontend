import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const OtpPasswordreset = (email) => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [otpcode, setOTPcode] = useState("");

  const changePassword = (e) => {
    e.preventDefault();

    if (password === "" || otpcode === "" || confirmpassword === "") {
      toast.error("Please fill the empty feilds", {
        toastId: "error",
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }
    if (password !== confirmpassword) {
      toast.error("Password and Confirm Password doesnot match", {
        toastId: "error",
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }
    const data = {
      email: email.email,
      password: password,
      otpcode: otpcode,
    };
    console.log(data);

    axios
      .put("http://localhost:90/reset-password", data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (res.data.success == "Success") {
            toast.success(res.data.message, {
              position: "top-center",
              autoClose: 4000,
            });
            window.location.replace("/login");
          }
          if (res.data.success == "Failed") {
            toast.warn(res.data.message, {
              position: "top-center",
              autoClose: 4000,
            });
          }
          if (res.data.success == "Error") {
            toast.error(res.data.message, {
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
    <div className="forget">
      {/* <h2 className="forget__heading">Change Password</h2> */}
      <form className="forget__form">
        <div className="forget__input">
          <p className="feild_heading" htmlFor="">
            OTP Code
          </p>
          <input
            type="number"
            name="otp"
            id=""
            onChange={(e) => {
              setOTPcode(e.target.value);
            }}
          />
          <p className="feild_heading" htmlFor="">
            New Password
          </p>
          <input
            type="password"
            name=""
            id=""
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p className="feild_heading" htmlFor="">
            Confirm Password
          </p>
          <input
            type="password"
            name=""
            id=""
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <button className="forget__btn" onClick={changePassword}>
          Change Password
        </button>
      </form>
    </div>
  );
};

export default OtpPasswordreset;
