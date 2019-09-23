import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import Receipt from './receipt.model';
import ReceiptItem from './receiptItem.model';
import StoreItem from './storeItem.model';

@Table({
  timestamps: false,
})
export default class Store extends Model<Store> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public className: string

  @AllowNull(false)
  @Column(DataType.STRING)
  public name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public location: string;

  @HasMany(() => Receipt)
  public receipt: Receipt[];

  @HasMany(() => StoreItem)
  public storeItem: StoreItem[];

  @HasMany(() => ReceiptItem)
  public receiptItem: ReceiptItem[];

}
