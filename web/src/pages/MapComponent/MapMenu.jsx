import React, { useEffect, useState } from "react";
import styles from "./Styles.module.scss";
import { Link } from "react-router-dom";

function MapMenu(props) {
  const [filtredData, setFiltredData] = useState(props.listPoints);
  const [sortData, setSortData] = useState(props.listPoints);
  const [modalWindShow, setModalWindShow] = useState("Все");
  const [modalWindText, setmodalWindText] = useState(false);
  console.log(props.listPoints);

  useEffect(() => {
    const fd = props.listPoints;
    if (modalWindShow === "Все") {
      setSortData(fd);
    }
    if (modalWindShow === "Склады") {
      setSortData(
        fd.filter((item) => item.properties["marker-color"] === "#1e98ff")
      );
    } else if (modalWindShow === "Клиенты") {
      setSortData(
        fd.filter((item) => item.properties["marker-color"] !== "#1e98ff")
      );
    }
  }, [modalWindShow]);
  useEffect(() => {
    setFiltredData(sortData);
  }, [sortData]);

  const shearch = (el) => {
    console.log(el.target.value);
    const query = el.target.value;
    const fd = sortData;
    setFiltredData(
      fd.filter((item) =>
        item.properties.iconCaption.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const setModalFunck = (text) => {
    setModalWindShow(text);
    setmodalWindText(false);
  };

  const onHandleItem = (item) => {
    props.handleClickMenu([
      props.listPoints[item.id].geometry.coordinates[1],
      props.listPoints[item.id].geometry.coordinates[0],
    ]);
    props.setActiveItem(item.id);
  };

  // const funMarshrut = () => {
  //   const pointB = [
  //     props.listPoints[0].geometry.coordinates[1],
  //     props.listPoints[0].geometry.coordinates[0],
  //   ]; // координаты точки А
  //   const pointA = [
  //     props.listPoints[1].geometry.coordinates[1],
  //     props.listPoints[1].geometry.coordinates[0],
  //   ]; // координаты точки Б
  //   console.log(pointB, pointA);
  //   const url = `https://yandex.ru/maps/?rtext=${pointA}~${pointB}&rtt=auto`;

  //   window.open(url, "_blank");
  // };

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
      <div className={styles.button_block}>
        <div className={styles.button_container}>
          <div
            className={styles.all}
            onClick={() => setmodalWindText(!modalWindText)}
          >
            <span>{modalWindShow}</span>
            <img width={10} src="./img/arrow_bottom.png" alt=">"></img>
          </div>
        </div>
        <div className={styles.but_add}>Добавить</div>
      </div>
      {/* <button onClick={funMarshrut}>Маршрут </button> */}
      {modalWindText && (
        <div className={styles.modalWind}>
          <span onClick={() => setModalFunck("Все")}>Все</span>
          <span onClick={() => setModalFunck("Склады")}>Склады</span>
          <span onClick={() => setModalFunck("Клиенты")}>Клиенты</span>
        </div>
      )}
      <div className={styles.container}>
        <div>
          {filtredData.map((item) => (
            <span
              onClick={() => onHandleItem(item)}
              key={item.id}
              className={styles.MapMenu_span}
              style={
                item.id === props.activeItem
                  ? { backgroundColor: "#F36F2247", borderRadius: "8px" }
                  : null
              }
            >
              {item.properties.iconCaption}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MapMenu;
