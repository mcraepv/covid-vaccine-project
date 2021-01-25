import {
  Table,
  Column,
  Model,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  IsUUID,
  PrimaryKey,
  Unique,
} from 'sequelize-typescript';

@Table({
  modelName: 'Slot',
  tableName: 'Slots',
})
export default class Slot extends Model<Slot> {
  @IsUUID(4)
  @PrimaryKey
  @AllowNull(false)
  @Unique
  @Column
  id: string;

  @AllowNull(false)
  @Column
  day: Date;

  @AllowNull(false)
  @Column
  locationID: string;

  @AllowNull(false)
  @Column
  isReserved: boolean;

  @Column
  userId: string;

  @CreatedAt
  @AllowNull(false)
  @Column
  createdAt: Date;

  @UpdatedAt
  @AllowNull(false)
  @Column
  updatedAt: Date;
}
