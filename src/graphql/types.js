import { CommentSchema } from '#Models/Comment.js';
import { PostSchema } from '#Models/Post.js';
import { UserSchema } from '#Models/User.js';
import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'The user type',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    displayName: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

export const PostType = new GraphQLObjectType({
  name: 'PostType',
  description: 'The post type',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    author: {
      type: UserType,
      resolve: (parent, args) => {
        UserSchema.findById(parent.authorId);
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: (parent) => {
        return CommentSchema.find({ postId: parent.id });
      },
    },
  }),
});

export const CommentType = new GraphQLObjectType({
  name: 'CommentType',
  description: 'The comment type',
  fields: {
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: async (parent, args) => {
        return UserSchema.findById(parent.userId);
      },
    },
    post: {
      type: PostType,
      resolve: async (parent, args) => {
        return PostSchema.findById(parent.postId);
      },
    },
  },
});
