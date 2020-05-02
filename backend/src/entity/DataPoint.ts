import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class DataPoint {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("double")
    pressure: number;

    @Column("double")
    latitude: number;

    @Column("double")
    longitude: number;

    @Column()
    timestamp: number;
}