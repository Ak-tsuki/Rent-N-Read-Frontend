import React from "react";
import "./wishlist.scss";
import { BsFillBookmarkDashFill } from "react-icons/bs";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import UpdateBook from "../update_book/UpdateBook";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import { ImCross } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";
const WishlistCard = () => {
  return (
    // <div className="wishlist-book">
    //   <img
    //     src="https://m.media-amazon.com/images/I/51PcUAhn15L.jpg"
    //     className="wishlist-book__img"
    //     alt="book_img"
    //   />

    //   <div className="wishlist-book__details">
    //     <div className="wishlist-book__name">
    //       Harry Potter and the Philosophers stone
    //     </div>
    //     <div className="wishlist-book__author">- J.K Rowling</div>
    //     <div className="wishlist-book__category"> Fantasy Romance</div>
    //     <div className="wishlist-book__desc">
    //       dsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
    //     </div>
    //     <button className="wishlist-book__view-btn">View Details</button>
    //   </div>
    // </div>
    <div className="book-card wishlist-book">
      <BsFillBookmarkDashFill
        className="book-card__delete"
        // onClick={handleOpen}
        data-test="delete-book-btn"
      />
      {/* <Modal
        // open={view}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        data-test="delete-modal"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this book?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="d-flex align-items-center ">
              <button
                className="approve--btn"
                onClick={(e) => {
                  deleteBook(book._id, e);
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
      </Modal> */}
      <img
        src="https://m.media-amazon.com/images/I/51PcUAhn15L.jpg"
        alt="book_img"
        className="book-card__img"
      />
      <div className="book-details">
        <h2 className="book-details__title">sdfsdf</h2>
        <p className="book-details__author">sddsfdsf</p>
        <p className="book-details__desc">sdfsdf</p>
        <p className="book-details__desc">
          <span className="category-name">Fantasy</span>
        </p>

        <button className="wishlist-book__view-btn">
          View details <IoIosArrowDroprightCircle />
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
