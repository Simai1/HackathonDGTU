import React from "react";
import { Placemark } from "react-yandex-maps";
function Point(props) {
  return (
    <div>
      <Placemark
        geometry={props.coor}
        options={{
          iconColor: `${props.iconColor}`,
        }}
        properties={{
          iconCaption: props.iconCaption,
        }}
      />
    </div>
  );
}

export default Point;
