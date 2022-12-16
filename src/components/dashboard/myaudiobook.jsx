import React, { useState, useEffect } from "react";

import AudioBookCard from "../myaudiobook/myaudiobook";

import axios from "axios";

const MyAudioBooks = () => {
  const [currentTab, setCurrentTab] = useState("Myaudiobook");
  const [myaudiobook, setMyAudiobook] = useState([]);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  useEffect(() => {
    axios.get("http://localhost:90/boughtaudiobook/get", config).then((res) => {
      console.log(res.data);
      setMyAudiobook(res.data.data);
      console.log(myaudiobook);
    });
  }, []);

  return (
    <div className="mybooks-container">
      <div className="tabs">
        <div
          className={`tabs__tab ${
            currentTab === "Myaudiobook" && "tabs__tab--open"
          }`}
          onClick={() => setCurrentTab("Myaudiobook")}
        >
          My Audio Books ({myaudiobook.length})
        </div>
      </div>
      <div>
        {currentTab === "Myaudiobook" &&
          myaudiobook.map((book) => <AudioBookCard book={book} />)}
      </div>
    </div>
  );
};

export default MyAudioBooks;
