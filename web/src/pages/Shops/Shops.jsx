import React, { useEffect, useState } from "react";
import style from "./Shops.module.scss";
import { GetdataShop } from "../../Api/Api";
import StoreCard from "../../components/StoreCard/StoreCard";

function Shops(props) {
    const [dataShopCard, setdataShopCard] = useState([])
    
useEffect(()=>{
    GetdataShop().then((data)=>{
        setdataShopCard(data)
    });
    

},[])

  return (
   <div className={style.Shop}>
        <h1>Магазины</h1>
        <StoreCard data={dataShopCard}/>
   </div>
  );
}

export default Shops;
