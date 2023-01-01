import React from "react";
import "./books.scss";
import { BiSearch } from "react-icons/bi";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ListedBookCard from "../components/listedbook-card/listedbook-card";
import ListedEbookCard from "../components/listedbook-card/listed-Ebookcard";
import { useState, useEffect } from "react";
import axios from "axios";
import notfound from "../assets/notfound.svg";
import ListedAudioBookCard from "../components/listedbook-card/listedaudiobook-card";
import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { RiFilter3Fill } from "react-icons/ri";
import FormControl from "@mui/material/FormControl";
import { InputLabel, OutlinedInput, Select } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

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

function valuetext(value) {
  return `${value}°C`;
}

const Books = () => {
  const [listedBooks, setListedBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [eBooks, setEBooks] = useState([]);
  const [allEBooks, setAllEBooks] = useState([]);
  const [audioBooks, setAudioBooks] = useState([]);
  const [allAudioBooks, setAllAudioBooks] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [categoryName, setcategoryName] = React.useState([]);
  const categories = [
    "Fantasy",
    "Adventure",
    "Romance",
    "Contemporary",
    "Dystopian",
    "Mystery",
    "Horror",
    "Thriller",
    "Paranormal",
    "Fiction",
    "Adult",
    "Children's",
    "Love",
    "Comic",
    "Art",
    "Self-help",
    "Development",
    "Motivational",
    "Health",
    "History",
    "Travel",
    "Humor",
    "War",
    "Biography",
    "Essays",
    "Novel",
  ];
  const open = Boolean(anchorEl);
  const [value, setValue] = React.useState([40, 100]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };
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

    axios.get("http://localhost:90/ebook/get").then((res) => {
      console.log(res.data);
      setAllEBooks(res.data.data);
      setEBooks(res.data.data);
      console.log(eBooks);
    });

    axios.get("http://localhost:90/audiobook/get").then((res) => {
      console.log(res.data);
      setAllAudioBooks(res.data.data);
      setAudioBooks(res.data.data);
      console.log(audioBooks);
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

  function getStyles(name, categoryName, theme) {
    return {
      fontWeight:
        categoryName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const theme = useTheme();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setcategoryName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleFilter = () => {
    let category = categoryName;
    axios
      .get("http://localhost:90/book/filter/" + category)
      .then((res) => {
        console.log(res);
        setListedBooks(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get("http://localhost:90/ebook/filter/" + category)
      .then((res) => {
        console.log(res);
        setEBooks(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get("http://localhost:90/audiobook/filter/" + category)
      .then((res) => {
        console.log(res);
        setAudioBooks(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const filterPriceHandler = () => {
    axios
      .get("http://localhost:90/book/pricefilter/" + value[0] + "/" + value[1])
      .then((res) => {
        console.log(res);
        setListedBooks(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(
        "http://localhost:90/audiobook/pricefilter/" + value[0] + "/" + value[1]
      )
      .then((res) => {
        console.log(res);
        setAudioBooks(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get("http://localhost:90/ebook/pricefilter/" + value[0] + "/" + value[1])
      .then((res) => {
        console.log(res);
        setEBooks(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const clearFilter = () => {
    setListedBooks(allBooks);
    setEBooks(allEBooks);
    setAudioBooks(allAudioBooks);
    setcategoryName([]);
  };

  return (
    <div>
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
      <div className="filter-options-container">
        <div>
          <div className="filter-elements">
            <FormControl className="category-dropdown">
              <InputLabel
                id="demo-multiple-name-label"
                className="category-dropdown__label"
              >
                Select Category
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={categoryName}
                onChange={handleChange}
                input={<OutlinedInput label="Book Category" />}
                MenuProps={MenuProps}
                className="category-dropdown__select"
              >
                {categories.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, categoryName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <button className="filter-elements__btn" onClick={handleFilter}>
              <RiFilter3Fill size={20} />
              Filter
            </button>
            <button className="filter-elements__btn" onClick={clearFilter}>
              Clear
            </button>
          </div>
          <div className="filter-elements mt-3">
            <div className="price-box">{value[0]}</div>
            <Box sx={{ width: 180 }}>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                max={200}
              />
            </Box>
            <div className="price-box">{value[1]}</div>
            <button
              className="filter-elements__btn"
              onClick={filterPriceHandler}
            >
              <RiFilter3Fill size={20} />
              Filter Price
            </button>
          </div>
        </div>

        <div>
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
      </div>
      <div className="Book-container">
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
      <section className="Book-container">
        <div className="heading2">
          <h4 className="ms-2">E-Books</h4>
        </div>
        <div className="Book-list">
          {eBooks.slice(0, 12).map((book) => (
            <ListedEbookCard book={book} />
          ))}
        </div>
      </section>
      <section className="Book-container">
        <div className="heading2">
          <h4 className="ms-2">Audio Books</h4>
        </div>
        <div className="Book-list">
          {audioBooks.slice(0, 12).map((book) => (
            <ListedAudioBookCard book={book} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Books;
