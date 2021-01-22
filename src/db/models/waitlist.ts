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
  modelName: "Waitlist",
  tableName: "Waitlists",
})
export default class Waitlist extends Model<Waitlist> {
  @IsUUID(4)
  @PrimaryKey
  @AllowNull(false)
  @Unique
  @Column
  id: string;

  @AllowNull(false)
  @Column
  userId: string;

  @AllowNull(false)
  @Column
  day: Date;

  @AllowNull(false)
  @Column
  locationId: string;

  @CreatedAt
  @AllowNull(false)
  @Column
  createdAt: Date;

  @UpdatedAt
  @AllowNull(false)
  @Column
  updatedAt: Date;
}
