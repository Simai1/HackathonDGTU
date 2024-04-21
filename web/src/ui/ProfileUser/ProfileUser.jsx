import React, { useContext, useState } from "react";
import styles from "./ProfileUser.module.scss";
import DataContext from "../../context";
import uwedomletion from "./../../img/uwedomletion.svg";
import userImg from "./../../img/userImg.svg";
import ExitAccount from "../ExitAccount/ExitAccount";

function ProfileUser() {
    const {UserData} = useContext(DataContext)
    const [openExitMenu, setopenExitMenu] = useState(false)

  return (
  <div className={styles.ProfileUser}>
    <div className={styles.ProfileUser__inner}>
            <div>
                <img  className={styles.ProfileUser__imgUwedomletion} src={uwedomletion} alt="img"></img>
                <img className={styles.ProfileUser__imgUser} src={userImg} onClick={()=>setopenExitMenu(!openExitMenu)} alt="img"></img>
            </div>
            <div className={styles.ProfileUser__DataUser}>
                <p className={styles.ProfileUser__DataUserName} >{UserData.user.name}</p>
                <p className={styles.ProfileUser__DataUserrole}>{UserData.user.role}</p>
            </div>
         
    </div>
    {openExitMenu&&(
        <ExitAccount/>
    )}
  </div>
  );
}

export default ProfileUser;
