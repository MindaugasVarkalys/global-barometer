import {Map, Rectangle, TileLayer} from "react-leaflet";
import React from "react";
import './PressureMap.css';
import 'leaflet/dist/leaflet.css';

export function PressureMap({points}) {
    const PRECISION = 0.5;
    const rectangles = points.map((p) => {
        return <Rectangle
            bounds={[[p.latitude, p.longitude], [p.latitude + PRECISION, p.longitude + PRECISION]]}
            color={`rgb(${Math.floor((p.avg - 950) * 2.55)},0,${255 - Math.floor((p.avg - 950) * 2.55)})`}
            fillOpacity={0.5}
            stroke={false}/>
    });
    return (
        <Map className="PressureMap" center={[55, 24]} zoom={8}>
            <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"/>
            {rectangles}
        </Map>
    );
}