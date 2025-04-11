import { FC } from "react";
import { Map, Placemark } from "@pbe/react-yandex-maps";

interface ViewMapProps {
  coords: [number, number];
  height?: string;
}

const ViewMap: FC<ViewMapProps> = ({ coords, height = "300px" }) => {
  return (
    <Map
      height={height}
      defaultState={{
        center: coords,
        zoom: 17,
        controls: ["zoomControl", "fullscreenControl"],
      }}
      modules={["control.ZoomControl", "control.FullscreenControl"]}
    >
      <Placemark defaultGeometry={coords} />
    </Map>
  );
};

export default ViewMap;
