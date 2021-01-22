import { Query, Resolver, Arg, Mutation } from "type-graphql";
import User, { UserInput } from "../schemas/user";
import UserModel from "../../db/models/user";
import { v4 as uuidv4 } from "uuid";

@Resolver((of) => User)
export default class {
    
    // Create
    @Mutation(() => User)
    createAccount(@Arg("model") model: UserInput) {
        return UserModel.create({ ...model, id: uuidv4() });
    }

    // Update
    @Mutation(() => User)
    async updateUser(@Arg("model") model: UserInput) {

        const UserToUpdate = await UserModel.findByPk(model.id);        
        return UserToUpdate.update(model)
    }

    // Upsert
    @Mutation(() => User)
    async upsertUser(@Arg("model") model: UserInput) {
        
        if (!model.id) { model.id = uuidv4() }

        await UserModel.upsert({ ...model })
      
        return UserModel.findByPk(model.id);
    }
    
    // Find All
    @Query(() => [User])
    getUsers() {
        return UserModel.findAll();
    }

    @Query(() => User)
    getUser(@Arg("id") id: string) {
        return UserModel.findByPk(id);
    }




}