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
  modelName: "User",
  tableName: "Users",
})
export default class User extends Model<User> {
  @IsUUID(4)
  @PrimaryKey
  @AllowNull(false)
  @Unique
  @Column
  id: string;

  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Column
  phoneNumber: string;

  @Column
  guarenteeId: string;

  @Column
  waitlistId: string;

  @Column
  slotId: string;

  @CreatedAt
  @AllowNull(false)
  @Column
  createdAt: Date;

  @UpdatedAt
  @AllowNull(false)
  @Column
  updatedAt: Date;
}
