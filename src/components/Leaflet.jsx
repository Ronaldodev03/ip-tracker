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
