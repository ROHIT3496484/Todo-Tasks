import { create } from "zustand";
import { socket } from "./Socket"; 

const useBoardStore = create((set) => ({
  board: { columns: [] },
  onlineUsers: 0,

  setBoard: (newBoard) => set({ board: newBoard }),
  
  updateBoard: (newBoard) => {
    set({ board: newBoard });
    socket.emit("updateBoard", newBoard);
  },

  setOnlineUsers: (count) => set({ onlineUsers: count })
}));

export default useBoardStore;
