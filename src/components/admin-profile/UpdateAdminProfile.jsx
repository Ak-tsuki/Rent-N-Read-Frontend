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
import { useParams } from "react-router-dom";
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

const UpdateAdminProfile = ({ Aprofile }) => {
  const [first_name, setFirstName] = useState(Aprofile.first_name);
  const [last_name, setLastName] = useState(Aprofile.last_name);
  const [address, setAddress] = useState(Aprofile.address);
  const [contact_no, setContact] = useState(Aprofile.contact_no);
  const [profile_pic, setProfilepic] = useState("");

  const updateProfile = (e) => {
    if (
      first_name === "" ||
      address === "" ||
      contact_no === "" ||
      last_name === ""
    ) {
      toast.warn("Fill all Required Field", {
        toastId: "warning",
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    const data = new FormData();
    // data.append("_id", Aprofile._id);
    data.append("first_name", first_name);
    data.append("last_name", last_name);
    data.append("address", address);
    data.append("contact_no", contact_no);
    data.append("user_img", profile_pic);
    console.log(data);

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .put("http://localhost:90/profile/updateadmin", data, config)
      .then((res) => {
        if (res.status === 201) {
          console.log("Profile Updated Successfully");
          window.location.replace("/dashboard_admin/profile");
          toast.success("Profile Updated Successfully", {
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
            required
            rows={2}
            maxRows={4}
            id="outlined-required outlined-multiline-static"
            label="Firstname"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            defaultValue={Aprofile.first_name}
            data-test="first_name"
          />
          <TextField
            required
            rows={2}
            maxRows={4}
            id="outlined-required outlined-multiline-static"
            label="Lastname"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            defaultValue={Aprofile.last_name}
            data-test="last_name"
          />
          <TextField
            required
            rows={2}
            maxRows={4}
            id="outlined-required outlined-multiline-static"
            label="Address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            defaultValue={Aprofile.address}
            data-test="address"
          />
          <TextField
            required
            rows={2}
            maxRows={4}
            id="outlined-required outlined-multiline-static"
            label="Contact Number"
            onChange={(e) => {
              setContact(e.target.value);
            }}
            defaultValue={Aprofile.contact_no}
            data-test="contact_no"
          />

          <TextField
            required
            id="outlined-required fullWidth"
            type="file"
            label="Profile picture"
            fullWidth
            width="100%"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setProfilepic(e.target.files[0]);
            }}
          />

          <Button
            className="mt-2 fs-5 fw-bold bg-success"
            variant="contained"
            endIcon={<FaPenAlt className="fs-3" />}
            onClick={updateProfile}
            data-test="update-profile-btn"
          >
            Update Profile
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default UpdateAdminProfile;
