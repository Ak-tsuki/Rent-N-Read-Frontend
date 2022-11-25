import React, { useState, useEffect } from "react";
import "./checkout.scss";
import Box from "@mui/material/Box";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/khalti.svg";
import { Button } from "@mui/material";
import axios from "axios";
import KhaltiCheckout from "khalti-checkout-web";
import { toast } from "react-toastify";

const Checkout = ({ bookObject }) => {
  const {
    start_date,
    no_of_days,
    bookId,
    rent_status,
    end_date,
    payment_status,
    total_price,
    _id,
  } = bookObject;

  const myKey = {
    publicTestKey: "test_public_key_b4f2f58210d24adeb3a09f18004822b6",
    secretKey: "test_secret_key_5eb022defe114eee80231588f185e8c4",
  };

  const config = {
    // replace the publicKey with yours
    publicKey: myKey.publicTestKey,
    productIdentity: _id,
    productName: bookId.name,
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
              .put("http://localhost:90/rent/paymentPaid", data2, config)
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
    <div>
      <div className="form-title row justify-content-center mb-2 p-2">
        <h2 className="text-center m-0">Checkout Process</h2>
      </div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 0, pb: 2 },
          // width: 762,
          maxWidth: "100%",
        }}
        noValidate
        autoComplete="off"
      >
        <div className="rent-card">
          {/* <FaTrash className="book-card__delete" /> */}
          <img
            src={`http://localhost:90/${bookId.book_pic}`}
            alt="book_img"
            className="rent-card__img"
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
              <span className="book-details__cost--amount">
                Rs {total_price}
              </span>
            </p>
          </div>
        </div>
        <div className="row">
          <Button
            className="mt-2 fs-5 fw-bold"
            style={{
              backgroundColor: "#5B2C92",
            }}
            variant="contained"
            endIcon={
              <img src={logo} alt="logo" className="header__logo--img" />
            }
            onClick={() => checkout.show({ amount: total_price * 100 })}
          >
            Pay With
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Checkout;
