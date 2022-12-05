import React from "react";
import "./singleBook.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { FaChevronCircleRight } from "react-icons/fa";
import { RiExchangeFill } from "react-icons/ri";
import Modal from "@mui/material/Modal";
import RentBook from "../components/rent_book/RentBook";
import ExchangeBook from "../components/exchange_book/ExchangeBook";

import Box from "@mui/material/Box";

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

const SingleBook = () => {
  const [openRent, setOpenRent] = React.useState(false);
  const handleOpenRent = () => setOpenRent(true);
  const handleCloseRent = () => setOpenRent(false);

  const [openExchange, setOpenExchange] = React.useState(false);
  const handleOpenExchange = () => setOpenExchange(true);
  const handleCloseExchange = () => setOpenExchange(false);

  const { book_id } = useParams();

  const [book_img, setBookImg] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [owner_img, setOwnerImg] = useState("");
  const [bookowner, setBookOwner] = useState("");

  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState("");

  useEffect(() => {
    axios.get("http://localhost:90/book/getone/" + book_id).then((res) => {
      console.log(res.data);
      setBookImg(res.data.data.book_pic);
      setBookOwner(res.data.data.bookOwner);
      setName(res.data.data.name);
      setAuthor(res.data.data.author);
      setDesc(res.data.data.rich_desc);
      setCost(res.data.data.rent_cost_perday);
    });
  }, []);

  return (
    <div className="Book-container">
      <div className="row">
        <div className="col-12 col-md-4 d-flex justify-content-center">
          <div className="book-cover">
            <img
              src={`http://localhost:90/${book_img}`}
              className="img-book"
              alt="..."
            />
            <button className="wishlist-btn my-4">
              Add to wishlist <BsBookmarkPlusFill className="ms-1 fs-4" />
            </button>
          </div>
        </div>
        <div className="col-12 col-md-8  ">
          <div className="book-detail">
            <img
              src="https://media.harrypotterfanzone.com/deathly-hallows-us-childrens-edition.jpg"
              alt="Avatar"
              class="avatar"
            />
            <div className="my-4">
              <h3 className="book-name">{name}</h3>
              <p className="book-author">-{author}</p>
            </div>
            <div className="my-4">
              <h5 className="book-desc-head">Description</h5>
              <p className="book-desc">{desc}</p>
            </div>
            <div className="d-flex flex-nowrap my-4">
              <h5>Rent Cost: </h5>
              <div className="d-flex flex-nowrap">
                <h5 className="ms-1 cost-rent">Rs. {cost}</h5>
                <h5 className="">/day</h5>
              </div>
            </div>
            <div className="d-flex flex-wrap align-items-center my-4">
              <h5 className="me-2">Available For</h5>
              <div>
                <button
                  className="request-btn btn-rent m-2"
                  onClick={handleOpenRent}
                  data-test="rent-btn"
                >
                  Rent <FaChevronCircleRight className="ms-1 fs-5" />
                </button>
                <button
                  className="request-btn btn-exchange m-2"
                  onClick={handleOpenExchange}
                >
                  Exchange <RiExchangeFill className="ms-1 fs-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal
          open={openRent}
          onClose={handleCloseRent}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <RentBook
              id={book_id}
              bookOwner={bookowner}
              name={name}
              rent_cost={cost}
            />
          </Box>
        </Modal>
        <Modal
          open={openExchange}
          onClose={handleCloseExchange}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ExchangeBook id={book_id} bookOwner={bookowner} name={name} />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default SingleBook;
