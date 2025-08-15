import React, { useState } from "react";
import "./index.css";

export default function Task({ task, onDelete, onSave }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  function save() {
    if (!title.trim()) return;
    onSave(task.id, title);
    setEditing(false);
  }

  return (
    <div className="task">
      {editing ? (
        <div className="task-editing">
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
          />
          <button className="edit-task" onClick={save}>Save</button>
          <button className="cancel-edittask" onClick={() => setEditing(false)}>×</button>
        </div>
      ) : (
        <div className="task-view">
          {task.title}
          <button className="onEdit" onClick={() => setEditing(true)}>✎</button>
          <button className="onDelete" onClick={() => onDelete(task.id)}>×</button>
        </div>
      )}
    </div>
  );
}
