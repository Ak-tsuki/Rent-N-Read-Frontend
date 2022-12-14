import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import "./listedbook-card.scss";
import { FaChevronCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const ListedEbookCard = ({ book }) => {
  const { _id, name, author, rent_cost_perday, book_pic, price } = book;
  return (
    <Card className="listed-card" sx={{ width: 180 }}>
      <div className="p-2 d-flex justify-content-center">
        <CardMedia
          component="img"
          className="book-img"
          alt="green iguana"
          image={`http://localhost:90/${book_pic}`}
        />
      </div>
      <div className="p-2">
        <p className="book-Name my-1">{name}</p>
        <h2 className="book-Author my-2">{author}</h2>
        <div className="d-flex justify-content-between mt-2">
          <div className="d-flex flex-nowrap">
            <p className="bookcost">Rs. {price}</p>
          </div>
        </div>
      </div>
      <Link
        to={"/ebooksinglebook/" + _id + "/" + author}
        className="btn rent-btn ms-3"
        onClick={window.location.replace}
      >
        <FaChevronCircleRight className="rent-icon" data-test="Vmore-btn" />
      </Link>
    </Card>
  );
};

export default ListedEbookCard;
