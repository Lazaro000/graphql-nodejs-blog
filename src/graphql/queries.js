import { CommentSchema } from '#Models/Comment.js';
import { PostSchema } from '#Models/Post.js';
import { UserSchema } from '#Models/User.js';
import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';
import { PostType, UserType, CommentType } from './types.js';

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

export const post = {
  type: PostType,
  description: 'Get a post by id',
  args: {
    id: {
      type: GraphQLID,
    },
  },
  resolve: async (parent, { id }) => {
    const post = await PostSchema.findById(id);

    return post;
  },
};

export const comments = {
  type: new GraphQLList(CommentType),
  description: 'Get all comments',
  resolve: () => {
    return CommentSchema.find();
  },
};

export const comment = {
  type: CommentType,
  description: 'Get a comment by id',
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (parent, { id }) => {
    return CommentSchema.findById(id);
  },
};
