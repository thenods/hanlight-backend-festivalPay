import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  timestamps: false,
})
export default class Admin extends Model<Admin> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @AllowNull(false)
  @Column(DataType.UUID)
  public user_pk: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  public name: string; 

  @AllowNull(false)
  @Column(DataType.STRING)
  public major: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public grade: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public classNum: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public studentNum: number;
}