import React, {useState, useEffect, useContext} from "react";
import {UserInfoContext} from "../Chat";
import { chat } from "./Messages.module.scss";
import UserMessage from "./UserMessage/UserMessage";
import OtherMessage from "./OtherMessage/OtherMessage";
import Loader from "../Loader/Loader";

export  const Messages = ({ messages }) => {

    const userInfo = useContext(UserInfoContext);
    const [loader, setLoader] = useState(true);

    
    useEffect(()=>{
            if(userInfo == undefined){
                setLoader(true)
            }else setLoader(false)
    },[userInfo])
    
    if(loader){
        return <Loader/>
    } else return (
               <div className={chat}>
                   {messages
                       ? messages.map((message, index) => {
                             if (message.text !== undefined) {
                                 return (
                                     <div key={index}>
                                         {userInfo.userId === message.userId ? (
                                             <UserMessage message={message} />
                                         ) : (
                                             <OtherMessage message={message} />
                                         )}
                                     </div>
                                 );
                             }
                         })
                       : null}
               </div>
           );
        };
