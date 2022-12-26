import React, { useState, useEffect } from "react";
import "./dashboard.scss";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import Rentedbook from "../rentedBook-card/RentedBook";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import RentedEBook from "../rentedBook-card/RentedEBooks";
import EbookCard from "../ebook-card/Ebook-card";
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

const MyEBooks = () => {
  const [currentTab, setCurrentTab] = useState("bought");
  const [currentButton, setCurrentButton] = useState("all");
  const [rentedEBookPending, setRentedEBookPending] = useState([]);
  const [rentedEBookApproved, setRentedEBookApproved] = useState([]);
  const [rentedEBookReading, setRentedEBookReading] = useState([]);
  const [rentedEBookReturned, setRentedEBookReturned] = useState([]);
  const [boughtEBooks, setBoughtEBooks] = useState([]);
  const [rentedEBooks, setRentedEBooks] = useState([]);
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
    axios
      .get("http://localhost:90/rented_ebooks/getReading", config)
      .then((res) => {
        setRentedEBookReading(res.data.data);
      });
    axios
      .get("http://localhost:90/rented_ebooks/getPending", config)
      .then((res) => {
        setRentedEBookPending(res.data.data);
      });
    axios
      .get("http://localhost:90/rented_ebooks/getReturned", config)
      .then((res) => {
        setRentedEBookReturned(res.data.data);
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
                  Payment Pending
                </MenuItem>
                <MenuItem
                  onClick={() => dropdownHandler("reading")}
                  disableRipple
                  className={`tabs__tab ${
                    currentButton === "reading" && "tabs__tab--open"
                  }`}
                >
                  <AutoStoriesIcon />
                  Reading
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
              rentedEBooks.map((book) => <RentedEBook book={book} />)}
            {currentButton === "pending" &&
              rentedEBookPending.map((book) => <RentedEBook book={book} />)}
            {currentButton === "approved" &&
              rentedEBookApproved.map((book) => <RentedEBook book={book} />)}
            {currentButton === "reading" &&
              rentedEBookReading.map((book) => <RentedEBook book={book} />)}
            {currentButton === "returned" &&
              rentedEBookReturned.map((book) => <RentedEBook book={book} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEBooks;
