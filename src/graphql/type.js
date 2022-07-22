import { UserSchema } from '#Models/User.js';
import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'The user type',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    displayName: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updateAt: { type: GraphQLString },
  },
});

export const PostType = new GraphQLObjectType({
  name: 'PostType',
  description: 'The post type',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: {
      type: UserType,
      resolve: (parent, args) => {
        UserSchema.findById(parent.authorId);
      },
    },
  },
});
