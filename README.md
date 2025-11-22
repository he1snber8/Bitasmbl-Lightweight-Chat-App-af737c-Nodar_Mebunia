# Bitasmbl-Lightweight-Chat-App-af737c-Nodar_Mebunia

## Description
Build a web application that allows users to join anonymous chatrooms and exchange messages in real-time using WebSockets. The focus is on fast communication, simple interface, and responsive updates without requiring user registration.

## Tech Stack
- GraphQL
- React
- Socket.IO

## Requirements
- Allow users to join chatrooms without authentication
- Gracefully handle disconnected users and reconnections
- Handle multiple chatrooms simultaneously
- Display messages with timestamps and user identifiers (anonymous)
- Send and receive messages in real-time using WebSockets

## Installation
bash
git clone https://github.com/he1snber8/Bitasmbl-Lightweight-Chat-App-af737c-Nodar_Mebunia.git
cd Bitasmbl-Lightweight-Chat-App-af737c-Nodar_Mebunia
npm install


## Usage
bash
npm start


## Implementation Steps
1. Set up React UI for selecting and viewing chatrooms.
2. Integrate Socket.IO for real-time message exchange.
3. Add anonymous user identifiers and timestamps in the UI.
4. Support multiple simultaneous chatrooms in the interface.
5. Handle disconnect and reconnect events via Socket.IO.
6. Expose GraphQL schema and operations for chatroom data if needed.