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
const genders = [
    "Male",
    "Female",
    "Others",
  ];
  function getStyles(name, gender, theme) {
    return {
      fontWeight:
        gender.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }



const UpdateProfile = ({profile}) => {
   const theme = useTheme();
  const [first_name, setFirstName] = useState(profile.first_name);
  const [last_name, setLastName] = useState(profile.last_name);
  const [gender, setGender] = useState([profile.gender]);
  const [address, setAddress] = useState(profile.address);
  const [contact_no, setContactNum] = useState(profile.contact_no);
  const [user_img, setUser_img] = useState(profile.user_img);

  const updateProfile = (e) => {
    // e.perventDefault();
    // console.log(typeof(rent_cost_perday));
    // console.log(name);
    // console.log(rich_desc);
    // console.log(desc);
    // console.log(author);
    // console.log(book_img);
    // console.log(categoryName);
    if (
        first_name === ""||
        last_name === ""||
        gender === "" ||
        address === "" ||
        contact_no === "" 
        // user_img === ""
    ) {
      toast.warn("Fill all Required Field", {
        toastId: "warning",
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    const data = new FormData();
    data.append("first_name", first_name);
    data.append("last_name", last_name);
    data.append("user_img", user_img);
    data.append("gender", gender);
    data.append("contact_no", contact_no);
    data.append("address", address);
    console.log(data);

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .put("http://localhost:90/profile/update", data, config)
      .then((res) => {
        if (res.status === 201) {
          console.log("Profile Updated Successfully");
          window.location.replace("/dashboard/ProfilePage");
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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setGender(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
       
      <div className="form-title row justify-content-center mb-2 p-2">
        <h2 className="text-center m-0">Update Your Profile</h2>
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
            label="First Name"
            width="100%"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            defaultValue={profile.first_name}
            data-test="first_name"
          />
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Last Name"
            width="100%"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            defaultValue={profile.last_name}
            data-test="last_name"
          />
          {/* <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Gender"
            width="100%"
            onChange={(e) => {
              setGender(e.target.value);
            }}
            defaultValue={gender}
            data-test="author"
          /> */}
          
          <TextField
            required
            multiline
            // rows={4}
            // maxRows={6}
            id="outlined-required outlined-multiline-static"
            label="Address"
            onChange={(e) => {
                setAddress(e.target.value);
            }}
            defaultValue={profile.address}
            data-test="address"
          />
          <FormControl sx={{ pb: 2 }} required>
            <InputLabel id="demo-multiple-name-label">Gender</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              // multiple
              value={gender}
              onChange={handleChange}
              input={<OutlinedInput label="Gender" />}
              MenuProps={MenuProps}
              defaultValue={profile.gender}
            >
              {genders.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, gender, theme)}
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
            label="Profile Picture"
            fullWidth
            width="100%"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setUser_img(e.target.files[0]);
            }}
            defaultValue={profile.user_img}
          />
          <FormControl fullWidth required>
            <InputLabel htmlFor="outlined-adornment-amount">
              Contact Number
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              
              label="Contact Number"
              type="number"
              onChange={(e) => {
                setContactNum(e.target.value);
              }}
              defaultValue={profile.contact_no}
              data-test="contact_no"
            />
          </FormControl>
          {/* <FormControl fullWidth required>
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
          </FormControl> */}
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

export default UpdateProfile;
