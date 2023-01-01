import "./message.scss";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Message({ message, own, senderuser }) {
  var convuser;

  const [userimg, setUserimg] = useState("");
  const user = localStorage.getItem("username");
  if (user !== senderuser) {
    convuser = senderuser;
  }
  console.log(convuser);
  useEffect(() => {
    axios
      .get("http://localhost:90/conversation/get_userimg/" + convuser)
      .then((res) => {
        console.log(res.data.data);
        setUserimg(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [convuser]);
  return (
    <>
      {own ? (
        <div className="message own">
          <div className="messageTop">
            <p className="messageText">{message.text}</p>
          </div>
          <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
      ) : (
        <div className="message">
          <div className="messageTop">
            <img
              className="messageImg"
              src={
                userimg
                  ? `http://localhost:90/${userimg}`
                  : "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-21.jpg"
              }
              //
              alt=""
            />
            <div>
              <p className="messageText">{message.text}</p>
              <div className="messageBottom">{format(message.createdAt)}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
