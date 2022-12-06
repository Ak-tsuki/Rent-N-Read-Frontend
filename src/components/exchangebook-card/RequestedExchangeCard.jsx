import React from "react";
import "./exchangebookcard.scss";
import { FaTrash } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { TiCancel } from "react-icons/ti";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { GiReturnArrow } from "react-icons/gi";
import { colors, Typography } from "@mui/material";
import { ImCross } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const RequestedExchangeCard = ({ book }) => {
  const [view, setView] = React.useState(false);
  const handleOpen = () => setView(true);
  const handleClose = () => setView(false);

  const {
    bookId,
    bookOwnerId,
    exchangeBookId,
    exchangeStatus,
    requestedUserId,
  } = book;

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

  const style1 = {
    borderColor: "#f8f9fa",
    outline: "none",
  };

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
        const exdata = {
          bookId: bookId,
          requestedUserId: requestedUserId,
          exchangeBookId: exchangeBookId,
        };
        axios
          .put("http://localhost:90/exchange_book", exdata, config)
          .then(
            toast.success(
              "Book Exchanged Successfully",
              { toastId: "Accept success" },
              setTimeout(() => {
                window.location.reload();
              }, 1500)
            )
          )
          .catch((e) => {
            console.log(e);
          });
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
    <div className="main-div-book-cards mb-4">
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
            Exchange With: {exchangeBookId.name}
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
                onClick={handleOpen}
                data-test="btn-reject"
              >
                Reject It <TiCancel className="ms-1 fs-4" />
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <Modal
          open={view}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          data-test="reject-modal"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to reject this Exchange request?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="d-flex align-items-center ">
                <button
                  className="approve--btn"
                  onClick={(e) => {
                    rejectrequest(book._id, e);
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
      </div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>More Info About Exchanging Book</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="book-cards">
            <img
              src={`http://localhost:90/${exchangeBookId.book_pic}`}
              alt="book_img"
              className="book-card__img1"
            />
            <div className="book-details">
              <h2 className="book-details__title">{exchangeBookId.name}</h2>
              <p className="book-details__author">{exchangeBookId.author}</p>

              <p className="book-details__desc">{exchangeBookId.desc}</p>
              <p className="book-details__desc">
                {exchangeBookId.category.toString()}
              </p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default RequestedExchangeCard;
