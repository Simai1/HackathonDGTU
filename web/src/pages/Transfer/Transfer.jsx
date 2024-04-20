import React, { useState } from "react";
import style from "./Transfer.module.scss";
import Button from "../../ui/Button/Button";
import deleteImg from "./../../img/deleteImg.svg";
import redaction from "./../../img/redaction.svg";
import Editing from "./Editing";

function Transfer(props) {
  const [activeButton, setActiveButton] = useState("Ожидаемые");
  const [editingShow, setEditingShow] = useState(false);
  const [editingShowData, setEditingShowData] = useState([]);

  const modalShowFun = () => {
    setEditingShow(false);
    setEditingShowData([]);
  };

  const onClrickRed = (item) => {
    setEditingShow(!editingShow);
    let data = { ...item }; // Make a copy of item to avoid mutating the original
    if (typeof data.product === "string") {
      const words = data.product.split(",").map((word) => word.trim());
      data.product = words;
      console.log(data);
      setEditingShowData(data);
    }
  };

  const handleButtonClick = (text) => {
    console.log(text);
    setActiveButton(text === "Ожидаемые" ? "Активные" : "Ожидаемые");
  };
  return (
    <div>
      <h1>Перевозки</h1>
      <div>
        <div
          style={{
            display: "flex",
            width: " 270px",
            justifyContent: "space-between",
          }}
        >
          <Button
            text="Ожидаемые"
            Bg={activeButton === "Ожидаемые" ? "#F37022" : "#fff"}
            w="127px"
            h="42px"
            textColot={activeButton === "Ожидаемые" ? "#fff" : "#000"}
            handleLogin={() => handleButtonClick("Активные")}
            // onClick={() => handleButtonClick("Ожидаемые")}
          />
          <Button
            text="Активные"
            Bg={activeButton === "Активные" ? "#F37022" : "#fff"}
            w="127px"
            h="42px"
            textColot={activeButton === "Активные" ? "#fff" : "#000"}
            handleLogin={() => handleButtonClick("Ожидаемые")}
          />
        </div>
        <div className={style.TableScroll}>
          <table>
            <thead>
              <tr>
                <th className={style.thFirst}>Перевозчик</th>
                <th>Откуда</th>
                <th>Куда</th>
                <th>Товары</th>
                <th>Дата</th>
                <th></th>
                <th className={style.thLast}></th>
              </tr>
            </thead>

            <tbody>
              {props.data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.from}</td>
                  <td>{item.to}</td>
                  <td>{item.product}</td>
                  <td>{item.date}</td>
                  <td>
                    <img
                      onClick={() => onClrickRed(item)}
                      src={deleteImg} alt="deleteImg"
                    ></img>
                  </td>
                  <td>
                    <img src={redaction} alt="redaction"></img>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editingShow && (
        <Editing
          editingShowData={editingShowData}
          modalShowFun={modalShowFun}
          setEditingShowData={setEditingShowData}
        />
      )}
    </div>
  );
}

export default Transfer;
