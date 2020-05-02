import {EntityRepository, Repository} from "typeorm";
import {DataPoint} from "../entity/DataPoint";

@EntityRepository(DataPoint)
export class DataPointRepository extends Repository<DataPoint> {

    findGroupedByCoordinates(timestamp: number) {
        const COORDINATES_PRECISION = 10;
        return this.createQueryBuilder()
            .select(`floor(dt.latitude * ${COORDINATES_PRECISION}) / ${COORDINATES_PRECISION}`, "latitude")
            .addSelect(`floor(dt.longitude * ${COORDINATES_PRECISION}) / ${COORDINATES_PRECISION}`, "longitude")
            .addSelect("count(*)", "count")
            .addSelect("min(dt.pressure)", "min")
            .addSelect("max(dt.pressure)", "max")
            .addSelect("avg(dt.pressure)", "avg")
            .from(DataPoint, "dt")
            .where("dt.timestamp >= :tsFrom", { tsFrom: timestamp })
            .andWhere("dt.timestamp < :tsTo", { tsTo: timestamp + 60 * 60 })
            .groupBy(`floor(dt.latitude * ${COORDINATES_PRECISION})`)
            .addGroupBy(`floor(dt.longitude * ${COORDINATES_PRECISION})`)
            .getRawMany();
    }
}