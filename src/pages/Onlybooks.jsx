import React from "react";
import "./books.scss";
import { BiSearch } from "react-icons/bi";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { FaBook } from "react-icons/fa";
import ListedBookCard from "../components/listedbook-card/listedbook-card";
import ListedEbookCard from "../components/listedbook-card/listed-Ebookcard";
import { useState, useEffect } from "react";
import axios from "axios";
import notfound from "../assets/notfound.svg";
import ListedAudioBookCard from "../components/listedbook-card/listedaudiobook-card";

import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Link } from "react-router-dom";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 8,
    background: "rgb(243, 241, 241)",
    marginTop: theme.spacing(1),
    minWidth: 180,
    // color:
    //   theme.palette.mode === "light"
    //     ? "rgb(55, 65, 81)"
    //     : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      // "&:active": {
      //   backgroundColor: alpha(
      //     theme.palette.primary.main,
      //     theme.palette.action.selectedOpacity
      //   ),
      // },
    },
  },
}));

const Onlybooks = () => {
  const [listedBooks, setListedBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [allBooks, setAllBooks] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axios.get("http://localhost:90/book/get").then((res) => {
      console.log(res.data);
      setAllBooks(res.data.data);
      setListedBooks(res.data.data);
    });
  }, []);

  const searchBooks = (e) => {
    e.preventDefault();
    console.log(searchQuery);

    const searchResult = allBooks.filter(
      (book) =>
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setListedBooks(searchResult);

    if (searchQuery === "") {
      setListedBooks(allBooks);
    }
  };

  return (
    <div>
      {" "}
      <form className="search" onSubmit={searchBooks}>
        <input
          type="text"
          className="search__input"
          placeholder="Enter book name, author....."
          onChange={(e) => setSearchQuery(e.target.value)}
          data-test="search-query"
        />
        <button className="search__btn" type="submit" data-test="search-btn">
          <BiSearch />
          Search
        </button>
      </form>
      <div className="Book-container">
        <div className="name-container">
          <button
            className="view__btn"
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {" "}
            <RemoveRedEyeIcon />
            View By
            <KeyboardArrowDownIcon />
          </button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <Link className="text-decoration-none text-dark" to="/onlybooks">
              <MenuItem onClick={handleClose} disableRipple>
                <MenuBookIcon />
                Books
              </MenuItem>
            </Link>

            <Link className="text-decoration-none text-dark" to="/onlyebooks">
              {" "}
              <MenuItem onClick={handleClose} disableRipple>
                <PictureAsPdfIcon />
                E-Book
              </MenuItem>
            </Link>

            <Link
              className="text-decoration-none text-dark"
              to="/onlyaudiobooks"
            >
              <MenuItem onClick={handleClose} disableRipple>
                <VolumeUpIcon />
                Audio Book
              </MenuItem>
            </Link>
            <Divider sx={{ my: 0.5 }} />
            <Link className="text-decoration-none text-dark" to="/books">
              <MenuItem onClick={handleClose} disableRipple>
                <MenuBookIcon />
                All Books
              </MenuItem>
            </Link>
          </StyledMenu>
        </div>
        <div className="heading2">
          <h4 className="ms-2">Books</h4>
        </div>
        <div className="Book-list">
          {listedBooks.length ? (
            listedBooks.map((book) => (
              <ListedBookCard book={book} data-test="search-result" />
            ))
          ) : (
            <img
              src={notfound}
              alt="not_found"
              className="not-found-img"
              data-test="not-found"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Onlybooks;
