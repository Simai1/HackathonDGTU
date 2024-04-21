import React, { useState, useEffect } from "react";
import style from "./StoreCard.module.scss";
import rezwernutimg from "./../../img/rezwernut.svg";
import { GetProductsDataShop } from "../../Api/Api";

function StoreCard(props) {
  const [ProductsDataShops, setProductsDataShops] = useState([]);
  const [ProductDataOpenShop, setProductDataOpenShop] = useState(false); 

  const getId = (index) => {
    const id = props.data[index].id;
    GetProductsDataShop(id).then((data) => {
      const dataArray = Array.isArray(data) ? data : [data]; 
      setProductsDataShops(dataArray);
      setProductDataOpenShop(true); 
      console.log(dataArray[0].products);
    });
  };

  useEffect(() => {
    const warehousCardData = document.querySelectorAll(`.${style.StoreCard__data}`);
    warehousCardData.forEach((item) => {
      const name = item.querySelector('h3').textContent;
      if (ProductsDataShops.some((product) => product.name === name)) {
        item.style.display = "none";
      } else {
        item.style.display = "block";
      }
    });
  }, [ProductsDataShops]);
useEffect(()=>{
    console.log(props.data)

},[props.data])

  return (
    <div className={style.StoreCard}>
      <div className={style.StoreCard__inner}>
      {ProductDataOpenShop && (
          <div className={style.ProductData}>
            <div className={style.ProductData__block1}>
                <h3>{ProductsDataShops[0].name}</h3>
                <div className={style.ProductData__coord}>
                    <div>
                        <p>Координаты:</p>
                    </div>
                    <div className={style.ProductData__coordDate}>
                        <p>X:{ProductsDataShops[0].Coord.x}</p>
                        <p>Y:{ProductsDataShops[0].Coord.y}</p>
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
                            <th>Производитель</th>
                            <th>Количество позиций на складе</th>
                        </tr>
                    </thead>
            
                <tbody>
                    {ProductsDataShops[0].products.map((item, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{item.name}</td>
                            <td>{item.cost}</td>
                            <td>{new Date(item.manufactureDate).toLocaleDateString()}</td>
                            <td>{Math.floor((new Date(item.expiryDate) - new Date(item.manufactureDate)) / (1000 * 60 * 60 * 24))} дней</td>
                            <td>{item.sku}</td>
                            <td>{item.amount}{item.measure}</td>
                            <td>{item.manufacturer}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
          </div>
        )}
        {props.data?.map((item, index) => (
          <div key={index} className={style.StoreCard__data}>
            <h3>{item.name}</h3>
            <p>
              Координаты X:{item.Coord.x} Y:{item.Coord.y}
            </p>
            <img onClick={() => getId(index)} src={rezwernutimg} alt="rezwernut" />
          </div>
        ))}
       
      </div>
    </div>
  );
}

export default StoreCard;
