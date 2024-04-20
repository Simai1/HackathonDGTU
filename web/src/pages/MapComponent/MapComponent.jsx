import React, { useState } from "react";
import { YMaps } from "react-yandex-maps";
import MapBody from "./MapBody";
import { coordinates } from "./Coordinates";
import styles from "./Styles.module.scss";
import MapMenu from "./MapMenu";
function MapComponent() {
  const [listPoints, setListPoints] = useState(coordinates);
  console.log("listPoints", listPoints);
  return (
    <div className={styles.MapComponent}>
      <div className={styles.menu}>
        <MapMenu listPoints={listPoints} />
      </div>

      <div className={styles.map} style={{ height: "100vh", width: "100%" }}>
        <YMaps query={{ apikey: "f3c78576-996b-4eaa-84f8-12a8520d276a" }}>
          <MapBody listPoints={listPoints} />
        </YMaps>
      </div>
    </div>
  );
}

export default MapComponent;
