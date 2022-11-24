import React from "react";
import { FaTrash } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

const Rentedbook = ({ book }) => {
  const {
    start_date,
    no_of_days,
    bookId,
    rent_status,
    end_date,
    payment_status,
  } = book;
  return (
    <div className="book-cards">
      <FaTrash className="book-card__delete" />
      <img
        src={`http://localhost:90/${bookId.book_pic}`}
        alt="book_img"
        className="book-card__img"
      />
      <div className="book-details">
        <h2 className="book-details__title">{bookId.name}</h2>
        <p className="book-details__author">{bookId.author}</p>
        <p className="book-details__cost">
          Rent Cost:{" "}
          <span className="book-details__cost--amount">
            Rs {bookId.rent_cost_perday}
          </span>
          /day
        </p>
        <p className="book-details__desc">Duration: {no_of_days}</p>
        <p className="book-details__desc">Start Date: {start_date}</p>
        <p className="book-details__desc">End Date: {end_date}</p>
        <p className="book-details__desc">
          Status:
          <span
            className={`book-details__desc  ${
              (rent_status === "Pending" && "text-warning") ||
              (rent_status === "Approved" && "text-success") ||
              (rent_status === "Rejected" && "text-danger")
            }`}
          >
            {" "}
            {rent_status}
          </span>
        </p>
        <p className="book-details__desc">Payment Status: {payment_status}</p>
        <div>
          <button className="request-btn btn-accept m-2" onClick={(e) => {}}>
            Proceed To Checkout <FiSend className="ms-1 fs-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rentedbook;
