import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import Receipt from './receipt.model';

@Table({
  timestamps: true,
})
export default class User extends Model<User> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.UUID)
  public pk: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public money: number;

  @HasMany(() => Receipt)
  public receipt: Receipt[];
}