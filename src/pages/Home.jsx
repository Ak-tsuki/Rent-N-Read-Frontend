import React from "react";
import "./home.scss";
import { BiSearch } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import ListedBookCard from "../components/listedbook-card/listedbook-card";

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
      <section className="listedBook-container">
        <div className="heading2">
          <h4 className="ms-2">Newly Listed</h4>
        </div>
        <div className="listedBook">
          <ListedBookCard></ListedBookCard>
          <ListedBookCard></ListedBookCard>
          <ListedBookCard></ListedBookCard>
          <ListedBookCard></ListedBookCard>
          <ListedBookCard></ListedBookCard>
          <ListedBookCard></ListedBookCard>
          <ListedBookCard></ListedBookCard>
          <ListedBookCard></ListedBookCard>
        </div>
      </section>
    </div>
  );
};

export default Home;
