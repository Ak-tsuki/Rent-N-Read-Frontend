import { Box, Button, TextField } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Reply = ({ _id, first_name, last_name, email, contact_no }) => {
  const [reply, setReply] = useState("");

  const replyMessage = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      reply: reply,
    };
    console.log(data);
    axios
      .post("http://localhost:90/contactus/reply", data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          axios.put("http://localhost:90/contactus/resolved/" + _id)
          .then((res)=>{
            if (res.status === 201) {
              console.log("Problem Resolved Successfully");
              toast.success("Problem Resolved Successfully", {
                toastId: "success",
                position: "top-center",
                autoClose: 4000,
              });
              window.location.replace("/dashboard_admin/inbox");
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
        } else {
          console.log("Please Try Again! Something Went Wrong!!!", response);
          toast.error("Somthing went wrong!", {
            toastId: "error",
            position: "top-center",
            autoClose: 4000,
          });
        }
      })
      .catch((e) => {
        toast.error("Something Went Wrong, Please Try Again!!", {
          toastId: "error",
          position: "top-center",
          autoClose: 4000,
        });
        console.log(e);
      });
  };

  return (
    <>
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
              disabled
              id="outlined-required fullWidth"
              fullWidth
              label="First Name"
              width="100%"
              defaultValue={first_name}
            />
            <TextField
              required
              disabled
              id="outlined-required fullWidth"
              fullWidth
              label="Last Name"
              width="100%"
              defaultValue={last_name}
            />
            <TextField
              required
              disabled
              id="outlined-required fullWidth"
              fullWidth
              label="Email"
              width="100%"
              defaultValue={email}
            />
            <TextField
              required
              disabled
              id="outlined-required fullWidth"
              fullWidth
              label="Contact No"
              width="100%"
              defaultValue={contact_no}
            />
            <TextField
              required
              multiline
              rows={4}
              maxRows={6}
              id="outlined-required outlined-multiline-static"
              label="Reply"
              onChange={(e) => {
                setReply(e.target.value);
              }}
            />
            <Button
              className="mt-2 fs-5 fw-bold"
              variant="contained"
              endIcon={<SendIcon className="fs-3" />}
              data-test="add-btn"
              onClick={replyMessage}
            >
              Send Reply
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
};
