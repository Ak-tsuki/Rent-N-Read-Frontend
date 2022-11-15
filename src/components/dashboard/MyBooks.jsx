import React, { useState } from "react";
import { FaBook } from "react-icons/fa";
import AddBook from "../add_book/AddBook";
import BookCard from "../book-card/BookCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MyBooks = () => {
  const [currentTab, setCurrentTab] = useState("listed");
  const listedBooks = [
    {
      title: "Harry Potter",
      author: "J.K. Rowling",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis craspulvinar ultrices id nisl ornare nisi. Nisi, morbi consectetur nibhdapibus maecenas elementum id nec. Velit vitae tellus ac feugiat nonridiculus.",
      cost: "20",
      image:
        "https://m.media-amazon.com/images/M/MV5BMzkyZGFlOWQtZjFlMi00N2YwLWE2OWQtYTgxY2NkNmM1NjMwXkEyXkFqcGdeQXVyNjY1NTM1MzA@._V1_FMjpg_UX1000_.jpg",
    },
    {
      title: "Harry Potter",
      author: "J.K. Rowling",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis craspulvinar ultrices id nisl ornare nisi. Nisi, morbi consectetur nibhdapibus maecenas elementum id nec. Velit vitae tellus ac feugiat nonridiculus.",
      cost: "20",
      image:
        "https://m.media-amazon.com/images/M/MV5BMzkyZGFlOWQtZjFlMi00N2YwLWE2OWQtYTgxY2NkNmM1NjMwXkEyXkFqcGdeQXVyNjY1NTM1MzA@._V1_FMjpg_UX1000_.jpg",
    },
  ];
  const rentedBook = [
    {
      title: "Anya and the Nightingale",
      author: "Sofiya Pasternack",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis craspulvinar ultrices id nisl ornare nisi. Nisi, morbi consectetur nibhdapibus maecenas elementum id nec. Velit vitae tellus ac feugiat nonridiculus.",
      cost: "20",
      image:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1593147230l/48946798.jpg",
    },
    {
      title: "Anya and the Nightingale",
      author: "Sofiya Pasternack",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis craspulvinar ultrices id nisl ornare nisi. Nisi, morbi consectetur nibhdapibus maecenas elementum id nec. Velit vitae tellus ac feugiat nonridiculus.",
      cost: "20",
      image:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1593147230l/48946798.jpg",
    },
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="mybooks-container">
      <div className="add-book">
        {" "}
        {/* <button
          className="add-book__btn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@getbootstrap"
        >
          Add a book <FaBook />
        </button> */}
        <button className="add-book__btn" onClick={handleOpen}>
          Add a book <FaBook />
        </button>
      </div>

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
        >
          Rented Books
        </div>
      </div>
      <div>
        {currentTab === "rented"
          ? rentedBook.map((book) => <BookCard book={book} />)
          : listedBooks.map((book) => <BookCard book={book} />)}
      </div>
      <div>
        <Button onClick={handleOpen}>Open modal</Button>
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
      {/* <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Book
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <AddBook></AddBook>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MyBooks;
