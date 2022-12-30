import React from "react";
import "./RentedBooks.scss";
import { FaTrash } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { GiReturnArrow } from "react-icons/gi";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Checkout from "../proceed_to_checkout/Checkout";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import time from "cucumber/lib/time";
import moment from "moment";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ReviewRating from "../review_rating/ReviewRating";

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
  const [openreview, setOpenreview] = React.useState(false);
  const [bookObject, setBookObject] = useState([]);

  const handleOpen = () => {
    setOpen(true);
    setBookObject(book);
  };
  const handleClose = () => {
    setOpen(false);
    setBookObject();
  };

  const handleOpenreview = () => setOpenreview(true);
  const handleClosereview = () => setOpenreview(false);

  const {
    start_date,
    no_of_days,
    bookId,
    rent_status,
    end_date,
    payment_status,
    total_price,
  } = book;

  const reviewdata = [bookId, "book"];

  // const currentDate = new Date();

  // const config = {
  //   headers: {
  //     Authorization: "Bearer " + localStorage.getItem("token"),
  //   },
  // };

  // const returnBook = (id, e) => {
  //   e.preventDefault();
  //   const data = {
  //     id: id,

  //   };
  //   axios
  //     .put("http://localhost:90/rent/returnBook", data, config)
  //     .then((response) => {
  //       console.log(response.data.msg);
  //       toast.success(
  //         "Returned Successfully",
  //         { toastId: "Returned success" },
  //         setTimeout(() => {
  //           window.location.reload();
  //         }, 1500)
  //       );
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  return (
    <div className="book-cards">
      <FaTrash className="book-card__delete" />
      <img
        src={`http://localhost:90/${bookId.book_pic}`}
        alt="book_img"
        className="rented-book__img"
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
              (rent_status === "Pending" && "text-warning") ||
              (rent_status === "Approved" && "text-success") ||
              (rent_status === "Rejected" && "text-danger") ||
              (rent_status === "Returned" && "text-danger")
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
              (payment_status === "Paid" && "text-success") ||
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
          {rent_status !== "Approved" || payment_status === "Paid" ? (
            <div> </div>
          ) : (
            <button
              className=" btn-accept request-btn m-2"
              onClick={handleOpen}
              data-test="checkout-btn"
            >
              Proceed To Checkout <FiSend className="ms-1 fs-5" />
            </button>
          )}
        </div>
        <div>
          {payment_status === "Pending" ? (
            <button
              className=" btn-accept request-btn m-2"
              onClick={handleOpenreview}
              data-test="review-btn"
            >
              Give Review <FiSend className="ms-1 fs-5" />
            </button>
          ) : (
            <div></div>
          )}
        </div>
        {/* <div>
         
          { rent_status !== "Approved" || payment_status !== "Paid" || end_date < currentDate ? (
            <div> </div>
          ) : (
            <button
              className="btn-return request-btn m-2"
              onClick={(e) => {
                returnBook(book._id, e);
              }}
              data-test="return-btn"
            >
              Return Book <GiReturnArrow className="ms-1 fs-5" />
            </button>
          )}
        </div> */}
      </div>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Checkout bookObject={bookObject}></Checkout>
          </Box>
        </Modal>
        <Modal
          open={openreview}
          onClose={handleClosereview}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ReviewRating id={book._id} book={"Realbook"}></ReviewRating>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Rentedbook;
