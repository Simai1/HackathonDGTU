import React, { useState, useEffect } from "react";
import style from "./WarehousCard.module.scss";
import rezwernutimg from "./../../img/rezwernut.svg";
import { GetProductsDataWarehouse } from "../../Api/Api";
import axios from "axios";

function WarehousCard(props) {
  const [ProductsDataWarehouse, setProductsDataWarehouse] = useState([]);
  const [ProductDataOpen, setProductDataOpen] = useState(false);
  const [adress, setAdress] = useState("");
  const [massadress, setmassAdress] = useState([]);

  const getId = (index) => {
    const id = props.data[index].id;
    GetProductsDataWarehouse(id).then((data) => {
      const dataArray = Array.isArray(data) ? data : [data]; // Преобразование в массив, если данные не являются массивом
      setProductsDataWarehouse(dataArray);
      setProductDataOpen(true);
      console.log(dataArray[0].products);
    });
  };

  useEffect(() => {
    const warehousCardData = document.querySelectorAll(
      `.${style.WarehousCard__data}`
    );
    warehousCardData.forEach((item) => {
      const name = item.querySelector("h3").textContent;
      if (ProductsDataWarehouse.some((product) => product.name === name)) {
        item.style.display = "none";
      } else {
        item.style.display = "block";
      }
    });
  }, [ProductsDataWarehouse]);

  useEffect(() => {
    const longitude = ProductsDataWarehouse[0]?.Coord.x; // Замените этими координатами на свои
    const latitude = ProductsDataWarehouse[0]?.Coord.y; // Замените этими координатами на свои
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        console.log(response);
        setAdress(
          `${response.data.address.state}, ${response.data.address.suburb}, ${response.data.address.road}, ${response.data.address.house_number}`
        );
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    fetchData();
  }, [ProductsDataWarehouse]);

  useEffect(() => {
    const fetchData = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        console.log(response);
        return `${response.data.address.state}, ${response.data.address.suburb}, ${response.data.address.road}, ${response.data.address.house_number}`;
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    const fetchAddresses = async () => {
      const mass = [];
      for (const el of props.data) {
        const address = await fetchData(el.Coord.y, el.Coord.x);
        mass.push(address);
      }
      setmassAdress(mass);
    };

    fetchAddresses();
  }, [props.data]);

  return (
    <div className={style.WarehousCard}>
      <div className={style.WarehousCard__inner}>
        {ProductDataOpen && (
          <div className={style.ProductData}>
            <div className={style.ProductData__block1}>
              <h3>{ProductsDataWarehouse[0].name}</h3>
              <div className={style.ProductData__coord}>
                <div>
                  <p>Адрес:</p>
                </div>
                <div className={style.ProductData__coordDate}>{adress}</div>
              </div>
            </div>
            <div className={style.ProductData__block2}>
              <table>
                <thead>
                  <tr>
                    <th className={style.thFirst}>Номер</th>
                    <th>Наименование товара</th>
                    <th>Закупочная стоимость</th>
                    <th>Дата изготовления</th>
                    <th>Срок годности продукта</th>
                    <th>Артикул</th>
                    <th>Вес продукции</th>
                    <th className={style.th7}>Производитель</th>
                    <th>Количество позиций на складе</th>
                  </tr>
                </thead>

                <tbody>
                  {ProductsDataWarehouse[0].products.map((item, index) => (
                    <tr key={index}>
                      <td className={style.td1}>{index}</td>
                      <td>{item.name}</td>
                      <td>{item.cost}</td>
                      <td>
                        {new Date(item.manufactureDate).toLocaleDateString()}
                      </td>
                      <td className={style.td5}>
                        <span>
                          {Math.floor(
                            (new Date(item.expiryDate) -
                              new Date(item.manufactureDate)) /
                              (1000 * 60 * 60 * 24)
                          )}
                          {" дней"}
                        </span>
                      </td>
                      <td>{item.sku}</td>
                      <td>
                        {item.amount}
                        {item.measure}
                      </td>
                      <td className={style.td7}>
                        <span>{item.manufacturer}</span>
                      </td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {props.data?.map((item, index) => {
          return (
            <div key={index} className={style.WarehousCard__data}>
              <h3>{item.name}</h3>
              <p>
                Адрес:
                {massadress[index]}
              </p>
              <img
                onClick={() => getId(index)}
                src={rezwernutimg}
                alt="rezwernut"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WarehousCard;
