import React from "react";
import styles from "./Button.module.scss";

function Button(props) {
  return (
    <button
      className={styles.Button}
      style={{
        backgroundColor: props.Bg,
        color: props.textColot,
        width: props.w,
        height: props.h,
        border: props.border,
      }}
      onClick={props.handleLogin}
    >
      {props.text}
    </button>
  );
}

export default Button;
