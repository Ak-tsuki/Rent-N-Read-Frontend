import React from "react";
import "./exchangebookcard.scss";
import { FaTrash } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

import { TiCancel } from "react-icons/ti";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { GiReturnArrow } from "react-icons/gi";

const ExchangeBookCard = ({ book }) => {
  console.log("hello");
  console.log(book);

  const {
    bookId,
    bookOwnerId,
    exchangeBookId,
    exchangeStatus,
    requestedUserId,
  } = book;

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return (
    <div className="book-cards">
      <FaTrash className="book-card__delete" />
      <img
        src={`http://localhost:90/${bookId.book_pic}`}
        alt="book_img"
        className="book-card__img1"
      />
      <div className="book-details">
        <h2 className="book-details__title">{bookId.name}</h2>
        <p className="book-details__author">{bookId.author}</p>
        <p className="book-details__desc">
          Book Owner : {bookOwnerId.username}
        </p>

        <p className="book-details__desc">
          Exchanged With: {exchangeBookId.name}
        </p>
        <p className="book-details__desc">
          Status:{" "}
          <span
            className={`book-details__desc  ${
              (exchangeStatus === "Pending" && "text-warning") ||
              (exchangeStatus === "Approved" && "text-success") ||
              (exchangeStatus === "Rejected" && "text-danger")
            }`}
          >
            {exchangeStatus}
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default ExchangeBookCard;
