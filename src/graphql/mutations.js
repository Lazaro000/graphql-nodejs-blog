import { UserSchema } from '#Models/User.js';
import { GraphQLString } from 'graphql';

export const register = {
  type: GraphQLString,
  description: 'Register a new user',
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    displayName: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const { username, email, password, displayName } = args;

    const newUser = new UserSchema({
      username,
      email,
      password,
      displayName,
    });

    await newUser.save();

    console.log(newUser);

    return 'new user created';
  },
};
