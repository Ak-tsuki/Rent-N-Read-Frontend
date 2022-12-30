import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Grid, TextField } from "@mui/material";
import logo from "../assets/contact.svg";
import "./contactUs.scss";
import { Col } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ContactUs = () => {
  const theme = useTheme();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact_no, setContactNo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleEmail = (e) => {
    let email = e.target.value;
    if (!email.match(emailRegex)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    setEmail(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      first_name === [] ||
      last_name === "" ||
      email === "" ||
      contact_no === "" ||
      subject === "" ||
      message === ""
    ) {
      toast.warn("Fill all Required Field", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    const data = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      contact_no: contact_no,
      subject: subject,
      message: message,
    };
    console.log(data);
    axios
      .post("http://localhost:90/contactus/send", data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          toast.success("Message Sent Successfully", {
            position: "top-center",
            autoClose: 4000,
          });
          window.location.replace("/contact");
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
      <Card
        sx={{ display: "flex" }}
        className="contact p-5 border border-5 justify-content-center rounded-5"
      >
        <CardMedia
          component="img"
          className="support-image p-4 rounded-start w-50"
          image={logo}
          alt="Live from space album cover"
        />
        <Grid>
          <Card
            style={{ maxWidth: 600, padding: "20px 5px", margin: "0 auto" }}
          >
            <CardContent className="card-details">
              <Typography
                gutterBottom
                variant="h5"
                className="card-details text-center fs-1"
              >
                Contact Us
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                gutterBottom
                className="text-center"
              >
                Fill up the form and our team will get back to you within 24
                hours.
              </Typography>
              <form>
                <Grid container spacing={1}>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      placeholder="Enter first name"
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      placeholder="Enter last name"
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="email"
                      placeholder="Enter email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleEmail}
                    />
                    {emailError ? <span className="text-danger">Enter valid email</span> : ""}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      placeholder="Enter phone number"
                      label="Phone"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => {
                        setContactNo(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Subject"
                      multiline
                      rows={2}
                      placeholder="Type your subject here"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Message"
                      multiline
                      rows={4}
                      placeholder="Type your message here"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Card>
    </>
  );
};

export default ContactUs;
