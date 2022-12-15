import React from "react";
import "./RentedBooks.scss";
import { FaFilePdf, FaTrash } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import KhaltiCheckout from "khalti-checkout-web";
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { ToolbarSlot, TransformToolbarSlot } from "@react-pdf-viewer/toolbar";

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

const RentedEBook = ({ book }) => {
  const handleOpen1 = () => setSee(true);
  const handleClose1 = () => setSee(false);
  const [pdfFile, setPDFFile] = useState("null");
  const [viewPdf, setViewPdf] = useState("null");
  const [see, setSee] = React.useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

  const {
    _id,
    start_date,
    no_of_days,
    ebookId,
    rent_status,
    end_date,
    payment_status,
    total_price,
  } = book;

  const myKey = {
    publicTestKey: "test_public_key_b4f2f58210d24adeb3a09f18004822b6",
    secretKey: "test_secret_key_5eb022defe114eee80231588f185e8c4",
  };

  const config = {
    // replace the publicKey with yours
    publicKey: myKey.publicTestKey,
    productIdentity: _id,
    productName: ebookId.name,
    productUrl: "http://localhost:3000/",
    paymentPreference: ["KHALTI"],
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log(payload);
        const data = {
          token: payload.token,
          amount: payload.amount,
        };

        const config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };

        axios
          .get(
            `http://localhost:90/payment/khalti/verification/${data.token}/${data.amount}/${myKey.secretKey}`
          )
          .then((response) => {
            console.log(response.data);
            const data2 = {
              id: _id,
            };
            axios
              .put("http://localhost:90/rentEbook/paymentPaid", data2, config)
              .then((response) => {
                console.log(response.data.msg);
                toast.success(
                  "Payment Successfully",
                  setTimeout(() => {
                    window.location.reload();
                  }, 1500)
                );
              })
              .catch((e) => {
                console.log(e);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      onError(error) {
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
  };

  const checkout = new KhaltiCheckout(config);

  return (
    <div className="book-cards">
      <FaTrash className="book-card__delete" />
      <img
        src={`http://localhost:90/${ebookId.book_pic}`}
        alt="book_img"
        className="rented-book__img"
      />
      <div className="book-details">
        <h2 className="book-details__title">{ebookId.name}</h2>
        <p className="book-details__author">{ebookId.author}</p>
        <p className="book-details__cost">
          Rent Cost:{" "}
          <span className="book-details__cost--amount">
            Rs {ebookId.rent_cost_perday}
          </span>
          /day
        </p>
        <p className="book-details__desc">Duration: {no_of_days} Days</p>
        <p className="book-details__desc">
          Start Date: {moment(start_date).format("MMMM Do YYYY")}
        </p>
        <p className="book-details__desc">
          End Date: {moment(end_date).format("MMMM Do YYYY")}
        </p>
        <p className="book-details__desc">
          Status:
          <span
            className={`book-details__desc  ${
              (rent_status === "Approved" && "text-success") ||
              (rent_status === "Reading" && "text-success") ||
              (rent_status === "Returned" && "text-danger")
            }`}
          >
            {" "}
            {rent_status}
          </span>
        </p>
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
          Total Cost:{" "}
          <span className="book-details__cost--amount">Rs {total_price}</span>
        </p>

        <div>
          {rent_status !== "Approved" || payment_status === "Paid" ? (
            <div> </div>
          ) : (
            <button
              className=" btn-accept request-btn m-2"
              onClick={() => checkout.show({ amount: total_price * 100 })}
              data-test="checkout-btn"
            >
              Make Payment
              <FiSend className="ms-1 fs-5" />
            </button>
          )}
        </div>
        <div>
          {rent_status === "Reading" || payment_status === "Paid" ? (
            <div>
              <button class="btn-accept request-btn m-2" onClick={handleOpen1}>
                Read Book
                <FaFilePdf size={20} />
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <Modal
          open={see}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="pdf-container">
            <Box sx={style1}>
              {viewPdf && (
                <>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
                    <Viewer
                      fileUrl={`http://localhost:90/${ebookId.e_book}`}
                      defaultScale={SpecialZoomLevel.PageFit}
                      plugins={[toolbarPluginInstance]}
                    />
                  </Worker>
                </>
              )}
              {!viewPdf && <>No pdf file selected</>}
            </Box>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default RentedEBook;
