import { Box, Button, TextField } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";

export const Reply = ({ _id, first_name, last_name, email, contact_no }) => {
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
            />
            <Button
              className="mt-2 fs-5 fw-bold"
              variant="contained"
              endIcon={<SendIcon className="fs-3" />}
              data-test="add-btn"
            >
              Send Reply
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
};
