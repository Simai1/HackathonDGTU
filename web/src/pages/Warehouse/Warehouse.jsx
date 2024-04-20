import React, { useEffect, useState } from "react";
import styles from "./Warehouse.module.scss";
import WarehousCard from "../../components/WarehousCard/WarehousCard";
import { GetDataWarehouse } from "../../Api/Api";

function Warehouse(props) {
    const [dataWarehousCard, setdataWarehousCard] = useState({})
    
useEffect(()=>{
    setdataWarehousCard(GetDataWarehouse())

},[])
console.log(dataWarehousCard);

  return (
   <div>
        <h1>Склады</h1>
        <WarehousCard data={dataWarehousCard}/>
   </div>
  );
}

export default Warehouse;
