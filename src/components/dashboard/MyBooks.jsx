import React, { useState, useEffect } from "react";
import { FaBook } from "react-icons/fa";
import "./dashboard.scss";
import AddBook from "../add_book/AddBook";
import BookCard from "../book-card/BookCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import Rentedbook from "../rentedBook-card/RentedBook";
import ExchangeBookCard from "../exchangebook-card/ExchangeBookCard";

import { styled, alpha } from "@mui/material/styles";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PendingIcon from "@mui/icons-material/Pending";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 20,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

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
  const [currentButton, setCurrentButton] = useState("all");
  const [listedBooks, setListedBooks] = useState([]);
  const [rentedBooks, setRentedBooks] = useState([]);
  const [rentedBookPending, setRentedBookPending] = useState([]);
  const [rentedBookApproved, setRentedBookApproved] = useState([]);
  const [rentedBookRejected, setRentedBookRejected] = useState([]);
  const [rentedBookReturned, setRentedBookReturned] = useState([]);
  const [exchangedBooks, setExchangedBooks] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const opened = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosed = () => {
    setAnchorEl(null);
  };
  const dropdownHandler = (tab) => {
    setAnchorEl(null);
    setCurrentButton(tab);
  };

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
      .get("http://localhost:90/rented_books/getpending", config)
      .then((res) => {
        setRentedBookPending(res.data.data);
      });
    axios
      .get("http://localhost:90/rented_books/getApproved", config)
      .then((res) => {
        setRentedBookApproved(res.data.data);
      });
    axios
      .get("http://localhost:90/rented_books/getRejected", config)
      .then((res) => {
        setRentedBookRejected(res.data.data);
      });
    axios
      .get("http://localhost:90/rented_books/getReturned", config)
      .then((res) => {
        setRentedBookReturned(res.data.data);
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
        {currentTab === "rented" && (
          <div>
            <div className="name-container">
            <Button
            className="name"
              id="demo-customized-button"
              aria-controls={opened ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={opened ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
             
            >
              View By
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={opened}
              onClose={handleClosed}
            >
              <MenuItem
                onClick={() => dropdownHandler("all")}
                disableRipple
                className={`tabs__tab ${
                  currentButton === "all" && "tabs__tab--open"
                }`}
              >
                <MenuBookIcon />
                All
              </MenuItem>
              <MenuItem
                onClick={() => dropdownHandler("pending")}
                disableRipple
                className={`tabs__tab ${
                  currentButton === "pending" && "tabs__tab--open"
                }`}
              >
                <PendingIcon />
                Pending
              </MenuItem>
              <MenuItem
                onClick={() => dropdownHandler("approved")}
                disableRipple
                className={`tabs__tab ${
                  currentButton === "approved" && "tabs__tab--open"
                }`}
              >
                <ThumbUpAltIcon />
                Approved
              </MenuItem>
              <MenuItem
                onClick={() => dropdownHandler("rejected")}
                disableRipple
                className={`tabs__tab ${
                  currentButton === "rejected" && "tabs__tab--open"
                }`}
              >
                <ThumbDownIcon />
                Rejected
              </MenuItem>
              <MenuItem
                onClick={() => dropdownHandler("returned")}
                disableRipple
                className={`tabs__tab ${
                  currentButton === "returned" && "tabs__tab--open"
                }`}
              >
                <KeyboardReturnIcon />
                Returned
              </MenuItem>
            </StyledMenu>
            </div>
            {currentButton === "all" &&
              rentedBooks.map((book) => <Rentedbook book={book} />)}
            {currentButton === "pending" &&
              rentedBookPending.map((book) => <Rentedbook book={book} />)}
            {currentButton === "approved" &&
              rentedBookApproved.map((book) => <Rentedbook book={book} />)}
            {currentButton === "rejected" &&
              rentedBookRejected.map((book) => <Rentedbook book={book} />)}
            {currentButton === "returned" &&
              rentedBookReturned.map((book) => <Rentedbook book={book} />)}
          </div>
        )}

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
