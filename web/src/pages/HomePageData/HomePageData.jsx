import React from "react";
import style from "./HomePageData.module.scss";
import ProgressBar from "../../ui/progress/ProgressBar";

function HomePageData(props) {
  const testData = [
    { bgcolor: "#F37022", completed: 30 },
    { bgcolor: "#F37022", completed: 55 },
    { bgcolor: "#F37022", completed: 180 },
    { bgcolor: "#F37022", completed: 70 },
    { bgcolor: "#F37022", completed: 15 },
    { bgcolor: "#F37022", completed: 85 },

  ];

  const dataDost = [
    {
        name: "Петров Никитин",
    },
    {
        name: "Святослав Савин",
    },
    {
        name: "Игорь Петров",
    },
    {
        name: "Григорий петров",
    },
    {
        name: "Игорь Петров",
    },
    {
        name: "Игорь Петров",
    },
    {
        name: "Петров Никитин",
    },
    {
        name: "Святослав Савин",
    },
    {
        name: "Игорь Петров",
    },
    {
        name: "Григорий петров",
    },
  ]
  const HistoryDost = [
    {
        from: "Склад 1",
        to: "Клиент 3",
        date: "25.04.2024, 13:00",
    },
    {
        from: "Склад 1",
        to: "Клиент 3",
        date: "25.04.2024, 13:00",
    },
    {
        from: "Склад 1",
        to: "Клиент 3",
        date: "25.04.2024, 13:00",
    },
    {
        from: "Склад 1",
        to: "Клиент 3",
        date: "25.04.2024, 13:00",
    },
    {
        from: "Склад 1",
        to: "Клиент 3",
        date: "25.04.2024, 13:00",
    },
   
  ];
  


  return (
    <div>
        <div className={style.HomePage__block1}>
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
                </div>
            </div>
            
            {/* Это просто пример сейчас делаем) */}
            <div className={style.Analitic}>
                <h1>Аналитика</h1>
                <div className={style.HomePage__table}>
                    <div className={style.HomePage__table__inner}>
                            <img className={style.AnaliticImg} src="./img/AnalitikFrame.svg"></img>
                    </div>
                </div>
            </div>
            {/* Это просто пример сейчас делаем) */}
      </div>
      <div className={style.container_box}>
        <div className={style.HomePage__zapr}>
          <h1>Ожидаемые перевозки</h1>

          <div classDataZaprosTestName={style.HomePage__table}>
            <div className={style.HomePage__table__innername}>
              <div className={style.name}>
                <div className={style.name__inner}>
                    {dataDost.map((item,index)=>(
                         <p>{item.name}</p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
      <div className={style.HomePage__history}>
          <h1>История доставок</h1>

          <div className={style.HomePage__history__inner}>
                {HistoryDost.map((item,index) => (
                    <div className={style.history__block}>
                        <p >Доставка #{index+1}</p>
                        <p >{item.date}</p>
                        <p >{item.from}<img src="./img/arrowNext.svg"></img>{item.to}</p>
                    </div>
                ))}
        </div>
     </div>
    </div>
  );
}

export default HomePageData;
