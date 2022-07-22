import { UserSchema } from '#Models/User.js';
import { GraphQLList } from 'graphql';
import { UserType } from './type.js';

export const users = {
  type: GraphQLList(UserType),
  resolve: async () => {
    const users = await UserSchema.find();

    return users;
  },
};
