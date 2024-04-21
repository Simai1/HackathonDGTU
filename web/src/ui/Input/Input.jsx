import React from "react";
import styles from "./input.module.scss";

function Input(props) {
  
    const setDatafunc = (el)=>{
        props.setData(el.target.value)
    }
    
  return (
    <div className={styles.input}>
        <label>{props.labelText}</label>
        <br/>
        <input placeholder={props.placeholder} type={props.type} onChange={setDatafunc} defaultValue={props.defaultValue}/>
    </div>
  );
}

export default Input;
