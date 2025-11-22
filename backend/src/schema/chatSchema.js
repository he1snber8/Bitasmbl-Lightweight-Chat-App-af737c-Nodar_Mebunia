const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Message { id: ID! roomId: ID! userId: String! text: String! createdAt: String! }
  type ChatRoom { id: ID! name: String! messages: [Message!]! }
  type Query { rooms: [ChatRoom!]! room(id: ID!): ChatRoom }
  type Mutation { sendMessage(roomId: ID!, text: String!): Message! }
`;

module.exports = typeDefs;