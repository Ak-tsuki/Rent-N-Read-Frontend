import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import "./listedbook-card.scss";
import { FaChevronCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const ListedBookCard = ({ book }) => {
  const { _id, name, author, rent_cost_perday, book_pic } = book;
  return (
    <Card className="listed-card" sx={{ maxWidth: 260 }}>
      <div className="p-4">
        <CardMedia
          component="img"
          alt="green iguana"
          image={`http://localhost:90/${book_pic}`}
        />
      </div>
      <div className="p-3">
        <p className="book-Name my-2">{name}</p>
        <h2 className="book-Author my-3">{author}</h2>
        <div className="d-flex justify-content-between mt-4">
          <div className="d-flex flex-nowrap mt-3">
            <p className="bookcost">Rs. {rent_cost_perday}</p>
            <p className="bookday">/day</p>
          </div>
          <Link to={"/singlebook/" + _id} className="btn rent-btn mb-3 ms-3">
            <FaChevronCircleRight className="rent-icon" />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ListedBookCard;
