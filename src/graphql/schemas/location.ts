import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export default class Location {
  @Field() id: string;
  @Field() name: string;
  @Field() address: string;
  @Field() numberOfSlots: string;
  @Field() createdAt: Date;
  @Field() updatedAt: Date;
}

@InputType()
export class LocationInput {
  @Field({ nullable: true }) id?: string;
  @Field({ nullable: true }) name?: string;
  @Field({ nullable: true }) address?: string;
  @Field({ nullable: true }) numberOfSlots?: string;
  @Field({ nullable: true }) createdAt?: Date;
  @Field({ nullable: true }) updatedAt?: Date;
}
