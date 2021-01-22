import { Query, Resolver, Arg, Mutation } from "type-graphql";
import Slot, { SlotInput } from "../schemas/slot";
import SlotModel from "../../db/models/slot";
import { v4 as uuidv4 } from "uuid";
import { Model } from "sequelize";

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
    allSlots() {
        return SlotModel.findAll();
    }

    // Find by PK - takes ID, returns slot
    @Query(() => Slot)
    checkSlot(@Arg("id") id: string) {
        return SlotModel.findByPk(id);
    }

    // Select by Location
    @Query(() =>  Slot)
    slotsForLocation(@Arg("location") location: string) {
        return SlotModel.findAll({ where: {location} })
    }

    // unReserveSlot() - takes slotID, returns t if successfully changes t -> f, f otherwise
    @Query(() => Boolean)
    async unReserveSlot(@Arg("id") id: string) {
        const slot = await SlotModel.findByPk(id)
        // check if reserved?

        if (slot.isReserved) {
            await slot.update({...slot, isReserved: false})
            return true
        }

        return false

    }

    // slotsToReserve() - 




}