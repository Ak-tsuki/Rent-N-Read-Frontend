import React from "react";
import Box from "@mui/material/Box";
import { Theme, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import { FaBook } from "react-icons/fa";
import AddBook from "../add_book/AddBook";
import BookCard from "../book-card/BookCard";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaFilePdf } from "react-icons/fa";

import {
  Button,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Stack } from "react-bootstrap";
import { Name } from "selenium-webdriver/lib/command";
import { toast } from "react-toastify";

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
  "Historical Fiction",
  "Science Fiction",
  "Children's",
  "Memoir",
  "Cookbook",
  "Art",
  "Self-help",
  "Development",
  "Motivational",
  "Health",
  "History",
  "Travel",
  "Humor",
];

function getStyles(name, categoryName, theme) {
  return {
    fontWeight:
      categoryName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddEBook = () => {
  const theme = useTheme();
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [richDesc, setRichDesc] = useState("");
  //   const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [rent_cost_perday, setRent_cost_Perday] = useState("");
  const [price, setPrice] = useState("");
  const [bookPic, setBookPic] = useState("");

  const [pdfFile, setPDFFile] = useState("null");
  const [pdfFileError, setPDFFileError] = useState("");

  const [viewPdf, setViewPdf] = useState(null);

  const addEBook = (e) => {
    // e.perventDefault();
    if (
      category === [] ||
      name === "" ||
      richDesc === "" ||
      author === "" ||
      bookPic === "" ||
      //   desc === "" ||
      rent_cost_perday === "" ||
      price === "" ||
      pdfFile === ""
    ) {
      toast.warn("Fill all Required Field", {
        position: "top-center",
        autoClose: 4000,
        toastId: "warning",
      });
      return;
    }

    const data = new FormData();
    data.append("category", category);
    data.append("name", name);
    data.append("rich_desc", richDesc);
    // data.append("desc", desc);
    data.append("author", author);
    data.append("rent_cost_perday", rent_cost_perday);
    data.append("price", price);
    data.append("book_img", bookPic);
    data.append("e_book", pdfFile);
    console.log(data);

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .post("http://localhost:90/eBook/add", data, config)
      .then((res) => {
        if (res.status === 201) {
          console.log("E-Book Added Successfully");
          window.location.replace("/dashboard_admin/ebook");
          toast.success("E-Book added successfully", {
            position: "top-center",
            autoClose: 4000,
          });
        } else {
          console.log("Please Try Again! Something Went Wrong!!!", res);
          toast.error("Somthing went wrong!", {
            toastId: "error",
            position: "top-center",
            autoClose: 4000,
          });
        }
        // console.log(res);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 401) {
          toast.warn(e.response.data.msg, {
            position: "top-center",
            autoClose: 4000,
            toastId: "warning",
          });
          return;
        }
      });
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
  };
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 0, pb: 2 },
          // width: 762,
          maxWidth: "100%",
        }}
        noValidate
        autoComplete="off"
        onSumit={handlePdfFileSubmit}
      >
        <div className="row">
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Book Name"
            width="100%"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Author"
            width="100%"
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
          {/* <TextField
            required
            multiline
            rows={2}
            maxRows={4}
            id="outlined-required outlined-multiline-static"
            label="Description"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          /> */}
          <TextField
            required
            multiline
            rows={4}
            maxRows={6}
            id="outlined-required outlined-multiline-static"
            label="Rich Description"
            onChange={(e) => {
              setRichDesc(e.target.value);
            }}
          />
          <FormControl sx={{ pb: 2 }} required>
            <InputLabel id="demo-multiple-name-label">Category</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={category}
              onChange={handleChange}
              input={<OutlinedInput label="Category" />}
              MenuProps={MenuProps}
            >
              {categories.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, category, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            id="outlined-required fullWidth"
            type="file"
            label="Book Image"
            fullWidth
            width="100%"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setBookPic(e.target.files[0]);
            }}
          />
          <TextField
            required
            id="outlined-required fullWidth"
            type="file"
            label="PDF File"
            fullWidth
            width="100%"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setPDFFile(e.target.files[0]);
            }}
          />
          <FormControl fullWidth required>
            <InputLabel htmlFor="outlined-adornment-amount">
              Rent Price
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">Rs.</InputAdornment>
              }
              label="Amount"
              type="number"
              onChange={(e) => {
                setRent_cost_Perday(e.target.value);
              }}
            />
            <br></br>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">Rs.</InputAdornment>
              }
              label="Amount"
              type="number"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </FormControl>
          <Button
            className="mt-2 fs-5 fw-bold"
            variant="contained"
            endIcon={<FaFilePdf className="fs-3" />}
            onClick={addEBook}
            data-test="add-btn"
          >
            Add E-Book
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default AddEBook;
