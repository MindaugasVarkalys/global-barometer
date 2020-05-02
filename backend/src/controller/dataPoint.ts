import express = require('express');
import {Request, Response} from "express";
import {DataPoint} from "../entity/DataPoint";
import {getCustomRepository, getRepository} from "typeorm";
import {DataPointRepository} from "../repository/DataPointRepository";

const router = express.Router();
router.post('/', async (req: Request, res: Response) => {
    const dataPoint = Object.assign(new DataPoint(), req.body);
    await getRepository(DataPoint).save(dataPoint);
    res.send({});
});

router.get('/', async (req: Request, res: Response) => {
    if (!req.query.timestamp) {
        res.status(403).send();
        return;
    }
    const timestamp: number = +req.query.timestamp;
    const result = await getCustomRepository(DataPointRepository).findGroupedByCoordinates(timestamp);
    console.log(result);
    res.send(result);
});

export default router;