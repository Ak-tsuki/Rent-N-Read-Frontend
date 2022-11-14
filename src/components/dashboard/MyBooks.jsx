import React, { useState } from "react";
import { FaBook } from "react-icons/fa";
import BookCard from "../book-card/BookCard";
const MyBooks = () => {
  const [currentTab, setCurrentTab] = useState("listed");
  return (
    <div className="mybooks-container">
      <div className="add-book">
        {" "}
        <button className="add-book__btn">
          Add a book <FaBook />
        </button>
      </div>

      <div className="tabs">
        <div
          className={`tabs__tab ${
            currentTab === "listed" && "tabs__tab--open"
          }`}
          onClick={() => setCurrentTab("listed")}
        >
          Listed Books
        </div>
        <div
          className={`tabs__tab ${
            currentTab === "rented" && "tabs__tab--open"
          }`}
          onClick={() => setCurrentTab("rented")}
        >
          Rented Books
        </div>
      </div>
      <div>
        <BookCard />
      </div>
    </div>
  );
};

export default MyBooks;
