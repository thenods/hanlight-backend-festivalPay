import { Model, AutoIncrement, PrimaryKey, AllowNull, Column, DataType, Table } from "sequelize-typescript";

@Table({
    timestamps: false,
})
export default class Example extends Model<Example> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public pk: number;
}