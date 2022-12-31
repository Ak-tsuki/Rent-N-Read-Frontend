import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const OtpPasswordreset = (email) => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [otpcode, setOTPcode] = useState("");

  const changePassword = () => {
    if (password === "" || otpcode === "" || confirmpassword === "") {
      toast.error("Please fill the empty feilds", {
        toastId: "error",
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }
    if (password !== confirmpassword) {
      toast.error("Password and Confirm Password Does not match", {
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
    <div>
      <p>Enter Your OTP code</p>
      <label htmlFor="">OTP Code:</label>
      <input
        type="number"
        name="otp"
        id=""
        onChange={(e) => {
          setOTPcode(e.target.value);
        }}
      />
      <label htmlFor="">Password:</label>
      <input
        type="password"
        name=""
        id=""
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <label htmlFor="">Confirm Password:</label>
      <input
        type="password"
        name=""
        id=""
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <button onClick={changePassword}>Change Password</button>
    </div>
  );
};

export default OtpPasswordreset;
