const express = require('express');
const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/chatSchema');
const { resolvers, rooms } = require('./resolvers/chatResolvers');

async function start() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
  httpServer.listen(4000, () => console.log('API on :4000'));
}

start();