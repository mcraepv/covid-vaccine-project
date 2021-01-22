import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export default class User {
  @Field() id: string;
  @Field() firstName: string;
  @Field() lastName: string;
  @Field() phoneNumber: string;
  @Field() guarenteeId: string;
  @Field() waitlistId: string;
  @Field() slotId: string;
  @Field() createdAt: Date;
  @Field() updatedAt: Date;
}

@InputType()
export class UserInput {
  @Field({ nullable: true }) id?: string;
  @Field({ nullable: true }) firstName?: string;
  @Field({ nullable: true }) lastName?: string;
  @Field({ nullable: true }) phoneNumber?: string;
  @Field({ nullable: true }) guarenteeId?: string;
  @Field({ nullable: true }) waitlistId?: string;
  @Field({ nullable: true }) slotId?: string;
  @Field({ nullable: true }) createdAt?: Date;
  @Field({ nullable: true }) updatedAt?: Date;
}
