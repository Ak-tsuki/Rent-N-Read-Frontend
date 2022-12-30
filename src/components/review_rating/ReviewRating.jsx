import React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
const ReviewRating = ({ id, book }) => {
  const [ratings, setRatings] = React.useState(0);
  const [review, setReview] = useState("");

  const addReview = (e) => {
    // e.perventDefault();

    if (review === "") {
      toast.warn("Please fill review section", {
        toastId: "success",
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }
    var data;
    if (book == "Realbook") {
      data = {
        bookId: id,
        rating: ratings,
        review: review,
      };
    }
    if (book == "ebook") {
      data = {
        ebookId: id,
        rating: ratings,
        review: review,
      };
    }
    if (book == "audiobook") {
      data = {
        audioBookId: id,
        rating: ratings,
        review: review,
      };
    }

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .post("http://localhost:90/add_review", data, config)
      .then((res) => {
        if (res.status === 201) {
          console.log("Review Added Successfully");
          window.location.reload("");
          toast.success("Review Added Successfully", {
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

        // console.log(res);
      })

      .catch((e) => {
        console.log(e);
      });
  };

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
        onChange={(e) => {
          setReview(e.target.value);
        }}
        data-test="review_feild"
      />
      <div className="d-flex justify-content-center mt-2">
        <Button
          variant="contained"
          className="bg-success"
          endIcon={<SendIcon />}
          onClick={addReview}
          data-test="send-btn"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ReviewRating;
