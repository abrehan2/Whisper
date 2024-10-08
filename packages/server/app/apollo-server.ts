// Imports:
import { ApolloServer } from '@apollo/server';
import { graphEntities } from '../graphql/schemas';
import { graphResolvers } from '../graphql/resolvers';

export default function InitiateGraphQl() {
  const server = new ApolloServer({
    typeDefs: graphEntities,
    resolvers: graphResolvers,
  });

  return server;
}
