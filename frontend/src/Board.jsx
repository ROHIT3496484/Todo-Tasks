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

    // Deep copy columns AND tasks to avoid mutating original references
    const columns = board.columns.map(col => ({
      ...col,
      tasks: [...col.tasks],
    }));
    const nextBoard = { ...board, columns };

    if (type === "column") {
      const [moved] = columns.splice(source.index, 1);
      columns.splice(destination.index, 0, moved);
    } else {
      const fromIdx = columns.findIndex(c => c.id === source.droppableId);
      const toIdx   = columns.findIndex(c => c.id === destination.droppableId);
      if (fromIdx === -1 || toIdx === -1) return;

      const [movedTask] = columns[fromIdx].tasks.splice(source.index, 1);
      columns[toIdx].tasks.splice(destination.index, 0, movedTask);
    }

    updateBoard(nextBoard);
  }

  function addColumn(title) {
    const columns = [
      ...board.columns,
      { id: Date.now().toString(), title, tasks: [] },
    ];
    updateBoard({ ...board, columns });
  }

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <AddColumnForm onAdd={addColumn} />
      {board.columns.length === 0 && <p>No columns yet</p>}
      <ColumnList columns={board.columns} />
    </DragDropContext>
  );
}
