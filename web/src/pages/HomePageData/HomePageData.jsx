import React from "react";
import style from "./HomePageData.module.scss";
import ProgressBar from "../../ui/progress/ProgressBar";
import DataDisplay from "../../ui/DataDisplay/DataDisplay";
import DataZapr from "../../ui/DataZapros/Data.zapr";

function HomePageData(props) {
  const testData = [
    { bgcolor: "#F37022", completed: 30 },
    { bgcolor: "#F37022", completed: 55 },
    { bgcolor: "#F37022", completed: 180 },
  ];

  const DataPortTest = [
    { id: "1220393", prosd: "Киви", adress: "Склад 1", date: "10.04.2023" },
    { id: "123213", prosd: "Манго", adress: "Склад 2", date: "10.04.2023" },
    { id: "1284323", prosd: "Хлеб", adress: "Склад 3", date: "10.04.2023" },
    {
      id: "12311033",
      prosd: "Морс яблочный",
      adress: "Склад 4",
      date: "10.04.2023",
    },
  ];

  const DataZaprosTest = [
    { name: "Иванов Вася", from: "Склад 1", to: "Клиент 3" },
    { name: "Иванов Вася", from: "Склад 2", to: "Клиент 5" },
    { name: "Иванов Вася", from: "Склад 1", to: "Склад 3" },
    { name: "Иванов Вася", from: "Склад 3", to: "Клиент 8" },
  ];

  const postavka = [
    {
      name: "Поставка №32",
      stor: "Из склада 2",
      date: "25.04.2024, 13:00",
    },
    {
      name: "Поставка №32",
      stor: "Из склада 2",
      date: "25.04.2024, 13:00",
    },
    {
      name: "Поставка №32",
      stor: "Из склада 2",
      date: "25.04.2024, 13:00",
    },
    {
      name: "Поставка №32",
      stor: "Из склада 2",
      date: "25.04.2024, 13:00",
    },
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
                <ProgressBar
                  key={idx}
                  bgcolor={item.bgcolor}
                  completed={item.completed}
                  idx={idx}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={style.HomePage__table__inner}>
          <h3>Скоро испортится</h3>
          <div>
            <DataDisplay data={DataPortTest} />
          </div>
        </div>
      </div>
      <div className={style.container_box}>
        <div className={style.HomePage__zapr}>
          <h1>Ожидаемые перевозки</h1>

          <div classDataZaprosTestName={style.HomePage__table}>
            <div className={style.HomePage__table__inner}>
              <div className={style.name}>
                <p>Игорь Петров</p>
                <p>Игорь Ивановский</p>
                <p>Юрий Гиваров</p>
                <p>Игорь Петросов</p>
              </div>
            </div>
          </div>
        </div>

        <div className={style.HomePage__zapr}>
          <h1>История доставок</h1>

          <div classDataZaprosTestName={style.HomePage__table}>
            <div className={style.HomePage__table__inner}>
              <div className={style.table}>
                <table>
                  {postavka.map((item) => (
                    <tr>
                      <td className={style.td1}>{item.name}</td>
                      <td className={style.td2}>{item.stor}</td>
                      <td className={style.td3}>{item.date}</td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div classDataZaprosTestName={style.HomePage__table}>

      </div>
    </div>
  );
}

export default HomePageData;
