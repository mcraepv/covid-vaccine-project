import { ObjectType, Field } from 'type-graphql';
import Slot from './slot';
import Location from './location';

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
