import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";

let socket;
const ENDPOINT = "localhost:5000";

export const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, ({ result }) => {
      if (result === "ok") {
        socket.on("message", (message) => {
          setMessages((messages) => [...messages, message]);
        });
      }
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [location.search]);

  const sendMessage = (event) => {
    if (event.key === "Enter") {
      console.log(message);
      event.preventDefault();
      console.log(message);
      if (message) {
        socket.emit("sendMessage", message, () => setMessage(""));
      }
    }
  };

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={sendMessage}
        />
      </div>
    </div>
  );
};
