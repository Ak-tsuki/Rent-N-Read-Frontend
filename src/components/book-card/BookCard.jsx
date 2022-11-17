import React from "react";
import "./bookCard.scss";
import { FaTrash, FaPenAlt } from "react-icons/fa";
const BookCard = ({ book }) => {
  const { name, author, rent_cost_perday, book_pic, desc, category, status } =
    book;
  return (
    <div className="book-card">
      <FaTrash className="book-card__delete" />
      <img
        src={`http://localhost:90/${book_pic}`}
        alt="book_img"
        className="book-card__img"
      />
      <div className="book-details">
        <h2 className="book-details__title">{name}</h2>
        <p className="book-details__author">{author}</p>
        <p className="book-details__desc">{desc}</p>
        <p className="book-details__desc">{category.toString()}</p>

        <p className="book-details__desc">
          Status:
          <span
            className={`book-details__desc  ${
              (status === "Pending" && "text-warning") ||
              (status === "Approved" && "text-success") ||
              (status === "Rejected" && "text-danger")
            }`}
          >
            {" "}
            {status}
          </span>
        </p>
        <p className="book-details__cost">
          Rent Cost:{" "}
          <span className="book-details__cost--amount">
            Rs {rent_cost_perday}
          </span>
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
