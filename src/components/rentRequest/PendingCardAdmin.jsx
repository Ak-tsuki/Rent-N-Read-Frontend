import React from "react";
import "./PendingCard.scss";
import { FaTrash } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

import { TiCancel } from "react-icons/ti";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { GiReturnArrow } from "react-icons/gi";

const PendingCardAdmin = ({ book }) => {
  console.log(book);

  const {
    start_date,
    no_of_days,
    ebookId,
    rent_status,
    userId,
    payment_status,
    end_date,
    total_price
  } = book;

  const endDate = moment(end_date).format("MMMM Do YYYY");
  const currentDate = moment(Date.createdAt).format("MMMM Do YYYY");
  console.log(currentDate);
  console.log(endDate);

  return (
    <div className="book-cards">
      <FaTrash className="book-card__delete" />
      <img
        src={`http://localhost:90/${ebookId.book_pic}`}
        alt="book_img"
        className="book-card__img1"
      />
      <div className="book-details">
        <h2 className="book-details__title">{ebookId.name}</h2>
        <p className="book-details__author">{ebookId.author}</p>
        <p className="book-details__cost">
          Rent Cost:{" "}
          <span className="book-details__cost--amount">
            Rs {ebookId.rent_cost_perday}
          </span>
          /day
        </p>
        <p className="book-details__desc">Duration: {no_of_days}</p>
        <p className="book-details__desc">
          Start Date: {moment(start_date).format("MMMM Do YYYY")}
        </p>
        <p className="book-details__desc">
          End Date: {moment(end_date).format("MMMM Do YYYY")}
        </p>
        <p className="book-details__desc">
          Status:
          <span
            className={`book-details__desc  ${
              (rent_status === "Approved" && "text-success") ||
              (rent_status === "Reading" && "text-success") ||
              (rent_status === "Rejected" && "text-danger")
            }`}
          >
            {" "}
            {rent_status}
          </span>
        </p>
        <p className="book-details__desc">Requested by: {userId.username}</p>
        <p className="book-details__desc">
          Payment Status:{" "}
          <span
            className={`book-details__desc  ${
              (payment_status === "Pending" && "text-warning") ||
              (payment_status === "Paid" && "text-success") ||
              (payment_status === "Rejected" && "text-danger")
            }`}
          >
            {payment_status}
          </span>{" "}
        </p>
        <p className="book-details__cost">
          Total Price:{" "}
          <span className="book-details__cost--amount">
            Rs {total_price}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PendingCardAdmin;
