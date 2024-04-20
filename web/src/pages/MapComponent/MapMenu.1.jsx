import React, { useState } from "react";
import styles from "./Styles.module.scss";
import { Link } from "react-router-dom";

export function MapMenu(props) {
  const [filtredData, setFiltredData] = useState(props.listPoints);

  const shearch = (el) => {
    console.log(el.target.value);
    const query = el.target.value;
    const fd = props.listPoints;
    setFiltredData(
      fd.filter((item) =>
        item.properties.iconCaption.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div className={styles.MapMenu}>
      <div className={styles.back}>
        <Link style={{ textDecoration: "none" }} to="/">
          <img width={22} src="./img/arrow.png" alt="<" />
          <span>Назад</span>
        </Link>
      </div>
      <div className={styles.shearch}>
        <input placeholder="Поиск..." type="text" onChange={shearch} />
      </div>
      <div className={styles.container}>
        <div>
          {filtredData.map((item) => (
            <span key={item.id} className={styles.MapMenu_span}>
              {item.properties.iconCaption}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
