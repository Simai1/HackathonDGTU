import React, { useState } from "react";
import style from "./Transfer.module.scss";
import Button from "../../ui/Button/Button";
import deleteImg from "./../../img/deleteImg.svg"
import redaction from "./../../img/redaction.svg"

function Transfer(props) {
    const [activeButton, setActiveButton] = useState("Грядущие");

  const handleButtonClick = (text) => {
    console.log(text)
    setActiveButton(text === "Грядущие" ? "Активные" : "Грядущие");
  };
  return (
   <div>
        <h1>Перевозки</h1>
        <div>
            <div>
            <Button
                text="Грядущие"
                Bg={activeButton === "Грядущие" ? "#F37022" : "#fff"}
                w="127px"
                h="42px"
                textColot={activeButton === "Грядущие" ? "#fff" : "#000"}
                handleLogin={()=>handleButtonClick("Активные")}
                // onClick={() => handleButtonClick("Грядущие")}
          />
          <Button
            text="Активные"
            Bg={activeButton === "Активные" ? "#F37022" : "#fff"}
            w="127px"
            h="42px"
            textColot={activeButton === "Активные" ? "#fff" : "#000"}
            handleLogin={()=>handleButtonClick("Грядущие")}
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
                                <th >Дата</th>
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
                                <td><img src={deleteImg}></img></td>
                                <td><img src={redaction}></img></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
   </div>
  );
}

export default Transfer;
