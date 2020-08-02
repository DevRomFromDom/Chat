import React, { useState } from "react";
import { navbar, icon, userInfo } from "./NavBar.module.scss";
import { ReactComponent as MenuIcon } from "../../../Icons/MenuIcon.svg";
import NavMenu from "./NavMenu/NavMenu";

export const NavBar = () => {
    const [open, setOpen] = useState(false);
    const NavMenuIcon = () => {
        return (
            <>
                <div className={icon} onClick={() => setOpen(!open)}>
                    <a href="#">{<MenuIcon />}</a>
                </div>
                <div className={userInfo}></div>
            </>
        );
    };

    return (
        <>
            <nav className={navbar}>
                <NavMenuIcon />
            </nav>
            {open ? (
                <div>
                    <NavMenu />
                </div>
            ) : null}
        </>
    );
};

export default NavBar;
