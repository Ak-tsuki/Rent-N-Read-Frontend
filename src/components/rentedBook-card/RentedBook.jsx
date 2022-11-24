import React from "react";
import { FaTrash } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Checkout from "../proceed_to_checkout/Checkout";
import { useState, useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const Rentedbook = ({ book }) => {
  const [open, setOpen] = React.useState(false);
  const [bookObject, setBookObject] = useState([]);
  const handleOpen = () => {
    setOpen(true);
    setBookObject(book);
  };
  const handleClose = () => {
    setOpen(false);
    setBookObject();
  };

  const {
    start_date,
    no_of_days,
    bookId,
    rent_status,
    end_date,
    payment_status,
    total_price,
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
        <p className="book-details__desc">Duration: {no_of_days} Days</p>
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
        <p className="book-details__desc">
          Payment Status:{" "}
          <span
            className={`book-details__desc  ${
              (payment_status === "Pending" && "text-warning") ||
              (payment_status === "Approved" && "text-success") ||
              (payment_status === "Rejected" && "text-danger")
            }`}
          >
            {payment_status}
          </span>{" "}
        </p>
        <p className="book-details__cost">
          Total Cost:{" "}
          <span className="book-details__cost--amount">Rs {total_price}</span>
        </p>
        <div>
          <button className="request-btn btn-accept m-2" onClick={handleOpen}>
            Proceed To Checkout <FiSend className="ms-1 fs-5" />
          </button>
        </div>
      </div>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} >
            <Checkout bookObject={bookObject}></Checkout>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Rentedbook;
