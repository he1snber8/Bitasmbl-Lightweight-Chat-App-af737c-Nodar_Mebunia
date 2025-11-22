const express = require('express');
const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/chatSchema');
const { resolvers } = require('./resolvers/chatResolvers');
const initSocket = require('./realtime/socketServer');

async function bootstrap() {
  const app = express();
  const httpServer = http.createServer(app);

  const gqlServer = new ApolloServer({ typeDefs, resolvers });
  await gqlServer.start();
  gqlServer.applyMiddleware({ app, path: '/graphql' });

  initSocket(httpServer);

  httpServer.listen(4000, () => console.log('Server with WS on :4000'));
}

bootstrap();