import React from "react";
import "./books.scss";
import { BiSearch } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import ListedBookCard from "../components/listedbook-card/listedbook-card";
import { useState, useEffect } from "react";
import axios from "axios";

const Books = () => {
  const [listedBooks, setListedBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:90/book/get").then((res) => {
      console.log(res.data);
      setListedBooks(res.data.data);
    });
  }, []);

  return (
    <div className="Book-container">
      <div className="Book-list">
        {listedBooks.map((book) => (
          <ListedBookCard book={book} />
        ))}
      </div>
    </div>
  );
};

export default Books;
