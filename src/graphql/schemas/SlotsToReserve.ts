import { Field, ObjectType, InputType } from 'type-graphql';
import Location from './location';
import Slot from './slot';

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
