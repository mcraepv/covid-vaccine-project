import { Query, Resolver, Arg, Mutation } from 'type-graphql';
import Slot, {
  SlotInput,
  SlotsToReserve as SlotsToReserveType,
} from '../schemas/slot';
import SlotModel from '../../db/models/slot';
import { v4 as uuidv4 } from 'uuid';
import LocationModel from '../../db/models/location';
import GuaranteeModel from '../../db/models/guarantee';
import WaitlistModel from '../../db/models/waitlist';

@Resolver((of) => Slot)
export default class {
  @Mutation(() => Slot)
  createSlot(@Arg('model') model: SlotInput) {
    return SlotModel.create({ ...model, id: uuidv4() });
  }

  @Mutation(() => Slot)
  async updateSlot(@Arg('model') model: SlotInput) {
    const SlotToUpdate = await SlotModel.findByPk(model.id);
    return SlotToUpdate.update(model);
  }

  @Mutation(() => Slot)
  async upsertSlot(@Arg('model') model: SlotInput) {
    if (!model.id) {
      model.id = uuidv4();
    }

    await SlotModel.upsert({ ...model });

    return SlotModel.findByPk(model.id);
  }

  @Query(() => [Slot])
  allSlots() {
    return SlotModel.findAll();
  }

  @Query(() => Slot)
  checkSlot(@Arg('id') id: string) {
    return SlotModel.findByPk(id);
  }

  @Mutation(() => Boolean)
  async unReserveSlot(@Arg('id') id: string) {
    const slot = await SlotModel.findByPk(id);

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
      where: { locationId: location.id, isExpired: false },
    });
    const slots = await SlotModel.findAll({
      where: { isReserved: false, locationId: location.id },
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

  @Mutation(() => Slot)
  async slotToReserveRequest(
    @Arg('userId') userId: string,
    @Arg('slotId') slotId: string
  ) {
    const guarantee = await GuaranteeModel.findOne({ where: { userId } });
    if (!guarantee.isExpired) {
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
