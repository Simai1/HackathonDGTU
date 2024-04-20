import React from "react";
import styles from "./Transfer.module.scss";
import Button from "../../ui/Button/Button";

function Transfer(props) {
  return (
   <div>
        <h1>Перевозки</h1>
        <div>
            <div>
                <Button text="Грядущие"  Bg="#F37022"  w="127px" h="42px" textColot="#fff"/>
                <Button text="Активные"  Bg="#fff"  w="127px" h="42px" textColot="#000"/>
            </div>
            <table>
                <thead>
                    <tr>
                    <th>Перевозчик</th>
                    <th>Откуда</th>
                    <th>Куда</th>
                    <th>Товары</th>
                    <th>Дата</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr >
                        <td>{item.name}</td>
                        <td>{item.from}</td>
                        <td>{item.to}</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
   </div>

  );
}

export default Transfer;
