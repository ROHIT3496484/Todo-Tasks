import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import useBoardStore from "./store";
import AddColumnForm from "./AddColumnForm";
import ColumnList from "./ColumnList";
import "./index.css";

export default function Board() {
  const { board, updateBoard } = useBoardStore();

  function handleDrag(result) {
    if (!result.destination) return;

    const { source, destination, type } = result;
    const copy = { ...board, columns: [...board.columns] };

    if (type === "column") {
      const moved = copy.columns.splice(source.index, 1)[0];
      copy.columns.splice(destination.index, 0, moved);
    } else {
      const fromCol = copy.columns.find(c => c.id === source.droppableId);
      const toCol = copy.columns.find(c => c.id === destination.droppableId);
      const task = fromCol.tasks.splice(source.index, 1)[0];
      toCol.tasks.splice(destination.index, 0, task);
    }

    updateBoard(copy);
  }

  function addColumn(title) {
    const copy = { ...board, columns: [...board.columns] };
    copy.columns.push({
      id: Date.now().toString(),
      title,
      tasks: []
    });
    updateBoard(copy);
  }

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <AddColumnForm onAdd={addColumn} />

      {board.columns.length === 0 && <p>No columns yet</p>}

      <ColumnList columns={board.columns} />
    </DragDropContext>
  );
}
