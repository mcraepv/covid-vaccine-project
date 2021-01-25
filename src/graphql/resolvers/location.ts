import { Query, Resolver, Arg, Mutation } from 'type-graphql';
import Location, { LocationInput } from '../schemas/location';
import LocationModel from '../../db/models/location';
import SlotModel from '../../db/models/slot';
import GuaranteeModel from '../../db/models/guarantee';
import WaitlistModel from '../../db/models/waitlist';
import { v4 as uuidv4 } from 'uuid';
import { SlotsToReserve as SlotsToReserveType } from '../schemas/slot';

@Resolver((of) => Location)
export default class {
  @Mutation(() => Location)
  createLocation(@Arg('model') model: LocationInput) {
    return LocationModel.create({ ...model, id: uuidv4() });
  }

  @Mutation(() => Location)
  async updateLocation(@Arg('model') model: LocationInput) {
    const LocationToUpdate = await LocationModel.findByPk(model.id);
    return LocationToUpdate.update(model);
  }

  @Query(() => SlotsToReserveType)
  async SlotsForLocation(@Arg('id') id: string) {
    const theLocation = await LocationModel.findByPk(id);
    const theSlots = await SlotModel.findAll({
      where: { locationId: id, isReserved: false },
    });
    const numberAvailable = theSlots.length;
    const numberPending = (await GuaranteeModel.findAll()).length;
    const numberWaitlist = (await WaitlistModel.findAll()).length;
    return {
      location: theLocation,
      numberOfAvailableSlots: numberAvailable,
      numberOfPending: numberPending,
      numberOfWaitlist: numberWaitlist,
      availableSlots: theSlots,
    };
  }
}
