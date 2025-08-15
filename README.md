Real-Time Task Board

A collaborative task board built with React, Zustand for state management, react-beautiful-dnd for drag & drop, and Socket.IO for real-time synchronization across multiple users.

This project lets you create columns, add tasks, drag tasks between columns, and see updates instantly reflected for all connected users.

🚀 Setup & Run Instructions

Clone the repository

git clone https://github.com/ROHIT3496484/Todo-Tasks.git
cd Todo-Tasks-main


Install dependencies

npm install


Start the backend server (must be running for real-time sync)

cd server
npm install
npm start


By default it runs at http://localhost:4000.

Start the React frontend

cd client
npm start


The app will open at http://localhost:3000.

⚡ Real-Time Architecture & Data Flow

Frontend (React + Zustand)

UI state is managed in a central store (store.js).

When a user adds/edits/moves tasks, the store is updated and changes are sent to the server via Socket.IO.

Backend (Node + Socket.IO)

Maintains a single copy of the shared board state.

Listens for updates from clients and broadcasts them to everyone else.

Data Flow Example (dragging a task)

User drags a task into a new column.

onDragEnd updates the local board state.

Store emits "updateBoard" through the socket.

Server receives the update and broadcasts the new board to all connected clients.

All clients receive "board" and update their local UI instantly.

This makes the board eventually consistent across all browsers in real time.

⚖️ Tradeoffs & Limitations

Single shared state: The server keeps only one board. If multiple different boards/workspaces are needed, the backend must be extended.

No persistence: Currently, state is in memory only. Restarting the server wipes the board. (You could add a database like MongoDB or Postgres for persistence.

Basic conflict resolution: The “last write wins” model is used. If two users edit the same task at the same time, whichever update arrives last overwrites the other.

Drag & drop library: react-beautiful-dnd is powerful but can be tricky with edge cases (e.g. empty columns). Alternatives like dnd-kit might be lighter.

Scalability: Works well for small groups. For hundreds of concurrent users, you’d need horizontal scaling and sticky sessions or a message broker.
