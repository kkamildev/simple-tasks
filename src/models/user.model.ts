import { nanoid } from "nanoid";
import { AllowNull, Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Task } from "./task.model";


@Table({
    tableName:"users",
    timestamps:false
})
export class User extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Default(() => nanoid())
    @Column(DataType.STRING(21))
    declare id:string;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    declare email:string;

    @AllowNull(false)
    @Column(DataType.CHAR(60))
    declare password:string;

    @HasMany(() => Task, {
        onDelete:"CASCADE",
        hooks:true
    })
    declare tasks:Task[]
}