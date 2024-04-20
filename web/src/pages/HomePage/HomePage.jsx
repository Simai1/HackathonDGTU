import React, { useState } from 'react';
import LeftMenu from '../../ui/LeftMenu/LeftMenu.jsx';
import ProfileUser from '../../ui/ProfileUser/ProfileUser.jsx';
import style from "./HomePage.module.scss";
import HomePageData from '../HomePageData/HomePageData.jsx';
import Transfer from '../Transfer/Transfer.jsx';
import Warehouse from '../Warehouse/Warehouse.jsx';

const HomePage = () => {
  const [activeMenu, setActiveMenu] = useState("Главная"); // Используем хук useState для хранения активного пункта меню

  const DataZaprosTesting = [
    { name: "Иванов Вася", from: "Склад 1", to: "Клиент 3", product:"Киви, яблоки, сок апельсиновый, морс яблочный", date:"25.04.2024"},
    { name: "Иванов Вася", from: "Склад 1", to: "Клиент 3", product:"Киви, яблоки, сок апельсиновый, морс яблочный", date:"25.04.2024"},
    { name: "Иванов Вася", from: "Склад 1", to: "Клиент 3", product:"Киви, яблоки, сок апельсиновый, морс яблочный", date:"25.04.2024"},
    { name: "Иванов Вася", from: "Склад 1", to: "Клиент 3", product:"Киви, яблоки, сок апельсиновый, морс яблочный", date:"25.04.2024"},
    { name: "Иванов Вася", from: "Склад 1", to: "Клиент 3", product:"Киви, яблоки, сок апельсиновый, морс яблочный", date:"25.04.2024"},
    { name: "Иванов Вася", from: "Склад 1", to: "Клиент 3", product:"Киви, яблоки, сок апельсиновый, морс яблочный", date:"25.04.2024"},
    { name: "Иванов Вася", from: "Склад 1", to: "Клиент 3", product:"Киви, яблоки, сок апельсиновый, морс яблочный", date:"25.04.2024"},
    { name: "Иванов Вася", from: "Склад 1", to: "Клиент 3", product:"Киви, яблоки, сок апельсиновый, морс яблочный", date:"25.04.2024"},
    { name: "Иванов Вася", from: "Склад 1", to: "Клиент 3", product:"Киви, яблоки, сок апельсиновый, морс яблочный", date:"25.04.2024"},
    { name: "Иванов Вася", from: "Склад 1", to: "Клиент 3", product:"Киви, яблоки, сок апельсиновый, морс яблочный", date:"25.04.2024"},
    { name: "Иванов Вася", from: "Склад 1", to: "Клиент 3", product:"Киви, яблоки, сок апельсиновый, морс яблочный", date:"25.04.2024"},
    { name: "Иванов Вася", from: "Склад 1", to: "Клиент 3", product:"Киви, яблоки, сок апельсиновый, морс яблочный", date:"25.04.2024"},
    { name: "Иванов Вася", from: "Склад 1", to: "Клиент 3", product:"Киви, яблоки, сок апельсиновый, морс яблочный", date:"25.04.2024"},
    { name: "Иванов Вася", from: "Склад 1", to: "Клиент 3", product:"Киви, яблоки, сок апельсиновый, морс яблочный", date:"25.04.2024"},
    { name: "Иванов Вася", from: "Склад 1", to: "Клиент 3", product:"Киви, яблоки, сок апельсиновый, морс яблочный", date:"25.04.2024"}
  ];

  return (
    <div className={style.HomePage}>
      <LeftMenu setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
      {/* <ProfileUser/> */}
      <div className={style.HomePage__inner}>
      {activeMenu === "Главная" &&(
        <HomePageData/>
      )}
       {activeMenu === "Склады" &&(
        <Warehouse/>
      )}
      {activeMenu === "Запросы" &&(
        <Transfer data={DataZaprosTesting}/>
      )}
     </div>
    </div>
  );
};



export default HomePage;
