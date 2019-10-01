import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';

import ReceiptItem from './receiptItem.model';
import Shop from './shop.model';

@Table({
  timestamps: false,
})
export default class ShopItem extends Model<ShopItem> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => Shop)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  public shop_pk: number;

  @Column(DataType.STRING)
  public name: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public price: number;

  @BelongsTo(() => Shop, {
    onDelete: 'CASCADE',
  })
  public shop: Shop;

  @HasMany(() => ReceiptItem)
  public receiptItem: ReceiptItem[];
}