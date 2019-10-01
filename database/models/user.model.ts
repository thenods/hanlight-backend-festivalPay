import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Default,
} from 'sequelize-typescript';

import Receipt from './receipt.model';
import Charge from './charge.model';

@Table({
  timestamps: true,
})
export default class User extends Model<User> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.UUID)
  public pk: string;

  @Default(0)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public money: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  public name: string; 

  @AllowNull(true)
  @Column(DataType.STRING)
  public major: string;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  public grade: number;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  public classNum: number;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  public studentNum: number;

  @HasMany(() => Receipt)
  public receipt: Receipt[];

  @HasMany(() => Charge)
  public charge: Charge[];
}
