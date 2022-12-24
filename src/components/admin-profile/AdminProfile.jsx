import React from "react";
import "./adminProfile.scss";
import { useEffect, useState } from "react";
import { FaTrash, FaPenAlt } from "react-icons/fa";
import { BsFillBookmarkDashFill } from "react-icons/bs";
import UpdateAdminProfile from "./UpdateAdminProfile";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { Typography } from "@mui/material";
import { ImCross } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";
import { Link } from "react-router-dom";

const AdminProfile = () => {
  const [adminDetails, setAdminDetails] = useState("");
  const [profile_pic, setProfilePic] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:90/user/getadmin", config)
      .then((res) => {
        setAdminDetails(res.data.data);
        console.log("profile");
        console.log(res.data.data.profile_pic);
        setProfilePic(res.data.data.profile_pic);
        console.log(res.data.data);
        console.log(res.data);
        console.log(adminDetails.username);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateAdminProfile Aprofile={adminDetails}></UpdateAdminProfile>
        </Box>
      </Modal>

      <div className="outer-container pb-5">
        <div className="profile-container pt-5 ">
          <h1 className="head-text text-center mb-4">Admin Profile</h1>
          <div className="profile-card p-3 pt-5 pb-5">
            <img
              width="500"
              height="900"
              src={`http://localhost:90/${profile_pic}`}
              alt="profile pic"
            />
            <div class="card-info ">
              <div className="py-2">
                Username:{" "}
                <span className="user-data">{adminDetails.username}</span>
              </div>
              <div className="py-2">
                Firstname:
                <span className="user-data">
                  {adminDetails.first_name}
                </span>{" "}
              </div>
              <div className="py-2">
                Lastname:{" "}
                <span className="user-data">{adminDetails.last_name}</span>
              </div>
              <div className="py-2">
                Email:<span className="user-data">{adminDetails.email}</span>{" "}
              </div>
              <div className="py-2">
                Contact Number:{" "}
                <span className="user-data">{adminDetails.contact_no}</span>
              </div>
              <div className="py-2">
                Address:{" "}
                <span className="user-data">{adminDetails.address}</span>
              </div>
              <button
                className="update-btn"
                onClick={handleOpen}
                data-test="updateProfile-btn"
              >
                Update Profile
                <FaPenAlt />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <img
          src={
            profile_pic !== ""
              ? `http://localhost:90/${profile_pic}`
              : "https://www.pngitem.com/pimgs/m/421-4212341_default-avatar-svg-hd-png-download.png"
          }
          alt="profile_img"
          className="dash-nav__profile--img"
        /> */}
    </>
  );
};

export default AdminProfile;
