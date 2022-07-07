import { ApolloServer } from 'apollo-server';

import { typeDefs, resolvers } from './server/movie/movie.js';

const server = new  ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
});