import React from "react";
import "./bookCard.scss";
import { FaTrash, FaPenAlt } from "react-icons/fa";
const BookCard = ({ book }) => {
  const { title, author, cost, image, desc } = book;
  return (
    <div className="book-card">
      <FaTrash className="book-card__delete" />
      <img src={image} alt="book_img" className="book-card__img" />
      <div className="book-details">
        <h2 className="book-details__title">{title}</h2>
        <p className="book-details__author">{author}</p>
        <p className="book-details__desc">{desc}</p>
        <p className="book-details__cost">
          Rent Cost:{" "}
          <span className="book-details__cost--amount">Rs {cost}</span>
          /day
        </p>
        <div className="book-details__update">
          <button className="book-details__update--btn">
            Update details <FaPenAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
