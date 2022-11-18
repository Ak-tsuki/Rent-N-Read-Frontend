import React from "react";
import "./home.scss";
import { BiSearch } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <form className="search">
          <input
            type="text"
            className="search__input"
            placeholder="Enter book name, author....."
          />
          <button className="search__btn">
            <BiSearch />
            Search
          </button>
        </form>
        <h2 className="hero__text">
          A book worm’s paradise <br />{" "}
          <span className="hero__text--red"> RENT</span> &{" "}
          <span className="hero__text--green">EXCHANGE</span>
        </h2>
        <button className="hero__btn">
          List Books for Rent <FaBook />
        </button>
      </section>
    </div>
  );
};

export default Home;
