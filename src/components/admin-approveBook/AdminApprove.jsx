import * as React from "react";
import "./admin_approve.scss";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { FaTrash, FaPenAlt } from "react-icons/fa";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

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
        <TableCell align="center">{row.bookOwner.username}</TableCell>
        <TableCell align="center">{row.rent_cost_perday}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell align="center">
          <div className="d-flex  align-items-center justify-content-center">
            <button
              class="approve--btn"
              onClick={(e) => {
                approveBook(row._id, e);
              }}
              data-test="approve--btn"
            >
              Approve&nbsp; <BsCheckLg />
            </button>
            <button
              onClick={handleOpen}
              class="reject--btn"
              data-test="reject--btn"
            >
              Reject &nbsp; <ImCross />
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
                      class="approve--btn"
                      onClick={(e) => {
                        rejectBook(row._id, e);
                      }}
                      data-test="yes-btn"
                    >
                      Yes &nbsp; <BsCheckLg />
                    </button>
                    <button onClick={handleClose} class="reject--btn ">
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
                  class="img-fluid  table-img"
                />
                <div className="moreInfo">
                  <p className="book-details__desc">Author: {row.author}</p>
                  <p className="book-details__desc">Category: {row.category}</p>
                  <p className="book-details__desc">Description: </p>
                  <p>{row.rich_desc}</p>
                </div>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
Row.propTypes = {
  row: PropTypes.shape({
    rent: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    more: PropTypes.arrayOf(
      PropTypes.shape({
        desc: PropTypes.string.isRequired,
        bookOwner: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
  }).isRequired,
};

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
export default function AdminApprove() {
  const [listedBooks, setListedBooks] = useState([]);

  const approveBook = (id, e) => {
    e.preventDefault();
    const data = {
      id: id,
    };
    axios
      .put("http://localhost:90/book/approve", data, config)
      .then((response) => {
        console.log(response.data.msg);
        toast.success(
          "Approved Successfully",
          { toastId: "Approve success" },
          setTimeout(() => {
            window.location.reload();
          }, 1500)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const rejectBook = (id, e) => {
    e.preventDefault();
    const data = {
      id: id,
    };
    axios
      .put("http://localhost:90/book/reject", data, config)
      .then((response) => {
        console.log(response.data.msg);
        toast.success(
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

  useEffect(() => {
    axios.get("http://localhost:90/book/getallbyadmin", config).then((res) => {
      console.log(res.data);
      setListedBooks(res.data.data);
      console.log(listedBooks);
    });
  }, []);
  return (
    <>
      <div>
        <h1 class="table-title">Verify Books</h1>
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
                Book Owner
              </StyledTableCell>
              <StyledTableCell
                className="tableheading rent-tableheading"
                align="center"
              >
                Rent&nbsp;(per day)
              </StyledTableCell>
              <StyledTableCell className="tableheading" align="center">
                Status
              </StyledTableCell>
              <StyledTableCell className="tableheading" align="center">
                Action
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {listedBooks.map((row) => (
              <Row
                key={row._id}
                row={row}
                approveBook={approveBook}
                rejectBook={rejectBook}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
