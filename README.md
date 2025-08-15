** Real-Time Task Board**

A collaborative Kanban-style task board built with React, Zustand, react-beautiful-dnd, and Socket.IO.
It supports real-time updates across multiple users, drag-and-drop tasks, and live online user count.

** Features & Functionality**

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

**🚀 Setup & Run Instructions**
1. Clone the repository
git clone https://github.com/your-username/realtime-task-board.git
cd realtime-task-board

2. Start the backend server

The backend uses Node.js + Socket.IO.

cd server
npm install
npm start


Default: runs at http://localhost:4000

3. Start the React frontend
cd client
npm install
npm start


Default: opens at http://localhost:3000

** Real-Time Architecture & Data Flow**

The project uses a client-server architecture with event-driven updates.

flowchart TD
    A[User Action<br>(Add/Edit/Drag)] --> B[Zustand Store<br>(Frontend State)]
    B --> C[Socket.IO Client<br>Emit updateBoard]
    C --> D[Socket.IO Server]
    D -->|Broadcast board| E[All Connected Clients]
    E --> F[Zustand Store Updates]
    F --> G[React Re-render<br>Updated UI]


Step by step example (moving a task):

User drags a task into a new column.

onDragEnd updates the local board state (Zustand).

The store emits "updateBoard" through Socket.IO.

The backend receives it and broadcasts the updated board to everyone.

All clients update their state and re-render instantly.

** Tradeoffs & Limitations**

Single shared board: Currently only one board is supported. Multi-board workspaces would need backend extension.

No persistence: Board state lives in server memory. Restarting clears everything. Persistence could be added via a database (MongoDB, Postgres, Redis).

Conflict resolution: Uses last write wins. If two people edit the same task at once, the latest update overrides the earlier one.

Drag-and-drop edge cases: react-beautiful-dnd handles most cases well, but empty columns needed extra handling (min-height drop zones).

Scalability: Works well for small teams. For larger scale, horizontal scaling and sticky sessions (or Redis pub/sub) would be needed.
