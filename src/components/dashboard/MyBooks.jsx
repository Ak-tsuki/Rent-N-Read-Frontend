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

const MyBooks = () => {
  const [currentTab, setCurrentTab] = useState("listed");
  const [listedBooks, setListedBooks] = useState([]);
  const [rentedBooks, setRentedBooks] = useState([]);
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
    axios.get("http://localhost:90/book/getbyOwner", config).then((res) => {
      console.log(res.data);
      setListedBooks(res.data.data);
      console.log(listedBooks);
    });
    axios.get("http://localhost:90/rented_books/get", config).then((res) => {
      console.log("rentedBooks");
      console.log(res.data);
      setRentedBooks(res.data.data);
      console.log(rentedBooks);
    });
    axios
      .get("http://localhost:90/user/exchange_requests", config)
      .then((res) => {
        console.log("exchaged");
        console.log(res.data);
        setExchangedBooks(res.data.data);
      });
  }, []);

  return (
    <div className="mybooks-container">
      <div className="add-book">
        {" "}
        {/* <button
          className="add-book__btn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@getbootstrap"
        >
          Add a book <FaBook />
        </button> */}
        <button
          className="add-book__btn"
          onClick={handleOpen}
          data-test="add-book-btn"
        >
          Add a book <FaBook />
        </button>
      </div>

      <div className="tabs">
        <div
          className={`tabs__tab ${
            currentTab === "listed" && "tabs__tab--open"
          }`}
          onClick={() => setCurrentTab("listed")}
        >
          Listed Books
        </div>
        <div
          className={`tabs__tab ${
            currentTab === "rented" && "tabs__tab--open"
          }`}
          onClick={() => setCurrentTab("rented")}
          data-test="rented-books-btn"
        >
          Rented Books
        </div>
        <div
          className={`tabs__tab ${
            currentTab === "exchanged" && "tabs__tab--open"
          }`}
          onClick={() => setCurrentTab("exchanged")}
          data-test="rented-books-btn"
        >
          Exchanged Books
        </div>
      </div>
      <div>
        {currentTab === "listed" &&
          listedBooks.map((book) => <BookCard book={book} />)}
        {currentTab === "rented" &&
          rentedBooks.map((book) => <Rentedbook book={book} />)}
        {currentTab === "exchanged" &&
          exchangedBooks.map((book) => <ExchangeBookCard book={book} />)}
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
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
            <AddBook></AddBook>
          </Box>
        </Modal>
      </div>
      {/* <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Book
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <AddBook></AddBook>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MyBooks;
