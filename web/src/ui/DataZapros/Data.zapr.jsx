import React from 'react';
import style from "./DataZapr.module.scss"
function DataZapr(props) {
  return (
    <table className={style.DataZapr}>
      <thead>
        <tr>
          <th>Перевозчик</th>
          <th>Откуда</th>
          <th>Куда</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.from}</td>
            <td>{item.to}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataZapr;
