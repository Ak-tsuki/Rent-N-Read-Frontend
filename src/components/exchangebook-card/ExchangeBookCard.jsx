import React from "react";
import "./exchangebookcard.scss";
import { FaTrash } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

import { TiCancel } from "react-icons/ti";
import { colors, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { GiReturnArrow } from "react-icons/gi";
import { BsCheckLg } from "react-icons/bs";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
    <div className="main-div-book-cards mb-4">
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
            Exchange With: {exchangeBookId.name}
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
      <Accordion className="accordion">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>More Info About Exchanging Book</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="book-cards">
            <img
              src={`http://localhost:90/${exchangeBookId.book_pic}`}
              alt="book_img"
              className="book-card__img1"
            />
            <div className="book-details">
              <h2 className="book-details__title">{exchangeBookId.name}</h2>
              <p className="book-details__author">{exchangeBookId.author}</p>

              <p className="book-details__desc">{exchangeBookId.desc}</p>
              <p className="book-details__desc">
                {exchangeBookId.category.toString()}
              </p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ExchangeBookCard;
