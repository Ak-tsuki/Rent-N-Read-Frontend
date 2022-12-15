import * as React from "react";
import "./eBookCard.scss";
import { FaTrash, FaFilePdf } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import UpdateBook from "../update_book/UpdateBook";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import { ImCross } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";

const EbookCard = ({ book }) => {
  const [view, setView] = React.useState(false);
  const handleOpen = () => setView(true);
  const handleClose = () => setView(false);
  //   const handleUpdateOpen = () => setUpdateOpen(true);
  //   const handleUpdateClose = () => setUpdateOpen(false);
  const { _id, ebookId, rent_status, payment_status, total_price } = book;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return (
    <>
      <div className="book-card">
        <img
          src={`http://localhost:90/${ebookId.book_pic}`}
          alt="book_img"
          className="book-card__img"
        />
        <div className="book-details">
          <h2 className="book-details__title">{ebookId.name}</h2>
          <p className="book-details__author">{ebookId.author}</p>
          <p className="book-details__desc">{ebookId.desc}</p>
          <p className="book-details__desc">{ebookId.category.toString()}</p>

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
            Rent Cost:{" "}
            <span className="book-details__cost--amount">
              Rs {ebookId.rent_cost_perday}
            </span>
            /day
          </p>
          <p className="book-details__cost">
            Price:{" "}
            <span className="book-details__cost--amount">
              Rs {ebookId.price}
            </span>
          </p>
          {/* <button
            className="btn-download m-2"
            // onClick={handleOpen}
            data-test="checkout-btn"
          >
            Download E-book <FaFilePdf className="ms-1 fs-5" />
          </button> */}
        </div>
      </div>
    </>
  );
};

export default EbookCard;
