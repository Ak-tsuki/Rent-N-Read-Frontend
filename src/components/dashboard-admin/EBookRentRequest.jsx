import React, { useState, useEffect } from "react";
import { FaBook } from "react-icons/fa";
import AddBook from "../add_book/AddBook";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import PendingCard from "../rentRequest/PendingCard";
import PendingCardAdmin from "../rentRequest/PendingCardAdmin";

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

const EBookRentRequest = () => {
  const [currentTab, setCurrentTab] = useState("pending");
  const [pending, setPending] = useState([]);
  const [requestList, setRequestList] = useState([]);
  

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  useEffect(() => {
    axios.get("http://localhost:90/rentEbook/get", config).then((res) => {
      console.log(res.data);
      setPending(res.data.data);
      console.log(pending);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:90/rentEbook/getHistory", config).then((res) => {
      console.log(res.data);
      setRequestList(res.data.data);
      console.log(requestList);
    });
  }, []);


  return (
    <div className="mybooks-container">
      <div className="tabs">
        <div
          className={`tabs__tab ${
            currentTab === "pending" && "tabs__tab--open"
          }`}
          onClick={() => setCurrentTab("pending")}
        >
          Pending Request: 
          <span
            className={`book-details__desc  ${
              (pending.length === 0 && "text-success") ||
              (pending.length !== 0 && "text-danger")

            }`}
          >
            {" "}
            ({pending.length})
          </span>
        </div>
        <div
          className={`tabs__tab ${
            currentTab === "all_request" && "tabs__tab--open"
          }`}
          onClick={() => setCurrentTab("all_request")}
        >
          Requests History
        </div>
      </div>
      <div>
        {currentTab === "all_request"
          ? requestList.map((book) => <PendingCardAdmin book={book} />)
          : pending.map((book) => <PendingCardAdmin book={book} />)}
      </div>
    </div>
  );
};

export default EBookRentRequest;
