import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Starting board data
let board = {
  columns: [
    { id: "todo", title: "To Do", tasks: [{ id: "t1", title: "ToDo Task" }, { id: "t2", title: "ToDo Task2" }, { id: "t3", title: "ToDo Task3" }, { id: "t4", title: "ToDo Task4" }] },
    { id: "doing", title: "In Progress", tasks: [] },
    { id: "done", title: "Done", tasks: [] },
  ]
};

let onlineUsers = 0;

io.on("connection", (socket) => {
  onlineUsers++;
  io.emit("presence", onlineUsers);

  // Send board to new user
  socket.emit("board", board);

  // Update board from client
  socket.on("updateBoard", (newBoard) => {
    board = newBoard;
    socket.broadcast.emit("board", board);
  });

  socket.on("disconnect", () => {
    onlineUsers--;
    io.emit("presence", onlineUsers);
  });
});

server.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
