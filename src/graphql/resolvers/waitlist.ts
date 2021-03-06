import { Query, Resolver, Arg, Mutation } from 'type-graphql';
import Waitlist, { WaitlistInput } from '../schemas/waitlist';
import WaitlistModel from '../../db/models/waitlist';
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

  @Mutation(() => Boolean)
  async deleteWaitlist(@Arg('id') id: string) {
    
    const deletedWaitlist = await WaitlistModel.destroy({ where: { id } });

    return (deletedWaitlist) ? true : false
  }
}
