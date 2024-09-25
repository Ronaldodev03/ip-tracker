/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { locationIcon } from "../assets";
import { Icon } from "leaflet";

const Leaflet = (props) => {
  const position = [`${props.lat}`, `${props.lng}`];
  const customIcon = new Icon({
    iconUrl: `${locationIcon}`,
    iconSize: [46, 56],
  });

  if (position.some((position) => position === "null"))
    return (
      <div className=" mt-[300px] md:mt-[250px] text-center text-3xl font-bold bg-red-500 text-white w-[95%] max-w-2xl mx-auto py-2 rounded-lg">
        NOT AVAILABLE
      </div>
    );

  return (
    <div>
      <MapContainer
        key={`${props.lat}-${props.lng}`}
        center={position}
        zoom={5}
        minZoom={3}
        //scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>Your current position</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

Leaflet.defaultProps = {
  lat: "0",
  lng: "0",
};

export default Leaflet;
