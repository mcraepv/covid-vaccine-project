import { Query, Resolver, Arg, Mutation } from "type-graphql";
import Slot, { SlotInput } from "../schemas/slot";
import SlotModel from "../../db/models/slot";
import { v4 as uuidv4 } from "uuid";

@Resolver((of) => Slot)
export default class {
    
    // Create
    @Mutation(() => Slot)
    createAccount(@Arg("model") model: SlotInput) {
        return SlotModel.create({ ...model, id: uuidv4() });
    }

    // Update
    @Mutation(() => Slot)
    async updateSlot(@Arg("model") model: SlotInput) {

        const SlotToUpdate = await SlotModel.findByPk(model.id);        
        return SlotToUpdate.update(model)
    }

    // Upsert
    @Mutation(() => Slot)
    async upsertSlot(@Arg("model") model: SlotInput) {
        
        if (!model.id) { model.id = uuidv4() }

        await SlotModel.upsert({ ...model })
      
        return SlotModel.findByPk(model.id);
    }
    
    // Find All
    @Query(() => [Slot])
    getSlots() {
        return SlotModel.findAll();
    }

    @Query(() => Slot)
    getSlot(@Arg("id") id: string) {
        return SlotModel.findByPk(id);
    }




}