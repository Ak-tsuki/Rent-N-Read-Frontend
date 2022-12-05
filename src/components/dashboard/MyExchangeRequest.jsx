import React, { useState, useEffect } from "react";
import axios from "axios";
import RequestedExchangeCard from "../exchangebook-card/RequestedExchangeCard";

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

const MyExchangeRequest = () => {
  const [currentTab, setCurrentTab] = useState("pending");
  const [pending, setPending] = useState([]);
  const [history, setHistory] = useState([]);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  useEffect(() => {
    axios
      .get("http://localhost:90/book_owner/exchange_requests", config)
      .then((res) => {
        console.log(res.data);
        setPending(res.data.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:90/book_owner/exchange_history", config)
      .then((res) => {
        console.log(res.data);
        setHistory(res.data.data);
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
            ({pending.length})
          </span>
        </div>
        <div
          className={`tabs__tab ${
            currentTab === "history" && "tabs__tab--open"
          }`}
          onClick={() => setCurrentTab("history")}
        >
          Exchange History
        </div>
      </div>
      <div>
        {currentTab === "history"
          ? history.map((book) => <RequestedExchangeCard book={book} />)
          : pending.map((book) => <RequestedExchangeCard book={book} />)}
      </div>
    </div>
  );
};

export default MyExchangeRequest;
