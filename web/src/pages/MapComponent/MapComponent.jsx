import React, { useEffect, useRef, useState } from "react";
import { YMaps } from "react-yandex-maps";
import MapBody from "./MapBody";
import { coordinates } from "./Coordinates";
import styles from "./Styles.module.scss";
import MapMenu from "./MapMenu";
function MapComponent() {
  const [listPoints, setListPoints] = useState(coordinates);
  const [myCoor, setMyCoor] = useState([]);
  if (!navigator.geolocation) {
    alert("браузер не поддерживает геолокацию");
  } else {
    navigator.geolocation.watchPosition(
      function (position) {
        setMyCoor(position);
      },
      function (error) {
        if (error.code == error.PERMISSION_DENIED)
          alert("Дайте разрешение на определение местоположения");
      }
    );
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyCoor([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          // alert('Ошибка при определении местоположения', error);
          setMyCoor([47.222078, 39.720358]);
        }
      );
    } else {
      alert("Геолокация не поддерживается вашим браузером");
    }
  }, []);
  const map = useRef(null);
  const handleClick = (e) => {
    const placemarkCoords = e.get("coords");
    if (map.current) {
      map.current.setCenter(placemarkCoords);
    }
  };
  return (
    <div className={styles.MapComponent}>
      <div className={styles.menu}>
        <MapMenu handleClick={handleClick} listPoints={listPoints} />
      </div>

      <div className={styles.map} style={{ height: "100vh", width: "100%" }}>
        <YMaps query={{ apikey: "f3c78576-996b-4eaa-84f8-12a8520d276a" }}>
          <MapBody
            map={map}
            handleClick={handleClick}
            listPoints={listPoints}
          />
        </YMaps>
      </div>
    </div>
  );
}

export default MapComponent;
