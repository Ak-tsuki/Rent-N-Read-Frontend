import React from "react";
import "./exchangebookcard.scss";
import { FaTrash } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

import { TiCancel } from "react-icons/ti";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { GiReturnArrow } from "react-icons/gi";

const RequestedExchangeCard = ({ book }) => {
  console.log(book);

  const {
    bookId,
    bookOwnerId,
    exchangeBookId,
    exchangeStatus,
    requestedUserId,
  } = book;

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const approveRequest = (id, e) => {
    e.preventDefault();
    const data = {
      id: id,
    };
    axios
      .put("http://localhost:90/exchange/approve", data, config)
      .then((response) => {
        console.log(response.data.msg);
        toast.success(
          "Approved Successfully",
          { toastId: "Approve success" },
          setTimeout(() => {
            window.location.reload();
          }, 1500)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const rejectrequest = (id, e) => {
    e.preventDefault();
    const data = {
      id: id,
    };
    axios
      .put("http://localhost:90/exchange/reject", data, config)
      .then((response) => {
        console.log(response.data.msg);
        toast.warn(
          "Rejected Successfully",
          { toastId: "Reject success" },
          setTimeout(() => {
            window.location.reload();
          }, 1500)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="book-cards">
      <img
        src={`http://localhost:90/${bookId.book_pic}`}
        alt="book_img"
        className="book-card__img1"
      />
      <div className="book-details">
        <h2 className="book-details__title">{bookId.name}</h2>
        <p className="book-details__author">{bookId.author}</p>

        <p className="book-details__desc">
          Exchanged With: {exchangeBookId.name}
        </p>

        <p className="book-details__desc">
          Status:{" "}
          <span
            className={`book-details__desc  ${
              (exchangeStatus === "Pending" && "text-warning") ||
              (exchangeStatus === "Approved" && "text-success") ||
              (exchangeStatus === "Rejected" && "text-danger")
            }`}
          >
            {exchangeStatus}
          </span>{" "}
        </p>
        <p className="book-details__desc">
          Requested by: {requestedUserId.username}
        </p>

        {exchangeStatus === "Pending" ? (
          <div>
            <button
              className="btn btn-success m-2"
              onClick={(e) => {
                approveRequest(book._id, e);
              }}
              data-test="btn-accept"
            >
              Accept It <FiSend className="ms-1 fs-5" />
            </button>
            <button
              className="btn btn-danger m-2"
              onClick={(e) => {
                rejectrequest(book._id, e);
              }}
              data-test="btn-reject"
            >
              Reject It <TiCancel className="ms-1 fs-4" />
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default RequestedExchangeCard;
