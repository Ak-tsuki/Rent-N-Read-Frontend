import React from "react";
import not_found from "../assets/404page.svg";
const NotFound = () => {
  return (
    <div className="not-found">
      <img src={not_found} alt="not_found_image" className="not-found__image" />
    </div>
  );
};

export default NotFound;
