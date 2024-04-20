import React, { useState } from "react";
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
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Map
        style={{ height: "100%", width: "100%" }}
        defaultState={{
          center: [47.222078, 39.720358],
          zoom: 13,
        }}
        modules={["templateLayoutFactory", "layout.ImageWithContent"]}
      >
        <GeolocationControl options={{ float: "right" }} />
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
