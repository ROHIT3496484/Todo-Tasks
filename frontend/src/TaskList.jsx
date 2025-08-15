import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import "./index.css";

export default function TaskList({ columnId, tasks, onDelete, onSave }) {
  return (
    <Droppable droppableId={columnId} type="TASK">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="tasks"
          style={{ minHeight: 60, padding: 4 }} // keeps empty columns droppable
        >
          {tasks.map((task, i) => (
            <Draggable key={task.id} draggableId={task.id} index={i}>
              {(prov) => (
                <div
                  ref={prov.innerRef}
                  {...prov.draggableProps}
                  {...prov.dragHandleProps}
                  style={{
                    marginBottom: 8,
                    ...prov.draggableProps.style,
                  }}
                >
                  <Task task={task} onDelete={onDelete} onSave={onSave} />
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
