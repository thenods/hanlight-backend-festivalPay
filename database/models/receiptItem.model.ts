import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import Receipt from './receipt.model';
import Shop from './shop.model';
import ShopItem from './shopItem.model';

@Table({
  timestamps: true,
})
export default class ReceiptItem extends Model<ReceiptItem> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => Receipt)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public receipt_pk: number;

  @ForeignKey(() => Shop)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  public shop_pk: number;

  @ForeignKey(() => ShopItem)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  public shopItem_pk: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public name: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public count: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public totalPrice: number;
    
  @BelongsTo(() => Shop)
  public shop: Shop;

  @BelongsTo(() => ShopItem)
  public shopItem: ShopItem;

  @BelongsTo(() => Receipt, {
      onDelete: 'CASCADE',
  })
  public receipt: Receipt;
}