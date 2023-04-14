import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Barcode {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    barcode: string
}
