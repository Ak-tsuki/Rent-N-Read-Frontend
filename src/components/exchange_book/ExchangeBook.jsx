import React from "react";
import "./exchangeBook.scss";
import Box from "@mui/material/Box";
import { Theme, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { FaChevronCircleRight } from "react-icons/fa";

import axios from "axios";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import timeunit from "timeunit";

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

const ExchangeBook = ({ id, bookOwner, name }) => {
  const [exchangebook, setExchangeBook] = React.useState("");
  const [listedBooks, setListedBooks] = useState([]);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const handleChange = (event) => {
    setExchangeBook(event.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:90/book/getbyOwner", config).then((res) => {
      console.log(res.data);
      setListedBooks(res.data.data);
    });
  }, []);

  const exchangeBook = (e) => {
    if (exchangebook === "") {
      toast.warn("Please select book", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    const data = {
      bookId: id,
      bookOwnerId: bookOwner,
      exchangeBookId: exchangebook,
    };

    axios
      .post("http://localhost:90/exchange_request", data, config)
      .then((res) => {
        if (res.status === 201) {
          console.log("Exchange Request sent successfully");

          toast.success(
            "Exchange Request sent successfully",
            setTimeout(() => {
              window.location.replace("/dashboard");
            }, 1500),
            {
              position: "top-center",
              autoClose: 4000,
            }
          );
        } else {
          toast.error("Somthing went wrong!..", {
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

  return (
    <div>
      <div className="form-title row justify-content-center mb-5 rent-heading-container">
        <h2 className="text-center m-0 py-3 rent-heading">Exchange a Book</h2>
      </div>
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
            disabled
            value={name}
            className="mb-3"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Exchange With</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={exchangebook}
              label="Exchange With"
              onChange={handleChange}
            >
              {listedBooks.map((listbook) => (
                <MenuItem value={listbook._id}>{listbook.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            className="mt-2 fs-5 fw-bold"
            variant="contained"
            endIcon={<FaChevronCircleRight className="fs-3" />}
            // data-test="send-rent-request-btn"
            onClick={exchangeBook}
            data-test="exchange-req-btn"
          >
            Send Exchange Request
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default ExchangeBook;
