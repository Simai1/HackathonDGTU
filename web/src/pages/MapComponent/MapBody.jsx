import React from "react";
import {
  Map,
  GeolocationControl,
  RouteButton,
  SearchControl,
  TrafficControl,
  ZoomControl,
  Placemark,
} from "react-yandex-maps";
import Point from "./Point";

function MapBody(props) {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Map
        style={{ height: "100%", width: "100%" }}
        defaultState={{
          center: [47.222078, 39.720358],
          zoom: 13,
        }}
      >
        <GeolocationControl options={{ float: "left" }} />
        <RouteButton options={{ float: "right" }} />
        <SearchControl options={{ float: "right" }} />
        <TrafficControl options={{ float: "right" }} />
        <ZoomControl options={{ float: "right" }} />
        {props.listPoints.map((item) => (
          <Point
            key={item.id}
            id={item.id}
            coor={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}
            iconColor={item.properties["marker-color"]}
            iconCaption={item.properties.iconCaption}
          />
        ))}
      </Map>
    </div>
  );
}

export default MapBody;
