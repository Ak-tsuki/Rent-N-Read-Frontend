import React from "react";
import "./home.scss";
import { BiSearch } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import ListedBookCard from "../components/listedbook-card/listedbook-card";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [listedBooks, setListedBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:90/book/get").then((res) => {
      console.log(res.data);
      setListedBooks(res.data.data);
    });
  }, []);

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
      {localStorage.getItem("token") ? (
        <>
          <section className="listedBook-container">
            <div className="heading2">
              <h4 className="ms-2">Recommended Books</h4>
            </div>
            <div className="listedBook">
              {listedBooks.slice(0, 5).map((book) => (
                <ListedBookCard book={book} />
              ))}
            </div>
          </section>
          <section className="listedBook-container">
            <div className="heading2">
              <h4 className="ms-2">Newly Listed</h4>
            </div>
            <div className="listedBook">
              {listedBooks.slice(0, 10).map((book) => (
                <ListedBookCard book={book} />
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="listedBook-container">
          <div className="heading2">
            <h4 className="ms-2">Newly Listed</h4>
          </div>
          <div className="listedBook">
            {listedBooks.slice(0, 10).map((book) => (
              <ListedBookCard book={book} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
