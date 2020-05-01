import {Map, TileLayer} from "react-leaflet";
import React from "react";
import './PressureMap.css';
import 'leaflet/dist/leaflet.css';

export function PressureMap() {
    return (
      <Map className="PressureMap" center={[55,24]} zoom={8}>
          <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png" />
      </Map>
    );
}