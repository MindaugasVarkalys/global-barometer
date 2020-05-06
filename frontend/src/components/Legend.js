import React from "react";
import './Legend.css';

export function Legend() {
    return (
        <div className="legend">
            <span>950hPa</span>
            <div className="legend-gradient"/>
            <span>1050hPa</span>
        </div>
    )
}