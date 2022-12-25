// import React, { useState, useEffect } from "react";
// import { BsPersonSquare } from "react-icons/bs";
// import axios from "axios";
// import "./profile.scss";

// const ProfilePage = ({ profile }) => {
//   const [userDetails, setUserDetails] = useState("");

//   const config = {
//     headers: {
//       Authorization: "Bearer " + localStorage.getItem("token"),
//     },
//   };
//   useEffect(() => {
//     axios
//       .get("http://localhost:90/user/get", config)
//       .then((res) => {
//         setUserDetails(res.data.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }, []);

//   return (
//     <>
//       <div className="container">
//         <h1 className="heading">
//           Profile <BsPersonSquare />
//         </h1>
//         <div className="profilecard p-3 pt-5 pb-5">
//           <img
//             width="500"
//             height="900"
//             src={
//               userDetails.profile_pic
//                 ? `http://localhost:90/${userDetails.profile_pic}`
//                 : "https://www.pngitem.com/pimgs/m/421-4212341_default-avatar-svg-hd-png-download.png"
//             }
//             alt="profile_img"
//             className="img"
//           />

//           <div className="user_details">
//             <p className="detail">Full Name:</p>
//             <p className="detail-value">
//               {userDetails.first_name} {userDetails.last_name}
//             </p>

//             <p className="detail">Gender:</p>
//             <p className="detail-value">{userDetails.gender}</p>
//             <p className="detail">Contact Number:</p>
//             <p className="detail-value">{userDetails.contact_no}</p>
//             <p className="detail">Email: </p>
//             <p className="detail-value">{userDetails.email}</p>
//             <p className="detail">Address: </p>
//             <p className="detail-value">{userDetails.address}</p>
//           </div>
//           {/* <div class="card-info ">
//             <div className="py-1">
//               Username:{" "}
//               <span className="user-data">{userDetails.username}</span>
//             </div>
//             <div className="py-1">
//               Firstname:
//               <span className="user-data">{userDetails.first_name}</span>{" "}
//             </div>
//             <div className="py-1">
//               Lastname:{" "}
//               <span className="user-data">{userDetails.last_name}</span>
//             </div>
//             <div className="py-1">
//               Email:<span className="user-data">{userDetails.email}</span>{" "}
//             </div>
//             <div className="py-1">
//               Contact Number:{" "}
//               <span className="user-data">{userDetails.contact_no}</span>
//             </div>
//             <div className="py-1">
//               Address: <span className="user-data">{userDetails.address}</span>
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </>
//   );
// };
// export default ProfilePage;

import React from "react";
import "./profile.scss";
import { useEffect, useState } from "react";
import { FaTrash, FaPenAlt } from "react-icons/fa";
import { BsFillBookmarkDashFill } from "react-icons/bs";
import UpdateProfile from "./profile-update";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { Typography } from "@mui/material";
import { ImCross } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BsPersonSquare } from "react-icons/bs";

const ProfilePage = ({ profile }) => {
  const [userDetails, setUserDetails] = useState("");

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
      .get("http://localhost:90/user/get", config)
      .then((res) => {
        setUserDetails(res.data.data);
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
          <UpdateProfile profile={userDetails}></UpdateProfile>
        </Box>
      </Modal>

      <div className="outer-container pb-5">
        <div className="profile-container pt-5 ">
          <h1 className="head-text text-center mb-4">
            PROFILE <BsPersonSquare />
          </h1>
          <div className="profile-card p-3 pt-5 pb-5">
            <img
              width="500"
              height="900"
              src={`http://localhost:90/${userDetails.profile_pic}`}
              alt="profile pic"
            />
            <div class="card-info ">
              <div className="py-2">
                Username:{" "}
                <span className="user-data">{userDetails.username}</span>
              </div>
              <div className="py-2">
                Firstname:
                <span className="user-data">{userDetails.first_name}</span>{" "}
              </div>
              <div className="py-2">
                Lastname:{" "}
                <span className="user-data">{userDetails.last_name}</span>
              </div>
              <div className="py-2">
                Email:<span className="user-data">{userDetails.email}</span>{" "}
              </div>
              <div className="py-2">
                Contact Number:{" "}
                <span className="user-data">{userDetails.contact_no}</span>
              </div>
              <div className="py-2">
                Address:{" "}
                <span className="user-data">{userDetails.address}</span>
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

export default ProfilePage;
