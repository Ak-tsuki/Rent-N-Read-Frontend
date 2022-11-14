import React from "react";
import { FaBook } from "react-icons/fa";
const MyBooks = () => {
  return (
    <div className="mybooks-container">
      <div className="add-book">
        {" "}
        <button className="add-book__btn">
          Add a book <FaBook />
        </button>
      </div>

      <div className="tabs">
        <div className="tabs__tab">Listed Books</div>
        <div className="tabs__tab">Rented Books</div>
      </div>
      <div></div>
    </div>
  );
};

export default MyBooks;
