import React, { useState, useEffect } from "react";
import Message from "./Message";
import "../css/chatroom.css";
import db from "../js/firebase";
import firebase from "firebase";

const ChatRoom = (props) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");

  // Key for remdering react child components (Message Component)
  let key = 0;

  // Set Room ID and PlayerName in state variable
  useEffect(() => {
    setUserName(props.username);
  }, []);

  //runs when app component loads and gets all the data from DB
  useEffect(() => {
    db.collection(props.id)
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  // Scroll to bottom of the page
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  // Update Message data in DB
  const sendMessage = (e) => {
    e.preventDefault();

    // push the remote message to the DB
    db.collection(props.id).add({
      username: userName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      msg: input,
    });

    // Empty the messages in the state
    setInput("");
  };

  return (
    <div className="chatroom">
      {/* messages */}
      <div id="message-box">
        {messages.map((message) => (
          <Message message={message} key={key++} />
        ))}
        <div style={{ height: "75px" }}></div>
      </div>
      {/* Input field */}
      <div className="chatbox">
        <form id="chatbox">
          <input
            value={input}
            placeholder="Start Typing..."
            className="rounded-pill"
            id="chatinput"
            onChange={(event) => setInput(event.target.value)}
          />
          {/* send button */}
          <button
            disabled={!input}
            type="submit"
            onClick={sendMessage}
            className="btn btn-primary mx-2 rounded-pill"
            id="chat-btn"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
