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
import Store from './store.model';

@Table({
  timestamps: false,
})
export default class StoreItem extends Model<StoreItem> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => Store)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  public store_pk: number;

  @Column(DataType.STRING)
  public name: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public price: number;

  @BelongsTo(() => Store, {
    onDelete: 'CASCADE',
  })
  public store: Store;

  @HasMany(() => ReceiptItem)
  public receiptItem: ReceiptItem[];
}