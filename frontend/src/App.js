import React, {useState} from 'react';
import {PressureMap} from "./components/PressureMap";
import {Slider} from "./components/Slider";
import {Legend} from "./components/Legend";

function App() {
    const [points, setPoints] = useState([]);
    return (
        <>
            <PressureMap points={points}/>
            <Slider onChanged={async (timestamp) => {
                const result = await fetch(`/data-points?timestamp=${timestamp}`);
                const data = await result.json();
                console.log(data);
                setPoints(data);
            }}/>
            <Legend />
        </>
    );
}

export default App;
