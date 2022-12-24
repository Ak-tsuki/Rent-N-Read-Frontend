import React from "react";
import { AiFillSetting } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";
import { useEffect } from "react";
import axios from "axios";
// import "./adminsetting.scss";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import UpdateAdminProfile from "./UpdateAdminProfile";
import UpdateAdminPassword from "./UpdateAdminPassword";

const AdminSettings = () => {
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

  const [updateProfileOpen, setUpdateProfileOpen] = useState(false);
  const handleUpdateProfileOpen = () => setUpdateProfileOpen(true);
  const handleUpdateProfileClose = () => setUpdateProfileOpen(false);
  const [updatePasswordOpen, setUpdatePasswordOpen] = useState(false);
  const handleUpdatePasswordOpen = () => setUpdatePasswordOpen(true);
  const handleUpdatePasswordClose = () => setUpdatePasswordOpen(false);

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

      <Modal
        open={updatePasswordOpen}
        onClose={handleUpdatePasswordClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateAdminPassword></UpdateAdminPassword>
        </Box>
      </Modal>

      <div className="setting">
        <h1 className="setting-heading">
          General Admin Profile Settings <AiFillSetting />
        </h1>
        <div className="profile-update row">
          <button
            className="btn-update-profile"
            onClick={handleOpen}
            data-test="updateProfile-btn"
          >
            Update Admin Profile <CgProfile />
          </button>
          <button
            className="btn-update-password"
            onClick={handleUpdatePasswordOpen}
            data-test="password-btn"
          >
            Update Admin Password <RiLockPasswordFill />
          </button>
        </div>
      </div>
    </>
  );
};
export default AdminSettings;
