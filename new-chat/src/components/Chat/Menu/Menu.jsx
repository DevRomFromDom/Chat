import React from "react";
import { menuContainer, avatar } from "./Menu.module.scss";

export const Menu = ({ name, userInfo }) => {
    const getBase64Image = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                resolve(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        });
    };

    const changeAvatar = async (event) => {
        try {
            const file = event.target.files[0];
            const base64Image = await getBase64Image(file);
            addAvatar(base64Image);
        } catch (error) {
            console.log(error);
        }
    };

    const addAvatar = async (base64Image) => {
        const newAvatar = new FormData();
        newAvatar.set("file", base64Image);
        newAvatar.set("userName", name);
        const avatarResponse = await fetch("/api/avatar", {
            method: "POST",
            body: newAvatar,
        }).then((res) => res.json());
    };

    const thisUser = new Object(userInfo)
    return (
        <div className={menuContainer}>
            <img src={thisUser.avatar} className={avatar}/>
            <input
                type="file"
                accept="image/*"
                onChange={(event) => changeAvatar(event)}
            />
        </div>
    );
};

export default Menu;
