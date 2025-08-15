import React, { useEffect } from "react";
import Board from "./Board";
import useBoardStore from "./store";
import { socket } from "./Socket";
import "./index.css";

const App=()=> {
  const { setBoard, setOnlineUsers, onlineUsers } = useBoardStore();

  useEffect(() => {
    socket.on("board", (data) => setBoard(data));
    socket.on("presence", (count) => setOnlineUsers(count));

    return () => {
      socket.off("board");
      socket.off("presence");
    };
  }, [setBoard, setOnlineUsers]);

  return (
    <div className="App">
      <header className="header">
        <h1 >Real-Time Task Board</h1>
        <p> <span className="green">🟢</span> {onlineUsers} users online</p>
      </header>
      <Board />
    </div>
  );
}

export default App;