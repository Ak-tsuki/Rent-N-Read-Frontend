import * as React from "react";
import "./eBookCard.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import { getFilePlugin } from "@react-pdf-viewer/get-file";
import ReviewRating from "../review_rating/ReviewRating";
import { FiSend } from "react-icons/fi";

const EbookCard = ({ book }) => {
  //   const [updateOpen, setUpdateOpen] = useState(false);
  const [view, setView] = React.useState(false);
  const handleOpen = () => setView(true);
  const handleClose = () => setView(false);

  const [viewPdf, setViewPdf] = useState("null");
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [openreview, setOpenreview] = React.useState(false);
  const handleOpenreview = () => setOpenreview(true);
  const handleClosereview = () => setOpenreview(false);

  const [reviewexist, setReviewExist] = useState(false);

  const { _id, ebookId, rent_status, payment_status, total_price } = book;
  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90vh",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  useEffect(() => {
    console.log(ebookId._id);
    axios
      .get("http://localhost:90/check/reviewexist/" + ebookId._id, config)
      .then((res) => {
        console.log(res.data);
        setReviewExist(res.data.success);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onButtonClick = () => {
    // using Java Script method to get PDF file
    fetch(`http://localhost:90/${ebookId.e_book}`).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = ebookId.e_book;
        alink.click();
      });
    });
  };

  return (
    <>
      <div className="book-card">
        <img
          src={`http://localhost:90/${ebookId.book_pic}`}
          alt="book_img"
          className="book-card__img"
        />
        <div className="book-details">
          <h2 className="book-details__title">{ebookId.name}</h2>
          <p className="book-details__author">{ebookId.author}</p>
          <p className="book-details__desc">{ebookId.desc}</p>
          <p className="book-details__desc">{ebookId.category.toString()}</p>

          <p className="book-details__desc">
            Payment Status:{" "}
            <span
              className={`book-details__desc  ${
                (payment_status === "Pending" && "text-warning") ||
                (payment_status === "Paid" && "text-success") ||
                (payment_status === "Rejected" && "text-danger")
              }`}
            >
              {payment_status}
            </span>{" "}
          </p>
          <p className="book-details__cost">
            Rent Cost:{" "}
            <span className="book-details__cost--amount">
              Rs {ebookId.rent_cost_perday}
            </span>
            /day
          </p>
          <p className="book-details__cost">
            Price:{" "}
            <span className="book-details__cost--amount">
              Rs {ebookId.price}
            </span>
          </p>
          <button
            className="btn-download  m-2"
            onClick={onButtonClick}
            data-test="rent-btn"
          >
            Download Pdf
            <FaDownload className="ms-1 fs-5" />
          </button>
          <button
            className="btn-view  m-2"
            onClick={handleOpen}
            data-test="rent-btn"
          >
            View Pdf
            <AiFillEye className="ms-1 fs-5" />
          </button>
          {!reviewexist ? (
            <button
              className=" btn-review request-btn m-2"
              onClick={handleOpenreview}
              data-test="checkout-btn"
            >
              Give Review <FiSend className="ms-1 fs-5" />
            </button>
          ) : (
            <div></div>
          )}

          <Modal
            open={openreview}
            onClose={handleClosereview}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <ReviewRating id={book.ebookId} book={"ebook"}></ReviewRating>
            </Box>
          </Modal>
        </div>
        <Modal
          open={view}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

          // onSubmit={handlePdfFileSubmit}
        >
          <div className="pdf-container">
            <Box sx={style1}>
              {viewPdf && (
                <>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
                    <Viewer
                      fileUrl={`http://localhost:90/${ebookId.e_book}`}
                      plugins={[defaultLayoutPluginInstance]}
                    />
                  </Worker>
                </>
              )}
            </Box>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default EbookCard;
