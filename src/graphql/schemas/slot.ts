import { Field, ObjectType, InputType } from 'type-graphql';

@ObjectType()
export default class Slot {
  @Field() id: string;
  @Field() day: Date;
  @Field() locationId: string;
  @Field() isReserved: boolean;
  @Field() userId: string;
  @Field() createdAt: Date;
  @Field() updatedAt: Date;
}

@InputType()
export class SlotInput {
  @Field({ nullable: true }) id?: string;
  @Field({ nullable: true }) day?: Date;
  @Field({ nullable: true }) locationId?: string;
  @Field({ nullable: true }) isReserved?: boolean;
  @Field({ nullable: true }) userId?: string;
  @Field({ nullable: true }) createdAt?: Date;
  @Field({ nullable: true }) updatedAt?: Date;
}
