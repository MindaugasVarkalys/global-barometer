import express = require('express');
import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import bodyParser from 'body-parser';
import dataPointController from './controller/dataPoint';
import {DataPoint} from "./entity/DataPoint";

const bootstrap = async () => {
    await createConnection();

    const app = express();
    app.use(bodyParser.json());
    app.use('/data-points', dataPointController);

  //  await generateRandomData();
    app.listen(5000, function () {
        console.log('App is listening on port 5000!');
    });

};
bootstrap();


const generateRandomData = async () => {
    for (let i = 0; i < 100000; i++) {
        const dataPoint = new DataPoint();
        dataPoint.latitude = getRandom(55, 68);
        dataPoint.longitude = getRandom(12, 23);
        dataPoint.timestamp = getRandom(1588291200, 1588550400);
        dataPoint.pressure = ((dataPoint.longitude - 12) / 11) * ((dataPoint.timestamp - 1588291200) / 259200) * 100 + 950;
        await getRepository(DataPoint).save(dataPoint);
    }
};

function getRandom(min: number, max: number) {
    return Math.random() * (max - min) + min;
}