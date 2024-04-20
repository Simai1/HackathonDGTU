import React, { useState } from 'react';
import LeftMenu from '../../ui/LeftMenu/LeftMenu.jsx';
import ProfileUser from '../../ui/ProfileUser/ProfileUser.jsx';
import style from "./HomePage.module.scss";
import ProgressBar from '../../ui/progress/ProgressBar.jsx';
import DataDisplay from '../../ui/DataDisplay/DataDisplay.jsx';
import DataZapr from '../../ui/DataZapros/Data.zapr.jsx';
import HomePageData from '../HomePageData/HomePageData.jsx';
import Transfer from '../Transfer/Transfer.jsx';

const HomePage = () => {
  const [activeMenu, setActiveMenu] = useState("Главная"); // Используем хук useState для хранения активного пункта меню

  return (
    <div className={style.HomePage}>
      <LeftMenu setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
      {/* <ProfileUser/> */}
      <div className={style.HomePage__inner}>
      {activeMenu === "Главная" &&(
        <HomePageData/>
      )}
      {activeMenu === "Запросы" &&(
        <Transfer/>
      )}
     </div>
    </div>
  );
};



export default HomePage;
