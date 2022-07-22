import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { hello } from './queries.js';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    hello,
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
});
