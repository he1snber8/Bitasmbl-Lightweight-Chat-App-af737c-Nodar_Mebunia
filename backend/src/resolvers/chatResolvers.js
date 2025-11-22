const rooms = [{ id: 'general', name: 'General', messages: [] }];

const resolvers = {
  Query: {
    rooms: () => rooms,
    room: (_, { id }) => rooms.find(r => r.id === id)
  },
  Mutation: {
    sendMessage: (_, { roomId, text }) => {
      const room = rooms.find(r => r.id === roomId);
      if (!room) throw new Error('Room not found');
      const msg = { id: Date.now().toString(), roomId, userId: 'anon', text, createdAt: new Date().toISOString() };
      room.messages.push(msg);
      return msg;
    }
  },
  ChatRoom: {
    messages: room => room.messages
  }
};

module.exports = { resolvers, rooms };