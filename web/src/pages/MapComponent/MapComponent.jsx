import React, { useState } from "react";
import { YMaps } from "react-yandex-maps";
import MapBody from "./MapBody";
import { coordinates } from "./Coordinates";
import styles from "./Styles.module.scss";
function MapComponent() {
  const [listPoints, setListPoints] = useState(coordinates);
  console.log("listPoints", listPoints);
  return (
    <div>
      <div style={{ height: "100vh", width: "100%" }}>
        <YMaps query={{ apikey: "your-api-key-here" }}>
          <MapBody listPoints={listPoints} />
        </YMaps>
      </div>
    </div>
  );
}

export default MapComponent;
