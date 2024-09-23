"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression, LatLngTuple } from "leaflet";
import { useTranslations } from "next-intl";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import markerIconUrl from "@/public/icons/marker.png";
import styles from "./Map.module.scss";
import { Link } from "@/i18n/routing";

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

const Map = (Map: MapProps) => {
  const { zoom = defaults.zoom, posix } = Map;
  const t = useTranslations("Map");

  const markers: {
    position: LatLngTuple;
    popupText: string;
    popupContent: JSX.Element;
  }[] = [
    {
      position: [37.394436, 13.280645],
      popupText: t("title1"),
      popupContent: (
        <div className={styles.popupContent}>
          <h2>{t("title1")}</h2>
          <p>{t("text1")}</p>
        </div>
      ),
    },
    {
      position: [37.39401975385151, 13.282202399432673],
      popupText: t("title2"),
      popupContent: (
        <div className={styles.popupContent}>
          <h2>{t("title2")}</h2>
          <p>{t("text2")}</p>
        </div>
      ),
    },
    {
      position: [37.393666, 13.280401],
      popupText: t("title3"),
      popupContent: (
        <div className={styles.popupContent}>
          <h2>{t("title3")}</h2>
          <p>{t("text3")}</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <MapContainer
        center={posix}
        zoom={zoom}
        zoomControl={false}
        scrollWheelZoom={"center"}
        doubleClickZoom={true}
        className={styles.map}
        style={{
          aspectRatio: "3/2",
          width: "100%",
          height: "40vh",
          borderRadius: "5px",
          boxShadow: "0 10px 12px -5px var(--c-gray-stone)",
        }}
      >
        <TileLayer
          attribution=""
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            draggable={false}
            icon={markerIcon}
          >
            <Popup maxWidth={300} keepInView={true} className={styles.popup}>
              {marker.popupContent}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default Map;
