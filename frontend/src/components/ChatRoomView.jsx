import React, { useEffect, useMemo, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { io } from 'socket.io-client';

const ROOM_QUERY = gql`
  query Room($id: ID!) { room(id: $id) { id name messages { id userId text createdAt } } }
`;

const socket = io('http://localhost:4000');

export default function ChatRoomView({ roomId }) {
  const { data, refetch } = useQuery(ROOM_QUERY, { variables: { id: roomId } });
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const anonId = useMemo(() => 'user-' + Math.random().toString(36).slice(2, 8), []);

  useEffect(() => {
    refetch({ id: roomId });
    socket.emit('joinRoom', { roomId });
  }, [roomId, refetch]);

  useEffect(() => {
    if (data?.room?.messages) setMessages(data.room.messages);
  }, [data]);

  useEffect(() => {
    const handler = msg => {
      if (msg.roomId === roomId) setMessages(prev => [...prev, msg]);
    };
    socket.on('chatMessage', handler);
    return () => socket.off('chatMessage', handler);
  }, [roomId]);

  const send = e => {
    e.preventDefault();
    if (!text.trim()) return;
    socket.emit('chatMessage', { roomId, text, userId: anonId });
    setText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
        {messages.map(m => (
          <div key={m.id}>
            <strong>{m.userId}</strong> [{new Date(m.createdAt).toLocaleTimeString()}]: {m.text}
          </div>
        ))}
      </div>
      <form onSubmit={send} style={{ display: 'flex', padding: 8 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type a message"
          style={{ flex: 1 }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}