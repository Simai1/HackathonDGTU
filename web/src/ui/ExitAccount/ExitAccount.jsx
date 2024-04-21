import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./ExitAccount.module.scss";
import DataContext from "../../context";
import Exit from "./../../img/exit.svg"

function ExitAccount() {
    const { setUserData } = useContext(DataContext);
    const navigate = useNavigate();

    const ExitAcc = () => {
        setUserData(null);
        navigate('/');
    }

    return (
        <div className={styles.ExitAccount}>
            <button onClick={ExitAcc}>
                <img src={Exit} alt="exit"></img>
            </button>
        </div>
    );
}

export default ExitAccount;
