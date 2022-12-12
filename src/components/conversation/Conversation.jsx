import "./conversation.scss";

export default function Conversation({ conversation, currentuser }) {
  var convuser;
  for (var i = 0; i < conversation.members.length; i++) {
    if (currentuser !== conversation.members[i]) {
      convuser = conversation.members[i];
    }
  }
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-21.jpg"
        alt=""
      />
      <span className="conversationName">{convuser}</span>
    </div>
  );
}
