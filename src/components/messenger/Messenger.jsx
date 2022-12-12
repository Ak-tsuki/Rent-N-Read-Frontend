import { useEffect, useRef } from "react";
import { useState } from "react";
import Conversation from "../conversation/Conversation";
import Message from "../message/Message";
import { MdSend } from "react-icons/md";
import "./messenger.scss";
import axios from "axios";
import { io } from "socket.io-client";
const Messenger = () => {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

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
      setConversation(res.data.data);
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
      const res = await axios.post("http://localhost:90/message/add", message);
      setMessages([...messages, res.data.data]);
      setNewMessage("");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatmenuWrapper">
            <p className="fs-5 fw-bold text-center">My Conversations</p>
            {conversation.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
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
                  <textarea
                    name="message-to-send"
                    id="message-to-send"
                    placeholder="Type your message"
                    rows="3"
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                    value={newMessage}
                  ></textarea>

                  <button
                    className="btn btn-success text-light float-end"
                    onClick={handleSubmit}
                  >
                    <MdSend className="me-3" />
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Messenger;
