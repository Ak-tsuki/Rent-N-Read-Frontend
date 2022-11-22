import React from "react";
import "./rentBook.scss";
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

const RentBook = ({ id, name, rent_cost }) => {
  const [startDate, setStartDate] = React.useState(dayjs());
  const [endDate, setEndDate] = React.useState(dayjs());
  const theme = useTheme();

  return (
    <div>
      <div className="form-title row justify-content-center mb-5 rent-heading-container">
        <h2 className="text-center m-0 py-3 rent-heading">Rent a Book</h2>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="mb-3"
              disablePast
              label="Start Date"
              openTo="day"
              views={["year", "month", "day"]}
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="mb-3"
              disablePast
              label="End Date"
              openTo="day"
              views={["year", "month", "day"]}
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <TextField
            id="outlined-required fullWidth"
            fullWidth
            label="No. of Days"
            width="100%"
            disabled
            className="mb-3"
            value={Math.round(
              timeunit.milliseconds.toDays(endDate - startDate)
            )}
          />
          <FormControl fullWidth required className="mb-3">
            <InputLabel htmlFor="outlined-adornment-amount">
              Total Cost
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">Rs.</InputAdornment>
              }
              label="Amount"
              type="number"
              value={
                Math.round(timeunit.milliseconds.toDays(endDate - startDate)) *
                rent_cost
              }
              disabled
            />
          </FormControl>
          <Button
            className="mt-2 fs-5 fw-bold"
            variant="contained"
            endIcon={<FaChevronCircleRight className="fs-3" />}
          >
            Send Rent Request
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default RentBook;
