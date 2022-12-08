import React from "react";
import "./books.scss";
import { BiSearch } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import ListedBookCard from "../components/listedbook-card/listedbook-card";
import { useState, useEffect } from "react";
import axios from "axios";
import notfound from "../assets/notfound.svg";
const Books = () => {
  const [listedBooks, setListedBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [audioBooks, setAudioBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:90/book/get").then((res) => {
      console.log(res.data);
      setAllBooks(res.data.data);
      setListedBooks(res.data.data);
    });

    axios
      .get("http://localhost:90/audiobook/get")
      .then((res) => {
        console.log(res.data);
        setAudioBooks(res.data.data);
        console.log(audioBooks);
      });
  }, []);

  const searchBooks = (e) => {
    e.preventDefault();
    console.log(searchQuery);

    const searchResult = allBooks.filter(
      (book) =>
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setListedBooks(searchResult);

    if (searchQuery === "") {
      setListedBooks(allBooks);
    }
  };

  return (
    <div>
      {" "}
      <form className="search" onSubmit={searchBooks}>
        <input
          type="text"
          className="search__input"
          placeholder="Enter book name, author....."
          onChange={(e) => setSearchQuery(e.target.value)}
          data-test="search-query"
        />
        <button className="search__btn" type="submit" data-test="search-btn">
          <BiSearch />
          Search
        </button>
      </form>
      <div className="Book-container">
        <div className="Book-list">
          {listedBooks.length ? (
            listedBooks.map((book) => (
              <ListedBookCard book={book} data-test="search-result" />
            ))
          ) : (
            <img
              src={notfound}
              alt="not_found"
              className="not-found-img"
              data-test="not-found"
            />
          )}
        </div>
      </div>
      <section className="Book-container">
        <div className="heading2">
          <h4 className="ms-2">Audio Books</h4>
        </div>
        <div className="Book-list">
          {audioBooks.slice(0, 12).map((book) => (
            <ListedBookCard book={book} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Books;
