import React from "react";
import "./singleBook.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BsBookmarkPlusFill, BsFillChatLeftDotsFill } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { FaChevronCircleRight } from "react-icons/fa";
import { RiExchangeFill } from "react-icons/ri";
import Modal from "@mui/material/Modal";
import RentBook from "../components/rent_book/RentBook";
import ExchangeBook from "../components/exchange_book/ExchangeBook";
import Box from "@mui/material/Box";
import ListedBookCard from "../components/listedbook-card/listedbook-card";
import { toast } from "react-toastify";

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
  const { authormain } = useParams();

  const [book_img, setBookImg] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState([]);
  const [owner_img, setOwnerImg] = useState("");
  const [bookowner, setBookOwner] = useState("");

  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState("");
  const [receiverId, setReceiverId] = useState("");

  const [listedBooks, setListedBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:90/book/getone/" + book_id).then((res) => {
      console.log(res.data);
      setBookImg(res.data.data.book_pic);
      setBookOwner(res.data.data.bookOwner);
      setName(res.data.data.name);
      setAuthor(res.data.data.author);
      setCategory(res.data.data.category);
      setDesc(res.data.data.rich_desc);
      setCost(res.data.data.rent_cost_perday);
    });
    axios
      .get("http://localhost:90/user/get", config)
      .then((res) => {
        setReceiverId(res.data.data.username);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .get("http://localhost:90/book/getauthor/" + authormain)
      .then((res) => {
        console.log(res.data);
        setListedBooks(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const sendMessage = (e) => {
    e.preventDefault();
    console.log(receiverId);
    if (localStorage.getItem("username") === receiverId) {
      toast.warning("You cannot start a conversation with yourself.", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }
    const data1 = {
      senderId: localStorage.getItem("username"),
      receiverId: receiverId,
    };
    axios
      .post("http://localhost:90/conversation/post", data1, config)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          toast.success(res.data.msg, {
            position: "top-center",
            autoClose: 4000,
          });
          window.location.replace("/dashboard/messages");
        }
        if (res.status === 200) {
          toast.error(res.data.msg + " . Check your messages", {
            position: "top-center",
            autoClose: 4000,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
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
            <div className="my-4">
              <h5 className="book-desc-head">Category</h5>
              <p className="book-desc">{category.toString()}</p>
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
                  data-test="exchangeBook-btn"
                >
                  Exchange <RiExchangeFill className="ms-1 fs-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="book-detail chat mt-4">
            <h1 className="chat__heading">Contact Book Owner ?</h1>
            <button className="chat__btn" onClick={sendMessage}>
              Start a conversation <BsFillChatLeftDotsFill />
            </button>
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
      <section className="listedBook-container">
        <div className="heading2">
          <h4 className="ms-2">More Books From This Author</h4>
        </div>
        <div className="listedBook">
          {listedBooks
            .slice(0, 5)
            .map((book) =>
              book.name !== name ? (
                <ListedBookCard book={book} />
              ) : (
                <div className="bookspace"></div>
              )
            )}
        </div>
      </section>
    </div>
  );
};

export default SingleBook;
