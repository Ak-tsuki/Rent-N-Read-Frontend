import * as React from "react";
import "../admin-approveBook/admin_approve.scss";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import AddAudioBook from "./AddAudioBook";
import { BsPencilSquare, BsTrashFill } from "react-icons/bs";
import ReactAudioPlayer from "react-audio-player";
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};
function Row(props) {
  const { row, approveBook, rejectBook } = props;
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState(false);
  const handleOpen = () => setView(true);
  const handleClose = () => setView(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <TableCell align="center">{row.name}</TableCell>
        <TableCell align="center">{row.author}</TableCell>
        <TableCell align="center">{row.price}</TableCell>
        <TableCell align="center">
          <div className="d-flex  align-items-center justify-content-center">
            <button
              className="approve--btn"
              onClick={(e) => {
                approveBook(row._id, e);
              }}
              data-test="approve--btn"
            >
              Update&nbsp; <BsPencilSquare size={15} />
            </button>
            <button
              onClick={handleOpen}
              class="reject--btn"
              data-test="reject--btn"
            >
              Delete &nbsp; <BsTrashFill size={15} />
            </button>
            <Modal
              open={view}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              data-test="reject-modal"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Are you sure you want to reject this book?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <div className="d-flex align-items-center ">
                    <button
                      className="approve--btn"
                      onClick={(e) => {
                        rejectBook(row._id, e);
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
        </TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                More Information
              </Typography>
              <div className="book-card">
                <img
                  src={`http://localhost:90/${row.book_pic}`}
                  alt="book_img"
                  className="img-fluid  table-img"
                />
                <div className="moreInfo">
                  <p className="book-details__desc">Author: {row.author}</p>
                  <p className="book-details__desc">Category: {row.category}</p>
                  <p className="book-details__desc">Description: </p>
                  <p>{row.rich_desc}</p>
                  <p className="book-details__desc">
                    {
                      <ReactAudioPlayer
                        src={`http://localhost:90/${row.audio_book}`}
                        controls
                      />
                    }
                  </p>
                </div>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ff6363",
    fontSize: "18px",
    fontWeight: "600",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 26,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
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
export default function AudioBookUpload() {
  const [audioBooks, setAudioBooks] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get("http://localhost:90/audiobook/getbyadmin", config)
      .then((res) => {
        console.log(res.data);
        setAudioBooks(res.data.data);
        console.log(audioBooks);
      });
  }, []);
  return (
    <>
      <div>
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
            <AddAudioBook></AddAudioBook>
          </Box>
        </Modal>
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
            Add audio book <PlayLessonIcon />
          </button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" sx={{ minWidth: 700 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell />
              <StyledTableCell align="center" className="tableheading">
                Book Name
              </StyledTableCell>
              <StyledTableCell align="center" className="tableheading">
                Author
              </StyledTableCell>

              <StyledTableCell className="tableheading" align="center">
                Price
              </StyledTableCell>
              <StyledTableCell className="tableheading" align="center">
                Action
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {audioBooks.map((row) => (
              <Row key={row._id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
