import React from "react";
import { AiFillSetting } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";
import "./setting.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import UpdateProfile from "../components/profile/profile-update";
import UpdatePassword from "../components/profile/passwordUpdate";

const Setting = () => {

  const [userDetails, setUserDetails] = useState("");

  const [updateProfileOpen, setUpdateProfileOpen] = useState(false);
  const handleUpdateProfileOpen = () => setUpdateProfileOpen(true);
  const handleUpdateProfileClose = () => setUpdateProfileOpen(false);
  const [updatePasswordOpen, setUpdatePasswordOpen] = useState(false);
  const handleUpdatePasswordOpen = () => setUpdatePasswordOpen(true);
  const handleUpdatePasswordClose = () => setUpdatePasswordOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
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
        open={updateProfileOpen}
        onClose={handleUpdateProfileClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateProfile profile={userDetails}></UpdateProfile>
        </Box>
      </Modal>
      <Modal
        open={updatePasswordOpen}
        onClose={handleUpdatePasswordClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdatePassword></UpdatePassword>
        </Box>
      </Modal>

      <div className="setting">
        <h1 className="setting-heading">
          General Profile Settings <AiFillSetting />
        </h1>
        <div className="profile-update row">
          <button
            className="btn-update-profile"
            onClick={handleUpdateProfileOpen}
            data-test="updateProfile-btn"
          >
            Update Profile <CgProfile />
          </button>
          <button
            className="btn-update-password"
            onClick={handleUpdatePasswordOpen}
            data-test="password-btn"
          >
            Change Password <RiLockPasswordFill />
          </button>
        </div>
      </div>
    </>
  );
};
export default Setting;
