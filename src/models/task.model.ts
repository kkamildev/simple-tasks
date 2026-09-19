

import { nanoid } from "nanoid";
import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasOne, Index, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { User } from "./user.model";


@Table({
    tableName:"tasks",
    timestamps:false
})
export class Task extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Default(() => nanoid())
    @Column(DataType.STRING(21))
    declare id:string;

    @ForeignKey(() => User)
    @Unique
    @Index
    @Column(DataType.STRING)
    declare userId:string;

    @BelongsTo(() => User, {
        onDelete:"CASCADE",
        hooks:true
    })
    declare user:User;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    declare title:string;

    @AllowNull(false)
    @Column(DataType.STRING(2000))
    declare content:string;

    @AllowNull(false)
    @Column(DataType.DATE())
    declare deadline:Date;

    @AllowNull(false)
    @Column(DataType.TINYINT({unsigned:true}))
    declare priority:number;

    @AllowNull(false)
    @Default(() => new Date())
    @Column(DataType.DATE())
    declare createdAt:Date
    
}