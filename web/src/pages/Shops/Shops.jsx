import React, { useEffect, useState } from "react";
import style from "./Shops.module.scss";
import { GetdataShops } from "../../Api/Api";

function Shops(props) {
    const [dataShops, setdataShops] = useState({})
    
useEffect(()=>{
    setdataShops(GetdataShops())
},[])

console.log(dataShops);

  return (
   <div>
        <h1>Магазины</h1>
   </div>
  );
}

export default Shops;
