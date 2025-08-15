**Real-Time Task Board**

A collaborative task board built with React, Zustand, react-beautiful-dnd, and Socket.IO.
It supports real-time updates across multiple users, drag-and-drop tasks, and live online user count.

**Features & Functionality**

 Add, edit, and delete columns

 Add, edit, and delete tasks inside columns

 Drag & drop support for:

Reordering tasks within a column

Moving tasks between columns

Reordering entire columns

 Real-time collaboration

All changes sync instantly between connected clients using Socket.IO

Shows number of users online in the header

 Clean UI/UX

Expandable inline editor for tasks and columns

**Setup & Run Instructions**
1. Clone the repository

git clone https://github.com/ROHIT3496484/Todo-Tasks.git

cd Todo-Tasks-main

2. Start the backend server

The backend uses Node.js + Socket.IO.

cd backend

npm install

npm run start


Default: runs at http://localhost:4000

3. Start the React frontend

cd frontend

npm create vite@latest .   

npm install    
            
npm install zustand react-beautiful-dnd socket.io-client

npm run dev


Default: opens at http://localhost:3000

**Real-Time Architecture & Data Flow**

**Frontend (React + Zustand)**

UI state is managed in a central store (store.js).

When a user adds/edits/moves tasks, the store is updated and changes are sent to the server via Socket.IO.

**Backend (Node + Socket.IO)**

Maintains a single copy of the shared board state.

Listens for updates from clients and broadcasts them to everyone else.

Data Flow Example (dragging a task)

User drags a task into a new column.

That updates the local board state.

Store emits through the socket.

Server receives the update and broadcasts the new board to all connected clients.

All clients receive and update their local UI instantly.

This makes the board eventually consistent across all browsers in real time.

**Tradeoffs & Limitations**

Currently only one board is supported. Multi-board workspaces would need backend extension.

Board state lives in server memory. Restarting clears everything. Persistence could be added via a database (MongoDB, Postgres, Redis).

Uses last write wins. If two people edit the same task at once, the latest update overrides the earlier one.

UI Enhancement needed.
