import React, { useContext, useState, useEffect, useRef } from "react";
import styles from "./ProfileUser.module.scss";
import DataContext from "../../context";
import userImg from "./../../img/userImg.svg";
import ExitAccount from "../ExitAccount/ExitAccount";

function ProfileUser() {
    const { UserData } = useContext(DataContext);
    const [openExitMenu, setOpenExitMenu] = useState(false);
    const exitMenuRef = useRef();

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (exitMenuRef.current && !exitMenuRef.current.contains(event.target)) {
            setOpenExitMenu(false);
        }
    };

    return (
        <div className={styles.ProfileUser}>
            <div className={styles.ProfileUser__inner}>
                <div>
                    <img
                        className={styles.ProfileUser__imgUser}
                        src={userImg}
                        onClick={() => setOpenExitMenu(!openExitMenu)}
                        alt="img"
                    ></img>
                </div>
                <div className={styles.ProfileUser__DataUser}>
                    <p className={styles.ProfileUser__DataUserName}>{UserData.user.name}</p>
                    <p className={styles.ProfileUser__DataUserrole}>{UserData.user.role}</p>
                </div>
            </div>
            <div ref={exitMenuRef}>
                {openExitMenu && <ExitAccount />}
            </div>
        </div>
    );
}

export default ProfileUser;
