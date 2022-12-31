import * as React from "react";
import "./myaudiobook.scss";
import { FaCloudDownloadAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import { ImCross } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";
import { FaTrash, FaPenAlt } from "react-icons/fa";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import moment from "moment";
import ReactAudioPlayer from "react-audio-player";
import { FiSend } from "react-icons/fi";
import ReviewRating from "../review_rating/ReviewRating";

const AudioBookCard = ({ book }) => {
  const [openreview, setOpenreview] = React.useState(false);
  const handleOpenreview = () => setOpenreview(true);
  const handleClosereview = () => setOpenreview(false);

  const { bought_date, payment_status, audiobookId, _id } = book;
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
  const boughtdate = moment(bought_date).format("MMMM Do YYYY");

  const [view, setView] = React.useState(false);
  const handleOpen = () => setView(true);
  const handleClose = () => setView(false);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const deleteAudioBook = () => {
    // e.preventDefault();
    // const data ={
    //   _id:id
    // }
    console.log(_id);
    axios
      .delete("http://localhost:90/boughtaudiobook/delete/" + _id, config)
      .then((result) => {
        console.log(result);
        if (result.data.success) {
          console.log("Audio Book Deleted Successfull");
          toast.success(
            "Audio Book Deleted Successfully",
            { toastId: "Delete Success" },
            setTimeout(() => {
              window.location.reload();
            }, 1500)
          );
        } else {
          console.log("Please Try Again!!!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onButtonClick = () => {
    fetch(`http://localhost:90/${audiobookId.audio_book}`).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);

        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = audiobookId.audio_book;
        alink.click();
      });
    });
  };

  return (
    <>
      <div className="book-card">
        <FaTrash
          className="book-card__delete"
          onClick={handleOpen}
          data-test="delete-book-btn"
        />
        <Modal
          open={view}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          data-test="delete-modal"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete this Audio book?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="d-flex align-items-center ">
                <button
                  className="approve--btn"
                  onClick={(e) => {
                    deleteAudioBook(_id, e);
                  }}
                  data-test="yes-btn"
                >
                  Yes &nbsp; <BsCheckLg />
                </button>
                <button onClick={handleClose} className="reject--btn ">
                  No &nbsp; <ImCross />
                </button>
              </div>
            </Typography>
          </Box>
        </Modal>
        <img
          src={`http://localhost:90/${audiobookId.book_pic}`}
          alt="book_img"
          className="book-card__img"
        />
        <div className="book-details">
          <h2 className="book-details__title">{audiobookId.name}</h2>
          <p className="book-details__author">{audiobookId.author}</p>
          <p className="book-details__desc">{audiobookId.desc}</p>
          <p className="book-details__desc">{boughtdate}</p>

          <p className="book-details__desc">
            Payment Status:
            <span
              className={`book-details__desc  ${
                (payment_status === "Pending" && "text-warning") ||
                (payment_status === "Approved" && "text-success") ||
                (payment_status === "Rejected" && "text-danger") ||
                (payment_status === "Paid" && "text-success")
              }`}
            >
              {" "}
              {payment_status}
            </span>
          </p>
          <p className="book-details__cost">
            Total Cost:{" "}
            <span className="book-details__cost--amount">
              Rs {audiobookId.price}
            </span>
          </p>
          <p className="book-details__desc">
            {
              <ReactAudioPlayer
                src={`http://localhost:90/${audiobookId.audio_book}`}
                controls
              />
            }
          </p>
          <div className="book-details__update">
            <button
              className="book-details__update--btn"
              onClick={onButtonClick}
              data-test="update-details-btn"
            >
              Download <FaCloudDownloadAlt />
            </button>
            <button
              className=" btn-accept request-btn m-2"
              onClick={handleOpenreview}
              data-test="checkout-btn"
            >
              Give Review <FiSend className="ms-1 fs-5" />
            </button>
            <Modal
              open={openreview}
              onClose={handleClosereview}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <ReviewRating
                  id={book.audiobookId}
                  book={"audiobook"}
                ></ReviewRating>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioBookCard;
