import { PostSchema } from '#Models/Post.js';
import { UserSchema } from '#Models/User.js';
import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';
import { PostType, UserType } from './type.js';

export const users = {
  type: GraphQLList(UserType),
  resolve: async () => {
    const users = await UserSchema.find();

    return users;
  },
};

export const user = {
  type: UserType,
  description: 'Get a user by id',
  args: {
    id: { type: GraphQLID },
  },
  resolve: (parent, args) => {
    return UserSchema.findById(args.id);
  },
};

export const posts = {
  type: new GraphQLList(PostType),
  description: 'Get all posts',
  resolve: async () => {
    const posts = await PostSchema.find();

    return posts;
  },
};
