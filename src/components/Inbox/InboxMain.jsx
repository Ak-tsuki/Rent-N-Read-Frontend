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
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Reply } from "./Reply";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState(false);
  const [see, setSee] = React.useState(false);
  const handleOpen = () => setView(true);
  const handleClose = () => setView(false);

  const [openReply, setOpenReply] = React.useState(false);
  const handleOpenReply = () => setOpenReply(true);
  const handleCloseReply = () => setOpenReply(false);


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

  const style3 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const deleteMessage = () => {
    console.log(row._id);
    axios
      .delete("http://localhost:90/contactus/delete/" + row._id, config)
      .then((result) => {
        console.log(result);
        if (result.data.success) {
          console.log("Message Deleted Successfull");
          toast.success(
            "Message Deleted Successfully",
            { toastId: "Delete Success" },
            setTimeout(() => {
              window.location.reload();
            }, 1500)
          );
        } else {
          console.log("Please Try Again!!!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
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
        <TableCell align="center">{row.first_name}</TableCell>
        <TableCell align="center">{row.last_name}</TableCell>
        <TableCell align="center">{row.email}</TableCell>
        <TableCell align="center">{row.contact_no}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell align="center">
          <div className="d-flex  align-items-center justify-content-center">
            <button
              className="approve--btn"
              onClick={handleOpenReply}
              data-test="update-details-btn"
            >
              Reply&nbsp; <SendIcon size={15} />
            </button>
            <Modal
              open={openReply}
              onClose={handleCloseReply}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style3}>
                <Reply
                  _id={row._id}
                  first_name={row.first_name}
                  last_name={row.last_name}
                  email={row.email}
                  contact_no={row.contact_no}
                />
              </Box>
            </Modal>
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
                  Are you sure you want to delete this message?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <div className="d-flex align-items-center ">
                    <button
                      className="approve--btn"
                      onClick={(e) => {
                        deleteMessage(row._id, e);
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
              <div className="book-card">
                <div className="moreInfo">
                  <Typography sx={{ display: "flex" }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                      }}
                      className="me-2"
                      variant="body2"
                      color="text.secondary"
                    >
                      Subject:
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14, fontFamily: "Poppins" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {row.subject}
                    </Typography>
                  </Typography>
                  <Typography sx={{ display: "flex" }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                      }}
                      className="me-2"
                      variant="body2"
                      color="text.secondary"
                    >
                      Message:
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14, fontFamily: "Poppins" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {row.message}
                    </Typography>
                  </Typography>
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
export default function InboxMain() {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios.get("http://localhost:90/getemails").then((res) => {
      console.log(res.data);
      setMessages(res.data.data);
      //   setListedBooks(res.data.data);
    });
  }, []);
  return (
    <>
      <h1 className="text-center fs-3">Inbox Messages</h1>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" sx={{ minWidth: 700 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell />
              <StyledTableCell align="center" className="tableheading">
                First Name
              </StyledTableCell>
              <StyledTableCell align="center" className="tableheading">
                Last Name
              </StyledTableCell>
              <StyledTableCell className="tableheading" align="center">
                Email
              </StyledTableCell>
              <StyledTableCell className="tableheading" align="center">
                Contact No.
              </StyledTableCell>
              <StyledTableCell className="tableheading" align="center">
                Problem Status
              </StyledTableCell>
              <StyledTableCell className="tableheading" align="center">
                Action
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {messages.map((row) => (
              <Row key={row._id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
