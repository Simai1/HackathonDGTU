import React, { useState, useEffect } from "react";
import style from "./WarehousCard.module.scss";
import rezwernutimg from "./../../img/rezwernut.svg";
import { GetDataClients, GetDataWarehousExport, GetProductsDataWarehouse, SendDataWarehous, SendDataWarehousExport } from "../../Api/Api";
import axios from "axios";
import Button from "../../ui/Button/Button";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

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
        console.log("Error fetching address:", error);
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

  //импорт файла
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("Файл:", file);
    SendDataWarehous(file)
      .then((data) => {
        console.log("Успешно загружено:", data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке файла:", error);
      });
  };

const getDataWarehous = () => {
    console.log("Вызвал функцию импорта файла");
    GetDataWarehousExport().then((data) => {
        generateAndDownloadExcel(data.data)
    }).catch((error) => {
        console.error("An error occurred while fetching data:", error);
    });
};
const generateAndDownloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(excelData, 'your_filename.xlsx');
};


  return (
    <div className={style.WarehousCard}>
      <div className={style.WarehousCard__inner}>
        {ProductDataOpen && (
          <div className={style.ProductData}>
            <div className={style.ProductData__block1}>
              <h3>{ProductsDataWarehouse[0].name}</h3>
              <div className={style.ProductData__coord}>
                <div className={style.ProductData__coord__inner}>
                    <div>
                    <p>Адрес:</p>
                    </div>
                    <div className={style.ProductData__coordDate}>{adress}</div>
                </div>
                <div className={style.Button__block}>
                    <Button
                        handleLogin={() => document.getElementById('fileInput').click()}
                        text="Импортировать"
                        Bg="#fff"
                        w="200px"
                        h="50px"
                        textColot="#00C300"
                        border="2px solid #00C300"
                    />
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                    />      
                    <Button  text="Экспортировать" handleLogin={getDataWarehous} Bg="#fff" w="200px" h="50px" textColot="#0061D9"  border="2px solid #0061D9"/>
                    <Button  text="Продать товар" Bg="#F37022" w="200px" h="50px" textColot="#fff"  />
                </div>
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
