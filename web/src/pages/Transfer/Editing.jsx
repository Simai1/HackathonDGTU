import React, { useState } from "react";
import styles from "./Transfer.module.scss";
import Button from "../../ui/Button/Button";

function Editing(props) {
  const [storShow, setStorShow] = useState(false);
  const bobfun = (ind) => {
    setStorShow(false);
    let data = props.editingShowData;
    data.from = `Склад ${ind}`;
    props.setEditingShowData(data);
  };
  return (
    <div className={styles.Editing}>
      <div className={styles.container}>
        <h6>Редактирование</h6>
        <div>
          <span className={styles.title}>Откуда</span>
          <div
            style={storShow ? { opacity: "0" } : null}
            onClick={() => setStorShow(!storShow)}
            className={styles.storage}
          >
            <span>{props.editingShowData?.from}</span>
            <img width={12} src="./img/arrow_bottom.png" alt="<"></img>
          </div>
          {storShow && (
            <div className={styles.bobmenu}>
              <span onClick={() => bobfun(1)}>Склад 1</span>
              <span onClick={() => bobfun(2)}>Склад 2</span>
              <span onClick={() => bobfun(3)}>Склад 3</span>
            </div>
          )}

          <span className={styles.title2}>Товары</span>
          <div className={styles.table}>
            <table>
              {props.editingShowData.product.map((item) => (
                <tr key={item}>
                  <td className={styles.name}>{item}</td>
                  <td className={styles.god}>
                    <div className={styles.god_inner}>
                      {props.editingShowData?.date}
                    </div>
                  </td>
                  <td className={styles.inp}>
                    <input type="number" defaultValue={Number(200)}></input>
                    <span>шт</span>
                  </td>
                  <td className={styles.crst}>
                    <img src="./img/krst.png" alt=">" />
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <div className={styles.buttons}>
            <div className={styles.buttons_inner}>
              <Button
                handleLogin={props.modalShowFun}
                text="Отменить"
                w="142px"
                h="52px"
                Bg="#fff"
                border="1px solid grey"
              />
            </div>
            <div className={styles.buttons_inner}>
              <Button
                handleLogin={props.modalShowFun}
                text="Применить"
                Bg="#F37022"
                w="200px"
                h="52px"
                textColot="#fff"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editing;
