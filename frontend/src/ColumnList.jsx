import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Column from "./Column";
import "./index.css"; 

export default function ColumnList({ columns }) {
  return (
    <Droppable droppableId="board" direction="horizontal" type="column">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="board">
          {columns.map((col, i) => (
            <Draggable key={col.id} draggableId={col.id} index={i}>
              {(prov) => (
                <div
                  ref={prov.innerRef}
                  {...prov.draggableProps}
                  className="column-wrap"
                >
                  <Column column={col} dragHandleProps={prov.dragHandleProps} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
