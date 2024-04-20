
import React from "react";
import style from "./HomePageData.module.scss";
import ProgressBar from "../../ui/progress/ProgressBar";
import DataDisplay from "../../ui/DataDisplay/DataDisplay";
import DataZapr from "../../ui/DataZapros/Data.zapr";

function HomePageData(props) {


  const testData = [
    { bgcolor: "#F37022", completed: 15 },
    { bgcolor: "#F37022", completed: 30 },
    { bgcolor: "#F37022", completed: 55 },
    { bgcolor: "#F37022", completed: 80 },
  ];

  const DataPortTest = [
    { id: "1220393", prosd: "Киви", adress: "Склад 1", date: "10.04.2023" },
    { id: "123213", prosd: "Манго", adress: "Склад 2", date: "10.04.2023" },
    { id: "1284323", prosd: "Хлеб", adress: "Склад 3", date: "10.04.2023" },
    { id: "12311033", prosd: "Морс яблочный", adress: "Склад 4", date: "10.04.2023" }
  ];

  const DataZaprosTest = [
    { name: "Иванов Вася", from: "Склад 1", to: "Клиент 3"},
    { name: "Иванов Вася", from: "Склад 2", to: "Клиент 5"},
    { name: "Иванов Вася", from: "Склад 1", to: "Склад 3"},
    { name: "Иванов Вася", from: "Склад 3", to: "Клиент 8"}
  ];


  return (
   <div>
    <h1>Склады</h1>
    
    <div className={style.HomePage__table}>
      <div className={style.HomePage__table__inner}>
        <h3>Заполненность</h3>
        <div>
          <div>
            {testData.map((item, idx) => (
              <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} idx={idx} />
            ))}
    
            </div>
        </div>
      </div>
      <div className={style.HomePage__table__inner}>
        <h3>Скоро испортится</h3>
        <div>
              <DataDisplay data={DataPortTest}/>
        </div>
      </div>
    </div>
    
    <div className={style.HomePage__zapr}>
    <h1>Запросы</h1>
    
    <div classDataZaprosTestName={style.HomePage__table}>
          <div className={style.HomePage__table__inner}>
            <h3> Подтвержденные запросы</h3>
            <div>
              <DataZapr data={DataZaprosTest} />
            </div>
          </div>
          
      </div>
    </div>
    
    <div className={style.HomePage__zapr}>
    <h1>Перевозки</h1>
    
    <div classDataZaprosTestName={style.HomePage__table}>
          <div className={style.HomePage__table__inner}>
            <h3> Активные</h3>
            <div>
            </div>
          </div>
          
      </div>
    </div>
    
    </div>
  );
}

export default HomePageData;

