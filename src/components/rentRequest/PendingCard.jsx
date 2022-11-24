import React from "react";
import "./PendingCard.scss";
import { FaTrash } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

import { TiCancel } from "react-icons/ti";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PendingCard = ({ book }) => {
  console.log(book)
  
  const { start_date, no_of_days, bookId, rent_status, userId } = book;
  
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
      .put("http://localhost:90/rent/approve", data, config)
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
      .put("http://localhost:90/rent/reject", data, config)
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
      <FaTrash className="book-card__delete" />
      <img
        src={`http://localhost:90/${bookId.book_pic}`}
        alt="book_img"
        className="book-card__img"
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
        <p className="book-details__desc">Duration: {no_of_days}</p>
        <p className="book-details__desc">Start Date: {start_date}</p>
        <p className="book-details__desc">
          Status:
          <span
            className={`book-details__desc  ${
              (rent_status === "Pending" && "text-warning") ||
              (rent_status === "Approved" && "text-success") ||
              (rent_status === "Rejected" && "text-danger")
            }`}
          >
            {" "}
            {rent_status}
          </span>
        </p>
        <p className="book-details__desc">Requested by: {userId.username}</p>
        <div>
          <button className="request-btn btn-accept m-2" 
          onClick={(e) => {
                approveRequest(book._id, e);
              }}
              >
            Accept It <FiSend className="ms-1 fs-5" />
          </button>
          <button className="request-btn btn-reject m-2" onClick={(e) => {
                rejectrequest(book._id, e);
              }}>
            Reject It <TiCancel className="ms-1 fs-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingCard;
