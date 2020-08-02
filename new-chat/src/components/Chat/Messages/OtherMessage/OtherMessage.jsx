import React from "react";
import {
    messageContainer,
    messageInfo,
    userName,
    messageTime,
    messageText,
    avatar,
} from "./OtherMessage.module.scss";

export const OtherMessage = ({ message, userInfo }) => {
    return (
        <div className={messageContainer}>
            <div className={avatar}></div>
            <div>
                <div className={messageInfo}>
                    <div className={userName}>{message.name}</div>
                    <div className={messageTime}>{message.time}</div>
                </div>
                <div className={messageText}>{message.text}</div>
            </div>
        </div>
    );
};

export default OtherMessage;
