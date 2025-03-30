import { FC, useState } from "react";
import { Map, Placemark, useYMaps } from "@pbe/react-yandex-maps";
import { IGeocodeResult } from "yandex-maps";

interface DataMapProps {
  coords: [number, number];
  height?: string;
  setCoords: (data: IMapReturnData) => void;
}

export interface IMapReturnData {
  coords: [number, number];
  street: string | null;
  building: string | null;
}

interface IMapClickEvent {
  get: (key: string) => [number, number];
}

function handleGeoResult(result: IGeocodeResult) {
  const firstGeoObject = result.geoObjects.get(0);

  if (firstGeoObject) {
    const properties = firstGeoObject.properties;

    const location = String(properties.get("description", {}));
    const route = String(properties.get("name", {}));

    const foundAddress = {
      location,
      route,
    };

    return foundAddress;
  }
}

function parseAddress(
  address: string
): { street: string; building: string } | null {
  const match = address.match(/^(.+?),\s*([\dА-Яа-я\-/]+)$/);
  if (!match) return null;

  return {
    street: match[1].trim(),
    building: match[2].trim(),
  };
}

const DataMap: FC<DataMapProps> = ({ coords, setCoords, height = "400px" }) => {
  const ymap = useYMaps(["geocode"]);
  const [coordsState, setCoordsState] = useState(coords);

  const handleClick = (e: IMapClickEvent) => {
    const location = e.get("coords");
    if (location) {
      ymap!.geocode(location).then((res) => {
        const foundAddress = handleGeoResult(res);
        const parsedAddress = parseAddress(foundAddress!.route);
        setCoordsState(location);
        setCoords({
          coords: location,
          street: parsedAddress!.street ?? null,
          building: parsedAddress!.building ?? null,
        });
      });
    }
  };

  return (
    <Map
      minheight={height}
      height={height}
      defaultState={{
        center: coordsState,
        zoom: 14,
        controls: ["zoomControl", "fullscreenControl"],
      }}
      onClick={(e: IMapClickEvent) => handleClick(e)}
      modules={["control.ZoomControl", "control.FullscreenControl"]}
    >
      <Placemark geometry={coordsState} />
    </Map>
  );
};

export default DataMap;
