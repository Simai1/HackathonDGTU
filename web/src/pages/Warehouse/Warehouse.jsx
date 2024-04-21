import React, { useEffect, useState } from "react";
import style from "./Warehouse.module.scss";
import WarehousCard from "../../components/WarehousCard/WarehousCard";
import { GetDataWarehouse } from "../../Api/Api";

function Warehouse(props) {
    const [dataWarehousCard, setdataWarehousCard] = useState([])
    
useEffect(()=>{
    GetDataWarehouse().then((data)=>{
        setdataWarehousCard(data)
    });
    

},[])

  return (
   <div className={style.Warehous}>
        <h1>Склады</h1>
        <WarehousCard data={dataWarehousCard}/>
   </div>
  );
}

export default Warehouse;
