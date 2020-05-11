import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import "./Chat.css";
import { Messages } from "../Messages/Messages";

let socket;
const ENDPOINT = "localhost:5000";
export const Chat = ({ location }) => {
  const [isInitalased, setIsInitialised] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState();

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    socket.on("allMessages", (allMessages) => {
      setMessages(allMessages);
    });
    socket.emit("init", name, (access = false) => {
      console.log(access, name);
      if (access) {
        setIsInitialised(true);
        socket.on("message", (message) => {
          setMessages((msgs) => [...msgs, message]);
        });
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [location]);

  const sendMessage = (event) => {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      console.log(name);
      event.preventDefault();
      const msg = {
        name: name,
        text: message,
        time: new Date().toLocaleTimeString(),
      };
      setMessages((msgs) => [...msgs, msg]);
      if (msg) {
        socket.emit("sendMessage", msg, () => setMessage(""));
      }
    }
  };

  if (!isInitalased) {
    return <div>Загурзка...</div>;
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <div className="chat">
          <Messages messages={messages} userName={name} />
        </div>
        <input
          className="input"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={sendMessage}
          placeholder="Your Message"
        />
      </div>
    </div>
  );
};
