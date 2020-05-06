import React, {useState} from "react";
import "./Slider.css";

export function Slider({ onChanged }) {
    const [from, setFrom] = useState(new Date("2020-05-01T00:00:00"));
    const [to, setTo] = useState(new Date());
    const [current, setCurrent] = useState(from);

    const toLocalDateTimeString = (date) => date.toLocaleString().replace(' ', 'T').substr(0, 16)

    return (
        <div className="slider-layout">
            <div>
                <label>From:</label><br/>
                <input type="datetime-local" defaultValue={toLocalDateTimeString(from)}
                       onChange={(e) => setFrom(new Date(e.target.value))}/>
            </div>
            <div>
                <input className="slider-range" type="range" min={Math.floor(from.getTime() / 3600000) * 3600} max={Math.floor(to.getTime() / 3600000) * 3600} step={3600} onChange={(e) => {
                    setCurrent(new Date(e.target.value * 1000));
                    onChanged(e.target.value);
                }}/>
                <div className="center">{toLocalDateTimeString(current)}</div>
            </div>
            <div>
                <label>To:</label><br/>
                <input type="datetime-local" defaultValue={toLocalDateTimeString(to)} onChange={(e) => setTo(new Date(e.target.value))}/>
            </div>
        </div>
    );
}