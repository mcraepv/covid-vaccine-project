import { SlotsToReserve } from './../schemas/SlotsToReserve';
import { Query, Resolver, Arg, Mutation } from 'type-graphql';
import Slot, { SlotInput } from '../schemas/slot';
import SlotModel from '../../db/models/slot';
import { v4 as uuidv4 } from 'uuid';
import LocationModel from '../../db/models/location';
import GuaranteeModel from '../../db/models/guarantee';
import WaitlistModel from '../../db/models/waitlist';
import { SlotsToReserve as SlotsToReserveType } from '../schemas/SlotsToReserve';

@Resolver((of) => Slot)
export default class {
  // Create
  @Mutation(() => Slot)
  createAccount(@Arg('model') model: SlotInput) {
    return SlotModel.create({ ...model, id: uuidv4() });
  }

  // Update
  @Mutation(() => Slot)
  async updateSlot(@Arg('model') model: SlotInput) {
    const SlotToUpdate = await SlotModel.findByPk(model.id);
    return SlotToUpdate.update(model);
  }

  // Upsert
  @Mutation(() => Slot)
  async upsertSlot(@Arg('model') model: SlotInput) {
    if (!model.id) {
      model.id = uuidv4();
    }

    await SlotModel.upsert({ ...model });

    return SlotModel.findByPk(model.id);
  }

  // Find All
  @Query(() => [Slot])
  allSlots() {
    return SlotModel.findAll();
  }

  // Find by PK - takes ID, returns slot
  @Query(() => Slot)
  checkSlot(@Arg('id') id: string) {
    return SlotModel.findByPk(id);
  }

  // Select by Location
  @Query(() => [Slot])
  slotsForLocation(@Arg('location') location: string) {
    return SlotModel.findAll({ where: { location } });
  }

  // unReserveSlot() - takes slotID, returns t if successfully changes t -> f, f otherwise
  @Query(() => Boolean)
  async unReserveSlot(@Arg('id') id: string) {
    const slot = await SlotModel.findByPk(id);
    // check if reserved?

    if (slot.isReserved) {
      await slot.update({ ...slot, isReserved: false });
      return true;
    }

    return false;
  }

  @Query(() => SlotsToReserveType)
  async slotsToReserve(@Arg('guaranteeId') guaranteeId: string) {
    const guarantee = await GuaranteeModel.findByPk(guaranteeId);
    const location = await LocationModel.findByPk(guarantee.locationId);
    const guaranteesByLocation = await GuaranteeModel.findAll({
      where: { locationId: location.id },
    });
    const slots = await SlotModel.findAll({
      where: { isReserved: false, locationId: location.id, day: guarantee.day },
    });
    const waitListsByLocation = await WaitlistModel.findAll({
      where: { locationId: location.id },
    });

    return {
      location: location,
      numberOfAvailableSlots: slots.length,
      numberOfPending: guaranteesByLocation.length,
      numberOfWaitlist: waitListsByLocation.length,
      availableSlots: slots,
    };
  }

  @Query(() => Slot)
  async slotToReserveRequest(
    @Arg('userId') userId: string,
    @Arg('slotId') slotId: string
  ) {
    const guarantee = await GuaranteeModel.findOne({ where: { userId } });
    if (guarantee) {
      const reservedSlot = await SlotModel.findByPk(slotId);
      if (!reservedSlot.isReserved) {
        return reservedSlot.update({
          ...reservedSlot,
          isReserved: true,
          userId,
        });
      }
    }
    return false;
  }
}
