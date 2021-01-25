import { Field, ObjectType, InputType } from 'type-graphql';

@ObjectType()
export default class Guarantee {
  @Field() id: string;
  @Field() userId: string;
  @Field() locationId: string;
  @Field() isExpired: boolean;
  @Field() createdAt: Date;
  @Field() updatedAt: Date;
}

@InputType()
export class GuaranteeInput {
  @Field({ nullable: true }) id?: string;
  @Field({ nullable: true }) userId?: string;
  @Field({ nullable: true }) locationId?: string;
  @Field({ nullable: true }) isExpired?: boolean;
  @Field({ nullable: true }) createdAt?: Date;
  @Field({ nullable: true }) updatedAt?: Date;
}
