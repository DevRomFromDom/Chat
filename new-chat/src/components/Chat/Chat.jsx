import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import { outerContainer, container, chatInput } from "./Chat.module.scss";
import { Messages } from "../Chat/Messages/Messages";
import NavBar from "./NavBar/NavBar";
import Loader from "./Loader/Loader";

let socket;

export const UserInfoContext = React.createContext();

export const Chat = ({ location }) => {
    const [user, setUser] = useState();
    const [isInitalased, setIsInitialised] = useState(false);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState();

    

    useEffect(() => {
        const { name } = queryString.parse(location.search);
        socket = io();
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
                const fetchUserInfo = async () => {
                    const getUser = await fetch("/api/userId", {
                        method: "POST",
                        body: JSON.stringify(name),
                        headers: { "Content-Type": "application/json" },
                    }).then((res) => res.json());
                    if (getUser) {
                        // console.log(getUser)
                        setUser(getUser);
                    }
                };
                fetchUserInfo();
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
                userId: user.userId,
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
        return <Loader />;
    }

    return (
        <>
            <UserInfoContext.Provider value = {user}>
                <NavBar />
                <div className={outerContainer}>
                    {/* <Menu name={name} userInfo={user} /> */}
                    <div className={container}>
                        <Messages messages={messages} userInfo={user} />
                        <input
                            className={chatInput}
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            onKeyDown={sendMessage}
                            placeholder="Your Message"
                        />
                    </div>
                </div>
            </UserInfoContext.Provider>
        </>
    );
};
