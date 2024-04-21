import React, { useEffect, useState } from "react";
import styles from "./Styles.module.scss";
import { Link } from "react-router-dom";

import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import { funMarshrutDecstra } from "./Diecstra";

function MapMenu(props) {
  const [filtredData, setFiltredData] = useState(props.listPoints);
  const [sortData, setSortData] = useState(props.listPoints);
  const [modalWindShow, setModalWindShow] = useState("Все");
  const [modalWindText, setmodalWindText] = useState(false);
  const [modalAddShow, setModalAddShow] = useState(false);
  const [modalSpisokShow, setModalSpisokShow] = useState(false);
  const [modalSpisokText, setModalSpisokText] = useState("Склад");
  const [name, setNmae] = useState("");
  const [adres, sertAdres] = useState("");
  const [index, setIndex] = useState(props.listPoints.length);

  
      const [graph, setGraph] = useState({
        A: { B: 1949, C: 2040 },
        B: { A: 2161, C: 2168, D: 1114 },
        C: { A: 1838, B: 1992, D: 1650 },
        D: { B: 874, C: 1812 },
      });
      
      const [startNode, setStartNode] = useState('A');
      const [endNode, setEndNode] = useState('D');
      const [shortestPath, setShortestPath] = useState([]);
    
      const dijkstra = (graph, start, end) => {
        const visitedNodes = {};
        const distances = {};
        const predecessors = {};
        let unvisitedNodes = Object.keys(graph);
    
        unvisitedNodes.forEach(node => {
          distances[node] = Infinity;
          predecessors[node] = null;
        });
    
        distances[start] = 0;
    
        while (unvisitedNodes.length) {
          const currentNode = unvisitedNodes.reduce((minNode, node) => {
            return distances[node] < distances[minNode] ? node : minNode;
          }, unvisitedNodes[0]);
    
          unvisitedNodes = unvisitedNodes.filter(node => node !== currentNode);
    
          Object.keys(graph[currentNode]).forEach(neighbor => {
            const weight = graph[currentNode][neighbor];
            const totalDistance = distances[currentNode] + weight;
            if (totalDistance < distances[neighbor]) {
              distances[neighbor] = totalDistance;
              predecessors[neighbor] = currentNode;
            }
          });
        }
    
        const path = [];
        let current = end;
        while (current !== null) {
          path.unshift(current);
          current = predecessors[current];
        }
        return path;
    }


  const inpName = (el) => {
    setNmae(el.target.value);
  };

  useEffect(() => {
    setFiltredData(props.listPoints);
    setSortData(props.listPoints);
  }, [props.listPoints]);

  console.log(props.listPoints);

  const addFunClick = () => {
    console.log(
      adres,
      adres.data.geo_lat,
      adres.data.geo_lon,
      modalSpisokText,
      name
    );
    const lon = parseFloat(adres.data.geo_lon);
    const lat = parseFloat(adres.data.geo_lat);
    const coordinates = [lon, lat];
    const data = {
      type: "Feature",
      id: index + 1,
      geometry: {
        coordinates: coordinates,
        type: "Point",
      },
      properties:
        modalSpisokText === "Склад"
          ? {
              iconCaption: name,
              "marker-color": "#1e98ff",
            }
          : {
              iconCaption: name,
              "marker-color": "#ed4543",
            },
    };
    props.setListPoints((prev) => [data, ...prev]);
    setFiltredData((prev) => [data, ...prev]);
    setSortData((prev) => [data, ...prev]);
    setNmae("");
    setModalAddShow(false);
    sertAdres("");
    setIndex(index + 1);
    props.setActiveItem(index + 1);
  };

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
      props.listPoints.find((el) => el.id === item.id).geometry.coordinates[1],
      props.listPoints.find((el) => el.id === item.id).geometry.coordinates[0],
    ]);
    props.setActiveItem(item.id);
  };

  const funMarshrut = () => {
    // funMarshrutDecstra(); Алгорит декстры
    const path = dijkstra(graph, startNode, endNode);

    const C = `${props.listPoints[2].geometry.coordinates[1]},${props.listPoints[2].geometry.coordinates[0]}`; // координаты точки C
    const D = `${props.listPoints[3].geometry.coordinates[1]},${props.listPoints[3].geometry.coordinates[0]}`; // координаты точки M
    const B = `${props.listPoints[0].geometry.coordinates[1]},${props.listPoints[0].geometry.coordinates[0]}`; // координаты точки B
    const A = `${props.listPoints[1].geometry.coordinates[1]},${props.listPoints[1].geometry.coordinates[0]}`; // координаты точки A

    let data = []
  path.map((el)=>{
    if(el === "A"){
      data.push(A);
    }
    if(el === "B"){
      data.push(B)
    }
    if(el === "C"){
      data.push(C)

    }
    if(el === "D"){
      data.push(D)
    }
  })
  let text = "";
  for(let i = 0; i < data.length; i++){
    if(i>0){
      text =`${text}~${data[i]}`
    }
    else{
      text =`${data[i]}`
    }
  }
   
  const url = `https://yandex.ru/maps/?rtext=${text}&rtt=auto`;
    // const url = `https://yandex.ru/maps/?rtext=${A}~${B}~${C}~${D}&rtt=auto`;

    window.open(url, "_blank");
  };
  

  const onList = (el) => {
    setModalSpisokShow(false);
    setModalSpisokText(el.target.innerText);
  };

  return (
    <div className={styles.MapMenu}>
      <div className={styles.back}>
        <Link to="/../HomePage" style={{ textDecoration: "none" }}>
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
        <div onClick={() => setModalAddShow(true)} className={styles.but_add}>
          Добавить
        </div>
      </div>
      {modalWindText && (
        <div className={styles.modalWind}>
          <span onClick={() => setModalFunck("Все")}>Все</span>
          <span onClick={() => setModalFunck("Склады")}>Склады</span>
          <span onClick={() => setModalFunck("Клиенты")}>Клиенты</span>
        </div>
      )}
      {modalAddShow && (
        <div className={styles.addModal_shadow}>
          <div className={styles.addModal}>
            <h3>Добавление объекта</h3>
            <div className={styles.container_1}>
              <div className={styles.container_1_left}>
                <span>Название</span>
                <input onChange={inpName} type="text"></input>
              </div>
              <div className={styles.container_1_rig}>
                <span>Тип объекта</span>
                <div
                  onClick={() => setModalSpisokShow(!modalSpisokShow)}
                  className={styles.container_1_rig_inner}
                >
                  <span>{modalSpisokText}</span>
                  {modalSpisokShow && (
                    <div className={styles.litsmodal}>
                      <span onClick={onList}>Склад</span>
                      <span onClick={onList}>Клиент</span>
                    </div>
                  )}

                  <img src="./img/arrow_bottom.png" alt=">"></img>
                </div>
              </div>
            </div>
            <div className={styles.container_2}>
              <div className={styles.bottom}>
                <span>Адрес</span>
                <AddressSuggestions
                  token="fd4b34d07dd2ceb6237300e7e3d50298509830e0"
                  value={adres}
                  onChange={sertAdres}
                />
                {/* <input type="text"></input> */}
              </div>
            </div>
            <div className={styles.button}>
              <div
                onClick={() => setModalAddShow(false)}
                className={styles.button_left}
              >
                Отклонить
              </div>
              <div className={styles.button_rig} onClick={addFunClick}>
                Добавить
              </div>
            </div>
          </div>
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
      <div className={styles.btn_marsh} onClick={funMarshrut}>
        Маршрут
      </div>
    </div>
  );
}

export default MapMenu;
