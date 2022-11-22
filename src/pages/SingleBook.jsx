import React from "react";
import "./singleBook.scss";
import { BiSearch } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import ListedBookCard from "../components/listedbook-card/listedbook-card";
import { useState, useEffect } from "react";
import axios from "axios";
import CardMedia from "@mui/material/CardMedia";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { FaChevronCircleRight } from "react-icons/fa";
import { RiExchangeFill } from "react-icons/ri";
import Modal from "@mui/material/Modal";
import RentBook from "../components/rent_book/RentBook";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SingleBook = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="Book-container">
      <div className="row">
        <div className="col-12 col-md-4 d-flex justify-content-center">
          <div className="book-cover">
            <img
              src="https://media.harrypotterfanzone.com/deathly-hallows-us-childrens-edition.jpg"
              className="img-fluid"
              alt="..."
            />
            <button className="wishlist-btn my-4 fs-4 fw-semibold">
              Add to wishlist <BsBookmarkPlusFill className="fs-3" />
            </button>
          </div>
        </div>
        <div className="col-12 col-md-8 book-details ">
          <img
            src="https://media.harrypotterfanzone.com/deathly-hallows-us-childrens-edition.jpg"
            alt="Avatar"
            class="avatar"
          />
          <div className="my-4">
            <h3 className="book-name">Breif answers to big questions</h3>
            <p className="book-author">-author</p>
          </div>
          <div className="my-4">
            <h5 className="book-desc-head">Description</h5>
            <p className="book-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
              hic nobis corporis corrupti labore reiciendis harum quam
              architecto deleniti magni ipsum, voluptas illum delectus ea
              perspiciatis? Quasi quibusdam dignissimos beatae. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Soluta doloribus, nam
              adipisci similique debitis repellat distinctio fugit tenetur sint!
              Fugit animi aut natus quos quo doloribus enim voluptates
              praesentium distinctio! Vel vero suscipit laboriosam mollitia
              quam, unde, itaque sequi reiciendis fuga, quae ipsa nulla sunt
              minima. Officiis blanditiis ipsam error consequuntur voluptates
              voluptas asperiores? Praesentium cupiditate sunt error quibusdam
            </p>
          </div>
          <div className="d-flex flex-nowrap my-4">
            <h5>Rent Cost: </h5>
            <div className="d-flex flex-nowrap">
              <h5 className="ms-1 cost-rent">Rs. 120</h5>
              <h5 className="">/day</h5>
            </div>
          </div>
          <div className="d-flex flex-wrap align-items-center my-4">
            <h5 className="me-2">Available For</h5>
            <div>
              <button className="request-btn btn-rent m-2" onClick={handleOpen}>
                Rent <FaChevronCircleRight className="ms-1 fs-5" />
              </button>
              <button className="request-btn btn-exchange m-2">
                Exchange <RiExchangeFill className="ms-1 fs-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
            <RentBook />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default SingleBook;
