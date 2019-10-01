import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import ReceiptItem from './receiptItem.model';
import Shop from './shop.model';
import User from './user.model';

@Table({
  timestamps: true,
})
export default class Receipt extends Model<Receipt> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  public user_pk: string;

  @ForeignKey(() => Shop)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  public shop_pk: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public shop_name: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public moneyAfter: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public moneyBefore: number;

  @Default(false)
  @Column(DataType.BOOLEAN)
  public confirm: boolean;

  @Default(false)
  @Column(DataType.BOOLEAN)
  public cancel: boolean;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public price: number;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE'
  })
  public user: User;

  @BelongsTo(() => Shop)
  public shop: Shop;

  @HasMany(() => ReceiptItem)
  public receiptItem: ReceiptItem[];
}