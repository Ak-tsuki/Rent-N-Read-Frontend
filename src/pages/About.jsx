import React from "react";
import aboutus from "../assets/aboutus.svg";
import logo from "../assets/logo.svg";
import "./about.scss";
const About = () => {
  return (
    <div className="about">
      <img src={aboutus} alt="about_img" className="about__img" />
      <div className="about__details">
        <h1 className="about__heading">About Us</h1>
        <p className="about__text">
          Rent N` Read is a website that provides service for renting and
          exchanging books. This platform is created to assist users in lending
          or borrowing books.Renting books is handy for students and book
          enthusiasts on a limited budget who wish to spend their money on
          books.
        </p>
        <span className="about__aim">
          Our aim is to assist users by offering a trustworthy, convenient
          option to rent or exchange books at a reasonable cost.
        </span>
      </div>
    </div>
  );
};

export default About;
