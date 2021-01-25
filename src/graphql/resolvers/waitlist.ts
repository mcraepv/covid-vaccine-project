import { Query, Resolver, Arg, Mutation } from 'type-graphql';
import Waitlist, { WaitlistInput } from '../schemas/Waitlist';
import WaitlistModel from '../../db/models/Waitlist';
import { v4 as uuidv4 } from 'uuid';

@Resolver((of) => Waitlist)
export default class {
  @Mutation(() => Waitlist)
  createWaitlist(@Arg('model') model: WaitlistInput) {
    return WaitlistModel.create({ ...model, id: uuidv4() });
  }

  @Query(() => [Waitlist])
  getWaitlists() {
    return WaitlistModel.findAll();
  }

  @Mutation(() => Waitlist)
  async deleteWaitlist(@Arg('id') id: string) {
    const deletedWaitlist = await WaitlistModel.destroy({ where: { id } });

    console.log(deletedWaitlist);
  }
}
