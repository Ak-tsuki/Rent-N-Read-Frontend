import React, { useState } from "react";
import WishlistCard from "../components/wishlist-card/WishlistCard";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import "../components/wishlist-card/wishlist.scss";
import axios from "axios";
import { useEffect } from "react";
const Wishlist = () => {
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  useEffect(() => {
    axios
      .get("http://localhost:90/wishlist/get", config)
      .then((res) => {
        console.log(res.data.data);
        setWishlistBooks(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="wishlist">
      <h1 className="wishlist-heading">
        My Wishlist <BsFillBookmarkCheckFill />
      </h1>
      <div className="wishlist-card-container">
        {wishlistBooks.map((book) => (
          <WishlistCard book={book} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
