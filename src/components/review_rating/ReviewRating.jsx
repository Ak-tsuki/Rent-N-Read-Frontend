import React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const ReviewRating = () => {
  const [ratings, setRatings] = React.useState(0);
  return (
    <div>
      <p className="fontreview text-center mb-2 fs-4 fw-500">
        Give Your Review About The Book
      </p>
      <Rating
        className="d-flex justify-content-center my-4"
        name="simple-controlled"
        value={ratings}
        onChange={(event, newValue) => {
          setRatings(newValue);
        }}
      />
      <TextField
        required
        multiline
        fullWidth
        rows={2}
        maxRows={4}
        id="outlined-required outlined-multiline-static"
        label="Review"
        // onChange={(e) => {
        //   setDesc(e.target.value);
        // }}
      />
      <div className="d-flex justify-content-center mt-2">
        <Button
          variant="contained"
          className="bg-success"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ReviewRating;
