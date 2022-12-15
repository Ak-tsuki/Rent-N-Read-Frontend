import React, { useState, useEffect } from "react";
import { FaBook } from "react-icons/fa";
import AddBook from "../add_book/AddBook";
import BookCard from "../book-card/BookCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import Rentedbook from "../rentedBook-card/RentedBook";
import ExchangeBookCard from "../exchangebook-card/ExchangeBookCard";
import RentedEBook from "../rentedBook-card/RentedEBooks";
import EbookCard from "../ebook-card/Ebook-card";

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

const MyEBooks = () => {
  const [currentTab, setCurrentTab] = useState("bought");
  const [boughtEBooks, setBoughtEBooks] = useState([]);
  const [rentedEBooks, setRentedEBooks] = useState([]);
  const [exchangedBooks, setExchangedBooks] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  useEffect(() => {
    axios.get("http://localhost:90/bought_ebooks/get", config).then((res) => {
      console.log("boughtEBooks");
      console.log(res.data);
      setBoughtEBooks(res.data.data);
      console.log(boughtEBooks);
    });
    axios.get("http://localhost:90/rented_ebooks/get", config).then((res) => {
      console.log("rentedEBooks");
      console.log(res.data);
      setRentedEBooks(res.data.data);
      console.log(rentedEBooks);
    });
  }, []);

  return (
    <div className="mybooks-container">
      <div className="tabs">
        <div
          className={`tabs__tab ${
            currentTab === "bought" && "tabs__tab--open"
          }`}
          onClick={() => setCurrentTab("bought")}
        >
          Bought EBooks
        </div>
        <div
          className={`tabs__tab ${
            currentTab === "rented" && "tabs__tab--open"
          }`}
          onClick={() => setCurrentTab("rented")}
          data-test="rented-books-btn"
        >
          Rented EBooks
        </div>
      </div>
      <div>
        {currentTab === "bought" &&
          boughtEBooks.map((book) => <EbookCard book={book} />)}
        {currentTab === "rented" &&
          rentedEBooks.map((book) => <RentedEBook book={book} />)}
      </div>
    </div>
  );
};

export default MyEBooks;
