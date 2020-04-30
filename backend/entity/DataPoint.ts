import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class DataPoint {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pressure: number;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    timestamp: number;
}