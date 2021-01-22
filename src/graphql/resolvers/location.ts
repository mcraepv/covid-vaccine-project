import { Query, Resolver, Arg, Mutation } from "type-graphql";
import Location, { LocationInput } from "../schemas/location";
import LocationModel from "../../db/models/location";
import SlotModel from "../../db/models/slot";
import GuaranteeModel from "../../db/models/guarantee";
import WaitlistModel from "../../db/models/waitlist";
import { v4 as uuidv4 } from "uuid";
import { Model } from "sequelize";
import { INTEGER } from "sequelize";

const compositObject = {
    location: Location,
    numAvailable: INTEGER,
    numPending: INTEGER,
    numWaitlist: INTEGER,
    slots: [SlotModel],
};

@Resolver((of) => Location)
export default class {
    
    // Create
    @Mutation(() => Location)
    createLocation(@Arg("model") model: LocationInput) {
        return LocationModel.create({ ...model, id: uuidv4() });
    }

    // Update
    @Mutation(() => Location)
    async updateLocation(@Arg("model") model: LocationInput) {

        const LocationToUpdate = await LocationModel.findByPk(model.id);        
        return LocationToUpdate.update(model)
    }

    @Query(() => compositObject)
    async SlotsForLocation(@Arg("id") id: string) {
        const theLocation = await LocationModel.findByPk(id);
        const theSlots = await SlotModel.findAll({ where: {locationId: id, isReserved: false} });
        const numberPending = (await GuaranteeModel.findAll()).length;
        const numberWaitlist = (await WaitlistModel.findAll()).length;
        return {location: theLocation, numAvailable: theSlots.length, numPending: numberPending, numWaitlist: numberWaitlist, slots: theSlots};
    }
    
}