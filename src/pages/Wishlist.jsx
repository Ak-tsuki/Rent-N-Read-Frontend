import React from "react";
import WishlistCard from "../components/wishlist-card/WishlistCard";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import "../components/wishlist-card/wishlist.scss";
const Wishlist = () => {
  return (
    <div className="wishlist">
      <h1 className="wishlist-heading">
        My Wishlist <BsFillBookmarkCheckFill />
      </h1>
      <div className="wishlist-card-container">
        {" "}
        <WishlistCard />
        <WishlistCard />
      </div>
    </div>
  );
};

export default Wishlist;
