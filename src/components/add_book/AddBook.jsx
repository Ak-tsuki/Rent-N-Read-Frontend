import React from "react";
import "./add_book.scss";
import Box from "@mui/material/Box";
import { Theme, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import {
  Button,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Stack } from "react-bootstrap";

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

const categories = [
  "Fantasy",
  "Adventure",
  "Romance",
  "Contemporary",
  "Dystopian",
  "Mystery",
  "Horror",
  "Thriller",
  "Paranormal",
  "Historical Fiction",
  "Science Fiction",
  "Children's",
  "Memoir",
  "Cookbook",
  "Art",
  "Self-help",
  "Development",
  "Motivational",
  "Health",
  "History",
  "Travel",
  "Humor",
];

function getStyles(name, categoryName, theme) {
  return {
    fontWeight:
      categoryName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddBook = () => {
  const theme = useTheme();
  const [categoryName, setcategoryName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setcategoryName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <div className="form-title row justify-content-center mb-2 p-2">
        <h2 className="text-center m-0">Add a Book</h2>
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
            label="Book Name"
            width="100%"
          />
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Book Author"
            width="100%"
          />
          <TextField
            required
            multiline
            rows={2}
            maxRows={4}
            id="outlined-required outlined-multiline-static"
            label="Book Description"
          />
          <TextField
            required
            multiline
            rows={4}
            maxRows={6}
            id="outlined-required outlined-multiline-static"
            label="Book Rich Description"
          />
          <FormControl sx={{ pb: 2 }} required>
            <InputLabel id="demo-multiple-name-label">Book Category</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={categoryName}
              onChange={handleChange}
              input={<OutlinedInput label="Book Category" />}
              MenuProps={MenuProps}
            >
              {categories.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, categoryName, theme)}
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
            label="Book Image"
            fullWidth
            width="100%"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth required>
            <InputLabel htmlFor="outlined-adornment-amount">
              Rent Price
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">Rs.</InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
          <Button className="mt-2 fs-5 fw-bold" variant="contained" endIcon={<AddCircleIcon className="fs-3" />}>
            Add a Book
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default AddBook;
