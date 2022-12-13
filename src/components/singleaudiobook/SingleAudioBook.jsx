import React from "react";
import "./singleAudioBook.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { FaChevronCircleRight } from "react-icons/fa";
import Modal from "@mui/material/Modal";

import Box from "@mui/material/Box";
import ListedAudioBookCard from "../listedbook-card/listedaudiobook-card";
import BuyAudioBook from "../buy_audio_book/BuyAudioBook";
import { MdShoppingBag } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

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

const SingleAudioBook = () => {
  const [openRent, setOpenRent] = React.useState(false);
  const handleOpenRent = () => setOpenRent(true);
  const handleCloseRent = () => setOpenRent(false);

  const [openExchange, setOpenExchange] = React.useState(false);
  const handleOpenExchange = () => setOpenExchange(true);
  const handleCloseExchange = () => setOpenExchange(false);

  const { audiobook_id } = useParams();
  const { authormain } = useParams();

  const [book_img, setBookImg] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState([]);
  const [owner_img, setOwnerImg] = useState("");
  const [bookowner, setBookOwner] = useState("");

  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState("");

  const [listedBooks, setListedBooks] = useState([]);

  const showToastMessage = () => {
    toast.error("Please Login First!!!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 4000,
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:90/audiobook/getone/" + audiobook_id)
      .then((res) => {
        console.log(res.data);
        setBookImg(res.data.data.book_pic);
        setBookOwner(res.data.data.bookOwner);
        setName(res.data.data.name);
        setAuthor(res.data.data.author);
        setCategory(res.data.data.category);
        setDesc(res.data.data.rich_desc);
        setCost(res.data.data.price);
      });

    axios
      .get("http://localhost:90/audiobook/getauthor/" + authormain)
      .then((res) => {
        console.log(res.data);
        setListedBooks(res.data.data);
      });
  }, []);

  return (
    <div className="Book-container" data-test="singleaudiobookpage">
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
            <div className="my-4">
              <h5 className="book-desc-head">Category</h5>
              <p className="book-desc">{category.toString()}</p>
            </div>
            <div className="d-flex flex-nowrap my-4">
              <h5>Book Price: </h5>
              <div className="d-flex flex-nowrap">
                <h5 className="ms-1 cost-rent">Rs. {cost}</h5>
              </div>
            </div>
            <div className="d-flex flex-wrap align-items-center my-4">
              <div>
                {localStorage.getItem("token") ? (
                  <button
                    className="request-btn btn-rent"
                    onClick={handleOpenRent}
                    data-test="buy-btn"
                  >
                    Buy <MdShoppingBag className="ms-1 fs-5" />
                  </button>
                ) : (
                  <button
                    className="request-btn btn-rent"
                    onClick={showToastMessage}
                  >
                    Buy <MdShoppingBag className="ms-1 fs-5" />
                  </button>
                )}
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
            <BuyAudioBook
              _id={audiobook_id}
              bookOwner={bookowner}
              name={name}
              price={cost}
            />
          </Box>
        </Modal>
      </div>
      <section className="listedBook-container">
        <div className="heading2">
          <h4 className="ms-2">More Books From This Author</h4>
        </div>
        <div className="listedBook">
          {listedBooks
            .slice(0, 5)
            .map((book) =>
              book.name !== name ? (
                <ListedAudioBookCard book={book} />
              ) : (
                <div className="bookspace"></div>
              )
            )}
        </div>
      </section>
    </div>
  );
};

export default SingleAudioBook;
