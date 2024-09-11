"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import markerIconUrl from "@/public/icons/marker.png";
import styles from "./Map.module.scss";

const markerIcon = L.icon({
  iconUrl: markerIconUrl.src,
  iconSize: [42, 42],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
}

const defaults = {
  zoom: 20,
};

const markers: {
  position: LatLngTuple;
  popupText: string;
  popupContent: JSX.Element;
}[] = [
  {
    position: [37.394436, 13.280645],
    popupText: "Teatro Greco di Eraclea Minoa",
    popupContent: (
      <div>
        {/* prendere img da public folder */}
        <img src="" alt="" />
        <h2>Teatro Greco di Eraclea Minoa</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam,
          iusto!
        </p>
        <a>Scopri</a>
      </div>
    ),
  },
  {
    position: [37.39401975385151, 13.282202399432673],
    popupText: "Antiquarium di Eraclea Minoa",
    popupContent: (
      <div>
        {/* prendere img da public folder */}
        <img src="" alt="" />
        <h2>Antiquarium di Eraclea Minoa</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
          sint.
        </p>
        <a>Scopri</a>
      </div>
    ),
  },
  {
    position: [37.393666, 13.280401],
    popupText: "Area Archeologica di Eraclea Minoa",
    popupContent: (
      <div>
        {/* prendere img da public folder */}
        <img src="" alt="" />
        <h2>Area Archeologica di Eraclea Minoa</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil,
          voluptate.
        </p>
        <a>Scopri</a>
      </div>
    ),
  },
];

const Map = (Map: MapProps) => {
  const { zoom = defaults.zoom, posix } = Map;

  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "40vh", width: "414px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          draggable={false}
          icon={markerIcon}
        >
          <Popup>{marker.popupContent}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
