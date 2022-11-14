import React from "react";
import "./bookCard.scss";
import { FaTrash, FaPenAlt } from "react-icons/fa";
const BookCard = () => {
  return (
    <div className="book-card">
      <FaTrash className="book-card__delete" />
      <img
        src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1593147230l/48946798.jpg"
        alt="book_img"
        className="book-card__img"
      />
      <div className="book-details">
        <h2 className="book-details__title">Anya and the Nightingale</h2>
        <p className="book-details__author">Sofiya Pasternack</p>
        <p className="book-details__desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis cras
          pulvinar ultrices id nisl ornare nisi. Nisi, morbi consectetur nibh
          dapibus maecenas elementum id nec. Velit vitae tellus ac feugiat non
          ridiculus.
        </p>
        <p className="book-details__cost">
          Rent Cost: <span className="book-details__cost--amount">Rs 30</span>
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
