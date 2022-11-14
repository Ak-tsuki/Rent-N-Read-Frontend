import React from "react";
import { Link } from "react-router-dom";
import { ImBooks, ImCog } from "react-icons/im";
import { GiOpenBook } from "react-icons/gi";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { GiSpeaker } from "react-icons/gi";
import { RiExchangeBoxFill, RiMessage2Fill } from "react-icons/ri";
import "./dashboard.scss";
const DashboardNav = () => {
  return (
    <div className="dash-nav">
      <div className="dash-nav__profile">
        <img
          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="profile_img"
          className="dash-nav__profile--img"
        />
        <p className="dash-nav__profile--username">Username</p>
      </div>
      <Link className="dash-nav__link">
        {" "}
        <ImBooks size={30} />
        My Books
      </Link>
      <Link className="dash-nav__link">
        {" "}
        <GiOpenBook size={30} />
        Rent Requests
      </Link>
      <Link className="dash-nav__link">
        {" "}
        <RiExchangeBoxFill size={30} />
        Exchange Requests
      </Link>
      <Link className="dash-nav__link">
        {" "}
        <BsFillFileEarmarkPdfFill size={30} />
        E-books
      </Link>
      <Link className="dash-nav__link">
        {" "}
        <GiSpeaker size={30} />
        Audio Books
      </Link>
      <br />
      <div className="divider"></div>
      <br />
      <Link className="dash-nav__link">
        {" "}
        <RiMessage2Fill size={30} />
        Emails and Messages
      </Link>
      <Link className="dash-nav__link">
        {" "}
        <ImCog size={30} />
        Settings
      </Link>
    </div>
  );
};

export default DashboardNav;
