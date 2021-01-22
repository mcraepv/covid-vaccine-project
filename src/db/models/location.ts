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
} from "sequelize-typescript";

@Table({
  modelName: "Location",
  tableName: "Locations",
})
export default class Location extends Model<Location> {
  @IsUUID(4)
  @PrimaryKey
  @AllowNull(false)
  @Unique
  @Column
  id: string;

  @Column
  name: string;

  @Column
  address: string;

  @Column
  numberOfSlots: number;

  @CreatedAt
  @AllowNull(false)
  @Column
  createdAt: Date;

  @UpdatedAt
  @AllowNull(false)
  @Column
  updatedAt: Date;
}
