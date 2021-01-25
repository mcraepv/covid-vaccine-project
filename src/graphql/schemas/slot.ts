import { Field, ObjectType, InputType } from 'type-graphql';
import Location from './location';

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

@ObjectType({ description: 'Slots To Reserve Type' })
export class SlotsToReserve {
  @Field()
  location: Location;

  @Field()
  numberOfAvailableSlots: Number;

  @Field()
  numberOfPending: Number;

  @Field()
  numberOfWaitlist: Number;

  @Field()
  availableSlots: Slot;
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
