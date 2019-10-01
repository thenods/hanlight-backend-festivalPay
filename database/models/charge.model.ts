import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

import User from "./user.model";
import Admin from "./admin.model";

@Table({
  timestamps: true
})
export default class Charge extends Model<Charge> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => Admin)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  public admin_pk: Admin["pk"];

  @AllowNull(false)
  @Column(DataType.STRING)
  public admin_name: Admin["name"];

  @ForeignKey(() => User)
  @AllowNull(true)
  @Column(DataType.UUID)
  public user_pk: User["pk"];

  @AllowNull(false)
  @Column(DataType.STRING)
  public user_name: User["name"];

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public amount: number;

  @Default(false)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public confirmed: boolean;

  @BelongsTo(() => User, {
    onDelete: "CASCADE"
  })
  public user: User;

  @BelongsTo(() => Admin)
  public admin: Admin;
}
