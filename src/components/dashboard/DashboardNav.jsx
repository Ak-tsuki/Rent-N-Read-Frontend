import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { ImBooks, ImCog } from "react-icons/im";
import { GiOpenBook } from "react-icons/gi";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { GiSpeaker } from "react-icons/gi";
import { RiExchangeBoxFill, RiMessage2Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import "./dashboard.scss";
const DashboardNav = ({ open }) => {
  const [userDetails, setUserDetails] = useState("");
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:90/user/get", config)
      .then((res) => {
        setUserDetails(res.data.data);
        console.log(userDetails.first_name);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className={`dash-nav ${open ? "dash-nav__open" : "dash-nav__close"} `}>
      <div className="dash-nav__profile">
        <img
        // src={`http://localhost:90/${userDetails.profile_pic}`}
          src={
            userDetails.profile_pic
              ? `http://localhost:90/${userDetails.profile_pic}`
              : "https://www.pngitem.com/pimgs/m/421-4212341_default-avatar-svg-hd-png-download.png"
          }
          alt="profile_img"
          className="dash-nav__profile--img"
        />
        
        <p className="dash-nav__profile--username">{userDetails.first_name} {userDetails.last_name}</p>
        <Link className="dash-nav__profile--view" to="ProfilePage"><CgProfile />  View profile</Link>
        
      </div>
      <Link className="dash-nav__link" to="/dashboard">
        {" "}
        <ImBooks className="dash-nav__link--icon" />
        My Books
      </Link>
      <Link className="dash-nav__link" to="/dashboard/request">
        {" "}
        <GiOpenBook className="dash-nav__link--icon" />
        Rent Requests
      </Link>
      <Link className="dash-nav__link" to="/dashboard/exchangerequest">
        {" "}
        <RiExchangeBoxFill className="dash-nav__link--icon" />
        Exchange Requests
      </Link>

      <Link className="dash-nav__link" to="/dashboard/myebooks">
        {" "}
        <BsFillFileEarmarkPdfFill className="dash-nav__link--icon" />
        E-books
      </Link>
      <Link className="dash-nav__link" to="/dashboard/myaudiobooks">
        {" "}
        <GiSpeaker className="dash-nav__link--icon" />
        Audio Books
      </Link>
      <br />
      <div className="divider"></div>
      <br />
      <Link className="dash-nav__link" to="/dashboard/messages">
        {" "}
        <RiMessage2Fill className="dash-nav__link--icon" />
        Messages
      </Link>
      <Link className="dash-nav__link" to="/dashboard/setting">
        {" "}
        <ImCog className="dash-nav__link--icon" />
        Settings
      </Link>
    </div>
  );
};

export default DashboardNav;
