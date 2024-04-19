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
  const iconLayout = `
   <svg width="15" height="15" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_41_154)">
<path d="M512 207.424V458.667C512 488.128 488.128 512 458.667 512C429.205 512 405.333 488.128 405.333 458.667V256C405.333 244.224 395.776 234.667 384 234.667H128C116.224 234.667 106.667 244.224 106.667 256V458.667C106.667 488.128 82.7947 512 53.3333 512C23.872 512 0 488.128 0 458.667V207.424C0 171.968 17.6213 138.837 46.9973 119.019L196.331 18.24C232.384 -6.10133 279.616 -6.10133 315.669 18.24L465.003 119.019C494.379 138.859 512 171.989 512 207.424ZM213.333 426.667H192C180.203 426.667 170.667 436.224 170.667 448V490.667C170.667 502.443 180.203 512 192 512H213.333C225.131 512 234.667 502.443 234.667 490.667V448C234.667 436.224 225.131 426.667 213.333 426.667ZM213.333 298.667H192C180.203 298.667 170.667 308.224 170.667 320V362.667C170.667 374.443 180.203 384 192 384H213.333C225.131 384 234.667 374.443 234.667 362.667V320C234.667 308.224 225.131 298.667 213.333 298.667ZM320 426.667H298.667C286.869 426.667 277.333 436.224 277.333 448V490.667C277.333 502.443 286.869 512 298.667 512H320C331.797 512 341.333 502.443 341.333 490.667V448C341.333 436.224 331.797 426.667 320 426.667Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_41_154">
<rect width="512" height="512" fill="white"/>
</clipPath>
</defs>
</svg>
  `;
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
