import React from "react";
import styles from "./Styles.module.scss";
import { Placemark } from "react-yandex-maps";
function Point(props) {
  return (
    <div className={styles.Point}>
      <Placemark
        geometry={props.coor}
        properties={{
          iconCaption: props.iconCaption,
        }}
        options={{
          iconColor: `${props.iconColor}`,
          //   iconImageHref: props.icomUrl, // Путь к вашему изображению
          //   iconLayout: "default#image",
          //   iconImageSize: [30, 30], // Размеры изображения
        }}
      />
    </div>
  );
}

export default Point;
