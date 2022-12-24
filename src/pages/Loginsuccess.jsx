import React, { useEffect } from "react";

const Loginsuccess = () => {
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:90/thirdpartyRouter/login/sucess", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          console.log(resObject);
          localStorage.setItem("userType", resObject.userType);
          localStorage.setItem("token", resObject.token);
          localStorage.setItem("username", resObject.username);
          localStorage.setItem("googlelogin", true);
          window.location.replace("/");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center p-5">
        <img
          src="https://static.vecteezy.com/system/resources/previews/005/163/927/original/login-success-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
          alt=""
          width={"50%"}
        />
      </div>
    </div>
  );
};

export default Loginsuccess;
