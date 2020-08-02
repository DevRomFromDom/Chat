import React from "react";
import {circle, wave, loading} from "./Loader.module.scss"


export const Loader = () => {
    return (
        <>
            <div className={circle}>
                <div className={wave}></div>
                <div className={loading}>Loading...</div>
            </div>
        </>
    );
};

export default Loader;
