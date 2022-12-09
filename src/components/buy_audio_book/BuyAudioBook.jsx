import React from "react";
import "./buyAudioBook.scss";
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
import KhaltiCheckout from "khalti-checkout-web";
import logo from "../../assets/khalti.svg";

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

const BuyAudioBook = ({ _id, bookOwner, name, price }) => {
  const [startDate, setStartDate] = React.useState(dayjs());
  const theme = useTheme();

  //Payment Process
  const myKey = {
    publicTestKey: "test_public_key_b4f2f58210d24adeb3a09f18004822b6",
    secretKey: "test_secret_key_5eb022defe114eee80231588f185e8c4",
  };

  const config = {
    // replace the publicKey with yours
    publicKey: myKey.publicTestKey,
    productIdentity: _id,
    productName: name,
    productUrl: "http://localhost:3000/",
    paymentPreference: ["KHALTI"],
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log(payload);
        const data = {
          token: payload.token,
          amount: payload.amount,
        };

        const config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };

        axios
          .get(
            `http://localhost:90/payment/khalti/verification/${data.token}/${data.amount}/${myKey.secretKey}`
          )
          .then((response) => {
            console.log(response.data);
            const data2 = {
                audiobookId: _id,
                bought_date: startDate,
            };
            axios
              .post("http://localhost:90/audiobook/buy", data2, config)
              .then((response) => {
                console.log(response.data.msg);
                toast.success(
                  "Payment Successfully",
                  setTimeout(() => {
                    window.location.reload();
                  }, 1500)
                );
              })
              .catch((e) => {
                console.log(e);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      onError(error) {
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
  };

  const checkout = new KhaltiCheckout(config);

  return (
    <div>
      <div className="form-title row justify-content-center mb-5 rent-heading-container">
        <h2 className="text-center m-0 py-3 rent-heading">Checkout</h2>
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
            label="Audio Book Name"
            width="100%"
            disabled
            value={name}
            className="mb-3"
          />
          <TextField
            id="outlined-required fullWidth"
            fullWidth
            label="Book Price"
            width="100%"
            disabled
            value={price}
            className="mb-3"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disabled
              className="mb-3"
              disablePast
              label="Bought Date"
              openTo="day"
              views={["year", "month", "day"]}
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          {/* <TextField
            id="outlined-required fullWidth"
            fullWidth
            label="Contact No."
            width="100%"
            disabled
            className="mb-3"
          /> */}
          <Button
            className="mt-2 fs-5 fw-bold"
            style={{
              backgroundColor: "#5B2C92",
            }}
            variant="contained"
            data-test="buyaudiobook-btn"
            endIcon={
              <img src={logo} alt="logo" className="header__logo--img" />
            }
            onClick={() => checkout.show({ amount: price * 100 })}
          >
            Pay With
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default BuyAudioBook;
