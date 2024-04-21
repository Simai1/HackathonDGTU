import React from "react";
import styles from "./LeftMenu.module.scss";
import { Link } from "react-router-dom";

function LeftMenu(props) {
  const handleMenuClick = (menuName) => {
    props.setActiveMenu(menuName); // Функция для обновления активного пункта меню при клике
  };

  return (
    <div className={styles.LeftMenu}>
      <div className={styles.LeftMenu__inner}>
        <div>
          <img src="./img/logo.svg" alt="logo" className={styles.logo}></img>
          <ul className={styles.LeftMenu__list}>
            <li
              style={{
                backgroundColor:
                  props.activeMenu === "Главная" ? "#F3702233" : "#FFFFFF",
              }}
              onClick={() => handleMenuClick("Главная")}
            >
              Главная
            </li>
            <Link to={"/map"}>
              <li
                style={{
                  backgroundColor:
                    props.activeMenu === "Карта" ? "#F3702233" : "#FFFFFF",
                }}
                onClick={() => handleMenuClick("Карта")}
              >
                Карта
              </li>
            </Link>
            <li
              style={{
                backgroundColor:
                  props.activeMenu === "Склады" ? "#F3702233" : "#FFFFFF",
              }}
              onClick={() => handleMenuClick("Склады")}
            >
              Склады
            </li>
            <li
              style={{
                backgroundColor:
                  props.activeMenu === "Запросы" ? "#F3702233" : "#FFFFFF",
              }}
              onClick={() => handleMenuClick("Запросы")}
            >
              Запросы
            </li>
            <li
              style={{
                backgroundColor:
                  props.activeMenu === "Клиенты" ? "#F3702233" : "#FFFFFF",
              }}
              onClick={() => handleMenuClick("Клиенты")}
            >
              Клиенты
            </li>
            <li
              style={{
                backgroundColor:
                  props.activeMenu === "Аналитика" ? "#F3702233" : "#FFFFFF",
              }}
              onClick={() => handleMenuClick("Аналитика")}
            >
              Аналитика
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LeftMenu;
