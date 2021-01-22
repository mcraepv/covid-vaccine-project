import { Field, ObjectType, InputType } from 'type-graphql';

@ObjectType()
export default class Guarantee {
  @Field() id: string;
  @Field() userId: string;
  @Field() day: Date;
  @Field() locationId: string;
  @Field() timePassed: number;
  @Field() createdAt: Date;
  @Field() updatedAt: Date;
}

@InputType()
export class GuaranteeInput {
  @Field({ nullable: true }) id?: string;
  @Field({ nullable: true }) userId?: string;
  @Field({ nullable: true }) day?: Date;
  @Field({ nullable: true }) locationId?: string;
  @Field({ nullable: true }) timePassed?: number;
  @Field({ nullable: true }) createdAt?: Date;
  @Field({ nullable: true }) updatedAt?: Date;
}
