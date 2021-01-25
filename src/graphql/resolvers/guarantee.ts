import { Query, Resolver, Arg, Mutation } from 'type-graphql';
import Guarantee, { GuaranteeInput } from '../schemas/guarantee';
import GuaranteeModel from '../../db/models/guarantee';
import SlotModel from '../../db/models/slot';
import WaitlistModel from '../../db/models/waitlist';
import { v4 as uuidv4 } from 'uuid';

@Resolver((of) => Guarantee)
export default class {
  @Mutation(() => Guarantee)
  createGuarantee(@Arg('model') model: GuaranteeInput) {
    return GuaranteeModel.create({ ...model, id: uuidv4() });
  }

  @Mutation(() => Guarantee)
  async updateGuarantee(@Arg('model') model: GuaranteeInput) {
    const GuaranteeToUpdate = await GuaranteeModel.findByPk(model.id);
    return GuaranteeToUpdate.update(model);
  }

  @Mutation(() => Guarantee)
  async upsertGuarantee(@Arg('model') model: GuaranteeInput) {
    if (!model.id) {
      model.id = uuidv4();
    }
    await GuaranteeModel.upsert({ ...model });
    return GuaranteeModel.findByPk(model.id);
  }

  @Query(() => [Guarantee])
  getGuarantees() {
    return GuaranteeModel.findAll();
  }

  @Query(() => Guarantee)
  getGuaranteeByPK(@Arg('id') id: string) {
    return GuaranteeModel.findByPk(id);
  }

  @Query(() => Guarantee)
  async getGuarantee(
    @Arg('userId') userId: string,
    @Arg('locationId') locationId: string,
    @Arg('date') date: Date
  ) {
    const slots = await SlotModel.findAll({
      where: {
        locationId,
        isReserved: false,
        day: date,
      },
    });
    const guarantees = await GuaranteeModel.findAll({
      where: {
        locationId,
        day: date,
      },
    });
    if (guarantees.length < slots.length) {
      return GuaranteeModel.create({ userId, locationId, day: date });
    } else {
      return WaitlistModel.create({ userId, locationId, day: date });
    }
  }
}
