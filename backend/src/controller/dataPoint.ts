import express = require('express');
import {Request, Response} from "express";
import {DataPoint} from "../entity/DataPoint";
import {getRepository} from "typeorm";

const router = express.Router();
router.post('/', async (req: Request, res: Response) => {
    const dataPoint = Object.assign(new DataPoint(), req.body);
    await getRepository(DataPoint).save(dataPoint);
    res.status(200).send({});
});

export default router;