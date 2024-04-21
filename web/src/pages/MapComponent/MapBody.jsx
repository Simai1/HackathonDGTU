import React from "react";
import {
  Map,
  GeolocationControl,
  RouteButton,
  SearchControl,
  TrafficControl,
  ZoomControl,
} from "react-yandex-maps";
import Point from "./Point";
import imgStor from "./../../img/points.png";
import imgMag from "./../../img/pointm.png";

function MapBody(props) {
  // const map = useRef(null);
  const mapState = {
    center: [47.222078, 39.720358],
    zoom: 12,
  };
  // const handleClick = (e) => {
  //   const placemarkCoords = e.get("coords");
  //   if (map.current) {
  //     map.current.setCenter(placemarkCoords);
  //   }
  // };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        instanceRef={props.map}
        defaultState={mapState}
        modules={["templateLayoutFactory", "layout.ImageWithContent"]}
        style={{ width: "100%", height: "100%" }}
      >
        <GeolocationControl options={{ float: "right" }} />
        <RouteButton options={{ float: "right" }} />
        <SearchControl options={{ float: "right" }} />
        <TrafficControl options={{ float: "right" }} />
        <ZoomControl options={{ float: "right" }} />
        {props.listPoints.map((item) => (
          <Point
            handleClick={props.handleClick}
            key={item.id}
            id={item.id}
            coor={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}
            iconColor={item.properties["marker-color"]}
            iconCaption={item.properties.iconCaption}
            icomUrl={
              item.properties["marker-color"] === "#1e98ff" ? imgStor : imgMag
            }
          />
        ))}
      </Map>
    </div>
  );
}

export default MapBody;
