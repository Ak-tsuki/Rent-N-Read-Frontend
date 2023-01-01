import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.scss";

export default function Conversation({ conversation, currentuser }) {
  var convuser;
  const [userimg, setUserimg] = useState("");

  for (var i = 0; i < conversation.members.length; i++) {
    if (currentuser !== conversation.members[i]) {
      convuser = conversation.members[i];
    }
  }
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
  }, []);
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          userimg
            ? `http://localhost:90/${userimg}`
            : "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-21.jpg"
        }
        alt=""
      />
      <span className="conversationName">{convuser}</span>
    </div>
  );
}
