import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { users, user } from './queries.js';
import { register, login, createPost } from './mutations.js';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    users,
    user,
  },
});

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'The root mutation type',
  fields: { register, login, createPost },
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
