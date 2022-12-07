import React from "react";
import "./books.scss";
import { BiSearch } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import ListedBookCard from "../components/listedbook-card/listedbook-card";
import { useState, useEffect } from "react";
import axios from "axios";

const Books = () => {
  const [listedBooks, setListedBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:90/book/get").then((res) => {
      console.log(res.data);
      setAllBooks(res.data.data);
      setListedBooks(res.data.data);
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
        />
        <button className="search__btn" type="submit">
          <BiSearch />
          Search
        </button>
      </form>
      <div className="Book-container">
        <div className="Book-list">
          {listedBooks.map((book) => (
            <ListedBookCard book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
