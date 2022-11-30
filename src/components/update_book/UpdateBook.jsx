import React from "react";
import Box from "@mui/material/Box";
import { Theme, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaPenAlt } from "react-icons/fa";

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

const UpdateBook = ({ book }) => {
  const theme = useTheme();
  const [categoryName, setcategoryName] = useState(book.category);
  const [name, setName] = useState(book.name);
  const [rich_desc, setRich_desc] = useState(book.rich_desc);
  const [desc, setDesc] = useState(book.desc);
  const [author, setAuthor] = useState(book.author);
  const [rent_cost_perday, setRent_cost_Perday] = useState(
    book.rent_cost_perday
  );
  const [book_img, setBook_img] = useState("");

  const updateBook = (e) => {
    // e.perventDefault();
    // console.log(typeof(rent_cost_perday));
    // console.log(name);
    // console.log(rich_desc);
    // console.log(desc);
    // console.log(author);
    // console.log(book_img);
    // console.log(categoryName);
    if (
      categoryName === [] ||
      name === "" ||
      rich_desc === "" ||
      author === "" ||
      desc === "" ||
      rent_cost_perday === ""
    ) {
      toast.warn("Fill all Required Field", {
        toastId: "warning",
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    const data = new FormData();
    data.append("_id", book._id);
    data.append("category", categoryName);
    data.append("name", name);
    data.append("rich_desc", rich_desc);
    data.append("desc", desc);
    data.append("author", author);
    data.append("rent_cost_perday", rent_cost_perday);
    data.append("book_img", book_img);
    console.log(data);

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .put("http://localhost:90/book/update", data, config)
      .then((res) => {
        if (res.status === 201) {
          console.log("Book Updated Successfully");
          window.location.replace("/dashboard");
          toast.success("Book Updated Successfully", {
            toastId: "success",
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
      })

      .catch((e) => {
        console.log(e);
      });
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setcategoryName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
      >
        <div className="row">
          <TextField
            id="outlined-required fullWidth"
            fullWidth
            label="Book Name"
            width="100%"
            onChange={(e) => {
              setName(e.target.value);
            }}
            defaultValue={book.name}
            data-test="name"
          />
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Book Author"
            width="100%"
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            defaultValue={book.author}
            data-test="author"
          />
          <TextField
            required
            multiline
            rows={2}
            maxRows={4}
            id="outlined-required outlined-multiline-static"
            label="Book Description"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            defaultValue={book.desc}
            data-test="desc"
          />
          <TextField
            required
            multiline
            rows={4}
            maxRows={6}
            id="outlined-required outlined-multiline-static"
            label="Book Rich Description"
            onChange={(e) => {
              setRich_desc(e.target.value);
            }}
            defaultValue={book.rich_desc}
          />
          <FormControl sx={{ pb: 2 }} required>
            <InputLabel id="demo-multiple-name-label">Book Category</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={categoryName}
              onChange={handleChange}
              input={<OutlinedInput label="Book Category" />}
              MenuProps={MenuProps}
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
              setBook_img(e.target.files[0]);
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
              defaultValue={book.rent_cost_perday}
              onChange={(e) => {
                setRent_cost_Perday(e.target.value);
              }}
              data-test="rent-cost"
            />
          </FormControl>
          <Button
            className="mt-2 fs-5 fw-bold bg-success"
            variant="contained"
            endIcon={<FaPenAlt className="fs-3" />}
            onClick={updateBook}
            data-test="update-book-btn"
          >
            Update Book
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default UpdateBook;
