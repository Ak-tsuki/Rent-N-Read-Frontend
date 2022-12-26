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

const UpdatePassword = () => {
  const theme = useTheme();
  const [old_Password, setOldPassword] = useState("");
  const [new_Password, setNewPassword] = useState("");

  const updatePassword = (e) => {
    // e.perventDefault();
    // console.log(typeof(rent_cost_perday));
    // console.log(name);
    // console.log(rich_desc);
    // console.log(desc);
    // console.log(author);
    // console.log(book_img);
    // console.log(categoryName);
    if (old_Password === "" || new_Password === "") {
      toast.warn("Fill all Required Field", {
        toastId: "warning",
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    // const data = new FormData();
    // data.append("old_Password", old_Password);
    // data.append("new_Password", new_Password);
    // console.log(data);
    const data = {
      old_password: old_Password,
      new_password: new_Password,
    };

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .put("http://localhost:90/password/update", data, config)
      .then((res) => {
        if (res.status === 200) {
          console.log("Password Updated Successfully");
          console.log(res);
          localStorage.clear();         
          window.location.replace("/login");
          toast.success("Password Updated Successfully", {
            toastId: "success",
            position: "top-center",
            autoClose: 4000,
          });
        } else {
          console.log("Please Try Again! Something Went Wrong!!!", res);
          toast.error("Incorrect Current Password", {
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
  const logout = () => {
    localStorage.clear();
    window.open("http://localhost:90/thirdpartyRouter/logout", "_self");
  };

  return (
    <div>
      <div className="form-title row justify-content-center mb-2 p-2">
        <h2 className="text-center m-0">Update Your Password</h2>
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
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Old Password"
            width="100%"
            type="password"
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
            data-test="old-password"
          />
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="New Password"
            width="100%"
            type="password"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            data-test="new-password"
          />

          <Button
            className="mt-2 fs-5 fw-bold bg-success"
            variant="contained"
            endIcon={<FaPenAlt className="fs-3" />}
            onClick={updatePassword}
            data-test="change-password-btn"
          >
            Update Password
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default UpdatePassword;
