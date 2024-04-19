import React, { useContext } from "react";
import styles from "./ProfileUser.module.scss";
import DataContext from "../../context";

function ProfileUser() {
    const {UserData} = useContext(DataContext)

  return (
  <div className={styles.ProfileUser}>
    <div className={styles.ProfileUser__inner}>
        <div>
            <p>{UserData.user.name}</p>
        </div>
    </div>
  </div>
  );
}

export default ProfileUser;
