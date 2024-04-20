import React, { useContext } from "react";
import styles from "./ProfileUser.module.scss";
import DataContext from "../../context";
import uwedomletion from "./../../img/uwedomletion.svg";
import userImg from "./../../img/userImg.svg";

function ProfileUser() {
    const {UserData} = useContext(DataContext)

  return (
  <div className={styles.ProfileUser}>
    <div className={styles.ProfileUser__inner}>
            <div>
                <img  className={styles.ProfileUser__imgUwedomletion} src={uwedomletion}></img>
                <img src={userImg}></img>
            </div>
            <div className={styles.ProfileUser__DataUser}>
                <p className={styles.ProfileUser__DataUserName} >{UserData.user.name}</p>
                <p className={styles.ProfileUser__DataUserrole}>{UserData.user.role}</p>
            </div>
         
    </div>
  </div>
  );
}

export default ProfileUser;
