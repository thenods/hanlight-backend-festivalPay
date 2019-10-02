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
import ShopItem from './shopItem.model';

@Table({
  timestamps: false,
})
export default class Shop extends Model<Shop> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  public className: string

  @AllowNull(false)
  @Column(DataType.STRING)
  public name: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public location: number;

  @HasMany(() => Receipt)
  public receipt: Receipt[];

  @HasMany(() => ShopItem)
  public shopItem: ShopItem[];

  @HasMany(() => ReceiptItem)
  public receiptItem: ReceiptItem[];

}
