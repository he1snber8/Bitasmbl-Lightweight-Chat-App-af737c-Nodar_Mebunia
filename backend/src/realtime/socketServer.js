const { Server } = require('socket.io');
const { rooms } = require('../resolvers/chatResolvers');

function initSocket(httpServer) {
  const io = new Server(httpServer, { cors: { origin: '*' } });

  io.on('connection', socket => {
    socket.on('joinRoom', ({ roomId }) => {
      socket.join(roomId);
    });

    socket.on('chatMessage', ({ roomId, text, userId }) => {
      const room = rooms.find(r => r.id === roomId);
      if (!room) return;
      const msg = { id: Date.now().toString(), roomId, userId, text, createdAt: new Date().toISOString() };
      room.messages.push(msg);
      io.to(roomId).emit('chatMessage', msg);
    });

    socket.on('disconnect', () => {
      // optional cleanup for anon users
    });
  });

  return io;
}

module.exports = initSocket;