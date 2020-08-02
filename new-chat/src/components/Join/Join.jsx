import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./Join.css";
export const Join = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const signIn = async () => {
        if (name) {
            const isUserExists = await fetch("/api/join", {
                method: "POST",
                body: JSON.stringify({ name }),
                headers: { "Content-Type": "application/json" },
            }).then((res) => res.json());
            if (isUserExists) {
                history.push(`/chat?name=${name}`);
            }
        }
    };
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input
                        placeholder="Name"
                        className="joinInput"
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <button className="button" type="button" onClick={signIn}>
                    Sign in
                </button>
            </div>
        </div>
    );
};
