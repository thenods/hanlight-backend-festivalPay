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
import Store from './store.model';
import StoreItem from './storeItem.model';

@Table({
  timestamps: true,
})
export default class ReceiptItem extends Model<ReceiptItem> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => Store)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  public store_pk: number;

  @ForeignKey(() => StoreItem)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  public storeItem_pk: number;

  @ForeignKey(() => Receipt)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public receipt_pk: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public name: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public count: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public totalPrice: number;
    
  @BelongsTo(() => Store)
  public store: Store;

  @BelongsTo(() => StoreItem)
  public storeItem: StoreItem;

  @BelongsTo(() => Receipt, {
      onDelete: 'CASCADE',
  })
  public receipt: Receipt;
}