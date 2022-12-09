import React, { useState, useEffect } from "react";
import { FaBook } from "react-icons/fa";
import AddBook from "../add_book/AddBook";
import EbookCard from "../ebook-card/Ebook-card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";

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

const EBooks = () => {
  const [currentTab, setCurrentTab] = useState("listed");
  const [listedEbooks, setListedEbooks] = useState([]);
  const [boughtEbooks, setBoughtEbooks] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  useEffect(() => {
    axios.get("http://localhost:90/eBook/getbyadmin", config).then((res) => {
      console.log(res.data);
      setListedEbooks(res.data.data);
      console.log(listedEbooks);
    });
    axios.get("http://localhost:90/buy/insert", config).then((res) => {
      console.log("rentedBooks");
      console.log(res.data);
      setBoughtEbooks(res.data.data);
      console.log(boughtEbooks);
    });
  }, []);

  return (
    <div className="mybooks-container">
      <div className="tabs">
        <div
          className={`tabs__tab ${
            currentTab === "listed" && "tabs__tab--open"
          }`}
          onClick={() => setCurrentTab("listed")}
        >
          Listed Books
        </div>
        <div
          className={`tabs__tab ${
            currentTab === "rented" && "tabs__tab--open"
          }`}
          onClick={() => setCurrentTab("rented")}
          data-test="rented-books-btn"
        >
          Bought Books
        </div>
      </div>
      <div>
        {currentTab === "listed" &&
          listedEbooks.map((book) => <EbookCard book={book} />)}

        {currentTab === "listed" &&
          boughtEbooks.map((book) => <EbookCard book={book} />)}
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
            <AddBook></AddBook>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default EBooks;
