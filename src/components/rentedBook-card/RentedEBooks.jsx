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
import KhaltiCheckout from "khalti-checkout-web";

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

const RentedEBook = ({ book }) => {

  const {
    _id,
    start_date,
    no_of_days,
    ebookId,
    rent_status,
    end_date,
    payment_status,
    total_price,
  } = book;

  const myKey = {
    publicTestKey: "test_public_key_b4f2f58210d24adeb3a09f18004822b6",
    secretKey: "test_secret_key_5eb022defe114eee80231588f185e8c4",
  };

  const config = {
    // replace the publicKey with yours
    publicKey: myKey.publicTestKey,
    productIdentity: _id,
    productName: ebookId.name,
    productUrl: "http://localhost:3000/",
    paymentPreference: ["KHALTI"],
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log(payload);
        const data = {
          token: payload.token,
          amount: payload.amount,
        };

        const config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };

        axios
          .get(
            `http://localhost:90/payment/khalti/verification/${data.token}/${data.amount}/${myKey.secretKey}`
          )
          .then((response) => {
            console.log(response.data);
            const data2 = {
                id: _id,
            };
            axios
              .put("http://localhost:90/rentEbook/paymentPaid", data2, config)
              .then((response) => {
                console.log(response.data.msg);
                toast.success(
                  "Payment Successfully",
                  setTimeout(() => {
                    window.location.reload();
                  }, 1500)
                );
              })
              .catch((e) => {
                console.log(e);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      onError(error) {
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
  };

  const checkout = new KhaltiCheckout(config);


  return (
    <div className="book-cards">
      <FaTrash className="book-card__delete" />
      <img
        src={`http://localhost:90/${ebookId.book_pic}`}
        alt="book_img"
        className="rented-book__img"
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
              (rent_status === "Approved" && "text-success") ||
              (rent_status === "Reading" && "text-success") ||
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
              onClick={() => checkout.show({ amount: total_price * 100 })}
              data-test="checkout-btn"
            >
              Make Payment<FiSend className="ms-1 fs-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentedEBook;
