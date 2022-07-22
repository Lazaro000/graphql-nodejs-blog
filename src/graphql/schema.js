import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { hello } from './queries.js';
import { register } from './mutations.js';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    hello,
  },
});

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'The root mutation type',
  fields: { register },
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
