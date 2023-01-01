import React from "react";
import "./singleBook.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { FaChevronCircleRight, FaDownload } from "react-icons/fa";
import { MdPreview } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { RiExchangeFill } from "react-icons/ri";
import Modal from "@mui/material/Modal";
import logo from "../assets/logo.svg";

import Box from "@mui/material/Box";
import ListedEbookCard from "../components/listedbook-card/listed-Ebookcard";

import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";

import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { SpecialZoomLevel } from "@react-pdf-viewer/core";
import { ToolbarSlot, TransformToolbarSlot } from "@react-pdf-viewer/toolbar";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import RentEBook from "../components/rent_ebook/RentEBook";

import Checkout from "../components/proceed_to_checkout/Checkout";
import EbookCheckout from "../components/proceed_to_checkout/EbookCheckout";
import { Avatar, Rating } from "@mui/material";
import { format } from "timeago.js";
// interface RemovePartsDefaultToolbarExampleProps {
//   fileUrl: string;
// }

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

const EbookSingleBook = ({ book, fileUrl }) => {
  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

  // const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
  //   ...slot,
  //   Download: () => <></>,
  //   DownloadMenuItem: () => <></>,
  //   EnterFullScreen: () => <></>,
  //   EnterFullScreenMenuItem: () => <></>,
  //   SwitchTheme: () => <></>,
  //   SwitchThemeMenuItem: () => <></>,
  // });

  const [openRent, setOpenRent] = React.useState(false);
  const handleOpenRent = () => setOpenRent(true);
  const handleCloseRent = () => setOpenRent(false);

  // const [openExchange, setOpenExchange] = React.useState(false);
  // const handleOpenExchange = () => setOpenExchange(true);
  // const handleCloseExchange = () => setOpenExchange(false);

  const { book_id } = useParams();
  const { authormain } = useParams();

  const [book_img, setBookImg] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState([]);
  const [owner_img, setOwnerImg] = useState("");
  const [bookowner, setBookOwner] = useState("");

  const [payment_status, setPaymentStatus] = useState("");

  const [e_book, setEbook] = useState("");
  const [price, setPrice] = useState("");

  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState("");

  const [eBooks, setEBooks] = useState([]);

  const [viewPdf, setViewPdf] = useState("null");
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [see, setSee] = React.useState(false);
  const handleOpen1 = () => setSee(true);
  const handleClose1 = () => setSee(false);

  const [see1, setSee1] = React.useState(false);
  const handleOpen2 = () => setSee1(true);
  const handleClose2 = () => setSee1(false);

  const [pdfFile, setPDFFile] = useState("null");

  const [open, setOpen] = React.useState(false);
  const [bookObject, setBookObject] = useState([]);

  const [listreviews, setListReviews] = useState([]);

  const handleOpen = () => {
    setOpen(true);
    setBookObject(book);
  };
  const handleClose = () => {
    setOpen(false);
    setBookObject();
  };

  useEffect(() => {
    axios.get("http://localhost:90/ebook/getone/" + book_id).then((res) => {
      console.log(res.data);
      setBookImg(res.data.data.book_pic);
      setEbook(res.data.data.e_book);
      setBookOwner(res.data.data.bookOwner);
      setName(res.data.data.name);
      setAuthor(res.data.data.author);
      setCategory(res.data.data.category);
      setDesc(res.data.data.rich_desc);
      setCost(res.data.data.rent_cost_perday);
      setPrice(res.data.data.price);
    });

    axios
      .get("http://localhost:90/ebook/getauthor/" + authormain)
      .then((res) => {
        console.log(res.data);
        setEBooks(res.data.data);
      });
    axios
      .get("http://localhost:90/get/ebook_reviews/" + book_id)
      .then((res) => {
        console.log(res.data);
        setListReviews(res.data.reviews);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="EBook-container" data-test="singleebookpage">
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
              src={logo}
              alt="Avatar"
              class="Eavatar"
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
            <div className="d-flex flex-nowrap my-4">
              <h5>Price: </h5>
              <div className="d-flex flex-nowrap">
                <h5 className="ms-1 cost-rent">Rs. {price}</h5>
              </div>
            </div>
            <div className="d-flex flex-nowrap my-4">
              <button
                className="btn-preview m-2"
                onClick={handleOpen1}
                data-test="rent-btn"
              >
                Preview <MdPreview className="ms-1 fs-5" />
              </button>
              {/* <div> */}
              {/* <button
                  className="btn-download  m-2"
                  onClick={handleOpen2}
                  data-test="rent-btn"
                >
                  Download Pdf
                  <FaDownload className="ms-1 fs-5" />
                </button> */}

              {/* {payment_status === "Paid" ? (
                  <button
                    className="btn-download  m-2"
                    onClick={handleOpen2}
                    data-test="rent-btn"
                  >
                    Download Pdf
                    <FaDownload className="ms-1 fs-5" />
                  </button>
                ) : (
                  <div> </div>
                )} */}
              {/* </div> */}
            </div>
            <Modal
              open={see}
              onClose={handleClose1}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"

              // onSubmit={handlePdfFileSubmit}
            >
              <div className="pdf-container">
                <Box sx={style1}>
                  {viewPdf && (
                    <>
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
                        {/* <Toolbar>{renderDefaultToolbar(transform)}</Toolbar> */}
                        <Viewer
                          fileUrl={`http://localhost:90/${e_book}`}
                          defaultScale={SpecialZoomLevel.PageFit}
                          // plugins={[defaultLayoutPluginInstance]}
                          plugins={[toolbarPluginInstance]}
                        />
                      </Worker>
                    </>
                  )}
                </Box>
              </div>
            </Modal>

            <Modal
              open={see1}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"

              // onSubmit={handlePdfFileSubmit}
            >
              <div className="pdf-container">
                <Box sx={style1}>
                  {viewPdf && (
                    <>
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
                        <Viewer
                          fileUrl={`http://localhost:90/${e_book}`}
                          plugins={[defaultLayoutPluginInstance]}
                        />
                      </Worker>
                    </>
                  )}
                </Box>
              </div>
            </Modal>

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
                  className="request-btn btn-rent m-2"
                  onClick={handleOpen}
                  data-test="buy-btn"
                >
                  Buy <BsCashCoin className="ms-1 fs-5" />
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
            <RentEBook
              _id={book_id}
              bookOwner={bookowner}
              name={name}
              rent_cost={cost}
            />
          </Box>
        </Modal>
        <div>
          {/* <Button onClick={handleOpen}>Open modal</Button> */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <EbookCheckout
                _id={book_id}
                bookOwner={bookowner}
                name={name}
                price={price}
              />
            </Box>
          </Modal>
        </div>
      </div>
      {/* review */}

      <div className="book-detail mt-4">
        <h6 className="chat__heading">Book Review</h6>
        <hr />
        {/* review container */}
        {listreviews.map((reviews) => (
          <div className="my-2">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <Avatar
                  alt="Remy Sharp"
                  src={`http://localhost:90/${reviews.userId.profile_pic}`}
                />
                <div className="ms-2">
                  <p className="reviewuserfont mb-1">
                    By {reviews.userId.username}
                  </p>
                  <Rating
                    name="read-only"
                    className="fs-6"
                    value={reviews.rating}
                    readOnly
                  />
                </div>
              </div>
              <p> {format(reviews.createdAt)}</p>
            </div>
            <p className="text-justify bg-white p-3 mt-2 rounded-3">
              {reviews.review}
            </p>
          </div>
        ))}
      </div>

      <section className="listedBook-container">
        <div className="heading2">
          <h4 className="ms-2">More Books From This Author</h4>
        </div>
        <div className="listedBook">
          {eBooks
            .slice(0, 5)
            .map((book) =>
              book.name !== name ? (
                <ListedEbookCard book={book} />
              ) : (
                <div className="bookspace"></div>
              )
            )}
        </div>
      </section>
    </div>
  );
};

export default EbookSingleBook;
