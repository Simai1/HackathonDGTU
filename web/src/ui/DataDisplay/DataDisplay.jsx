import React from 'react';
import style from "./DataDisplay.module.scss"
function DataDisplay(props) {
  return (
    <table className={style.DataDisplay}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Продукт</th>
          <th>Адрес</th>
          <th>Годен до</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, index) => (
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.prosd}</td>
            <td>{item.adress}</td>
            <td className={style.date}>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataDisplay;
