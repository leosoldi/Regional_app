import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()

export class Store {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar")
    name: string;

    @Column("varchar")
    description: string;

    @Column("varchar")
    category: string;

    @Column("varchar", { nullable: true })
    road: string;

    @Column("varchar", { nullable: true })
    number: string;


    @Column("varchar", { nullable: true })
    complement: string;

    @Column("varchar", { nullable: true })
    Neighborhood: string;

    @Column("varchar", { nullable: true })
    city: string;

    @Column("varchar", { nullable: true })
    zipCode: string;

    @Column("varchar", { nullable: true })
    contact: string;

    @Column("varchar", { nullable: true })
    email: string;

    @Column("double precision")
    latitude: number;

    @Column("double precision")
    longitude: number;

}
