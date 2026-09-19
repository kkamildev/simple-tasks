

import { AllowNull, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";


@Table({
    tableName:"emailVerifications",
    timestamps:false
})
export class EmailVerification extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.STRING(50))
    declare email:string;

    @AllowNull(false)
    @Column(DataType.CHAR(60))
    declare code:string;

    @AllowNull(false)
    @Column(DataType.DATE())
    declare expirationDate:Date

    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN())
    declare verified:boolean;
}