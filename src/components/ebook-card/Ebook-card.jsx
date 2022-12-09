import * as React from "react";
import "./eBookCard.scss";
import { FaTrash, FaPenAlt } from "react-icons/fa";
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
  //   const [updateOpen, setUpdateOpen] = useState(false);
  const [view, setView] = React.useState(false);
  const handleOpen = () => setView(true);
  const handleClose = () => setView(false);
  //   const handleUpdateOpen = () => setUpdateOpen(true);
  //   const handleUpdateClose = () => setUpdateOpen(false);
  const {
    name,
    author,
    rent_cost_perday,
    book_pic,
    desc,
    category,
    status,
    _id,
    price,
  } = book;
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
        <FaTrash
          className="book-card__delete"
          onClick={handleOpen}
          data-test="delete-book-btn"
        />

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
          <p className="book-details__cost">
            Price:{" "}
            <span className="book-details__cost--amount">Rs {price}</span>
          </p>
          <button
            className=" book-details__update--btn m-2"
            // onClick={handleOpen}
            data-test="checkout-btn"
          >
            Buy E-book <BsCashCoin className="ms-1 fs-5" />
          </button>
          <div className="book-details__update">
            <button
              className="book-details__update--btn"
              //   onClick={handleUpdateOpen}
              data-test="update-details-btn"
            >
              Update details <FaPenAlt />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EbookCard;
