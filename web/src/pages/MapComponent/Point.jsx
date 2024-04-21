import React from "react";
import styles from "./Styles.module.scss";
import { Placemark } from "react-yandex-maps";
import "./stye.css";
function Point(props) {
  const title = `<div class="iconCaption"> ${props.iconCaption} </div>`;
  return (
    <div className={styles.Point}>
      <Placemark
        onClick={(event) => props.handleClick(event, props.id)}
        geometry={props.coor}
        properties={{
          iconContent: title,
        }}
        options={{
          iconColor: `${props.iconColor}`,
          iconImageHref: props.icomUrl, // Путь к вашему изображению
          iconLayout: "default#imageWithContent",
          iconImageSize: [30, 30], // Размеры изображения
          iconImageOffset: [-3, -42],
        }}
      />
    </div>
  );
}

export default Point;
