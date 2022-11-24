import React from "react";
import "./checkout.scss";
import Box from "@mui/material/Box";
import { FaTrash } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import { Theme, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import logo from "../../assets/khalti.svg";
import { Button } from "@mui/material";

const Checkout = ({bookObject}) => {
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
            variant="contained"
            endIcon={<img src={logo} alt="logo" className="header__logo--img bg-white rounded-2" />}
            // onClick={addBook}
          >
            Pay With Khalti 
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Checkout;
