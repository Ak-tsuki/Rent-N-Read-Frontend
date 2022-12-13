import { useEffect, useRef } from "react";
import { useState } from "react";
import Conversation from "../conversation/Conversation";
import Message from "../message/Message";
import { MdSend } from "react-icons/md";
import "./messenger.scss";
import axios from "axios";
import { io } from "socket.io-client";
import no_conversation from "../../assets/no_conversation.svg";
import { BiSearch } from "react-icons/bi";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [allConversations, setAllConversations] = useState([]);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();

  const socket = useRef();
  const user = localStorage.getItem("username");

  useEffect(() => {
    socket.current = io("ws://localhost:90");
    socket.current.on("getMessage", (data) => {
      console.log("1dsfsdf");
      console.log(data);
      setArrivalMessage({
        sender: data.senderusername,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversation = async () => {
      const res = await axios.get(
        "http://localhost:90/conversation/getbyusername/" + user
      );
      setAllConversations(res.data.data);
      setConversations(res.data.data);
    };
    getConversation();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:90/message/getbyconversationId/" + currentChat?._id
        );
        setMessages(res.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage !== "") {
      const message = {
        sender: user,
        text: newMessage,
        conversationId: currentChat._id,
      };
      const receiverusername = currentChat.members.find(
        (member) => member !== user
      );
      socket.current.emit("sendMessage", {
        senderusername: user,
        receiverusername,
        text: newMessage,
      });
      try {
        const res = await axios.post(
          "http://localhost:90/message/add",
          message
        );
        setMessages([...messages, res.data.data]);
        setNewMessage("");
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const searchConversation = (searchQuery) => {
    const searchResult = allConversations.filter(
      (c) =>
        c.members[0].toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.members[1].toLowerCase().includes(searchQuery.toLowerCase())
    );
    setConversations(searchResult);

    if (searchQuery === "") {
      setConversations(allConversations);
    }
  };

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <p className="conversation-heading"> Conversations</p>

          <div className="chatmenuWrapper">
            <div className="search-conversation">
              <input
                className="search-conversation__input"
                placeholder="username"
                onChange={(e) => searchConversation(e.target.value)}
              />
              <BiSearch className="search-conversation__icon" />
            </div>
            {conversations.map((c) => (
              <div
                onClick={() => setCurrentChat(c)}
                data-test="sender-btn"
                className={`${
                  currentChat === c && "conversation-users__active"
                } conversation-users`}
              >
                <Conversation conversation={c} currentuser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user} />
                    </div>
                  ))}
                </div>

                <div class="chat-message clearfix">
                  <form className="chat__form" onSubmit={handleSubmit}>
                    <input
                      className="chat__input"
                      name="message-to-send"
                      id="message-to-send"
                      placeholder="Enter your message"
                      rows="3"
                      onChange={(e) => {
                        setNewMessage(e.target.value);
                      }}
                      value={newMessage}
                      data-test="text"
                    />{" "}
                    <button className="chat__btn" type="submit" data-test="send-btn">
                      Send message <MdSend />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <span className="no-conversation">
                <img
                  src={no_conversation}
                  alt="no_conversation"
                  className="no-conversation__img"
                />
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Messenger;
