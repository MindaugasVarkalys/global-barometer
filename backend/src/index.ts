import express = require('express');
import "reflect-metadata";
import {createConnection} from "typeorm";
import bodyParser from 'body-parser';
import dataPointController from './controller/dataPoint';

const bootstrap = async () => {
    await createConnection();

    const app = express();
    app.use(bodyParser.json());
    app.use('/data-points', dataPointController);

    app.listen(5000, function () {
        console.log('App is listening on port 5000!');
    });
};
bootstrap();
