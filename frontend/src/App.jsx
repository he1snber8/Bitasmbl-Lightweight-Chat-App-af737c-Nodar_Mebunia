import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import ChatRoomView from './components/ChatRoomView';

const ROOMS_QUERY = gql`query { rooms { id name } }`;

export default function App() {
  const { data } = useQuery(ROOMS_QUERY);
  const [roomId, setRoomId] = useState('general');

  const rooms = data?.rooms ?? [];

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: 200, borderRight: '1px solid #ccc' }}>
        <h3>Rooms</h3>
        <ul>
          {rooms.map(r => (
            <li key={r.id} onClick={() => setRoomId(r.id)} style={{ cursor: 'pointer' }}>
              {r.name}
            </li>
          ))}
        </ul>
      </aside>
      <main style={{ flex: 1 }}>
        <ChatRoomView roomId={roomId} />
      </main>
    </div>
  );
}