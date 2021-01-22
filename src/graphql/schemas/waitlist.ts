import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export default class Waitlist {
  @Field() id: string;
  @Field() userId: string;
  @Field() day: Date;
  @Field() locationId: string;
  @Field() createdAt: Date;
  @Field() updatedAt: Date;
}

@InputType()
export class WaitlistInput {
  @Field({ nullable: true }) id?: string;
  @Field({ nullable: true }) userId?: string;
  @Field({ nullable: true }) day?: Date;
  @Field({ nullable: true }) locationId?: string;
  @Field({ nullable: true }) createdAt?: Date;
  @Field({ nullable: true }) updatedAt?: Date;
}
