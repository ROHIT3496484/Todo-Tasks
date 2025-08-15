import React, { useState } from "react";
import TaskList from "./TaskList";
import useBoardStore from "./store";
import "./index.css"; 

export default function Column({ column, dragHandleProps }) {
  const { board, updateBoard } = useBoardStore();
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [addingTask, setAddingTask] = useState(false);
  const [taskName, setTaskName] = useState("");

  function updateColumns(cols) {
    updateBoard({ ...board, columns: cols });
  }

  function addTask() {
    if (!taskName.trim()) return;
    const newTask = { id: Date.now().toString(), title: taskName };
    const cols = board.columns.map(c =>
      c.id === column.id ? { ...c, tasks: [...c.tasks, newTask] } : c
    );
    updateColumns(cols);
    setTaskName("");
    setAddingTask(false);
  }

  function deleteTask(id) {
    const cols = board.columns.map(c =>
      c.id === column.id ? { ...c, tasks: c.tasks.filter(t => t.id !== id) } : c
    );
    updateColumns(cols);
  }

  function saveTask(id, newTitle) {
    const cols = board.columns.map(c =>
      c.id === column.id ? { ...c, tasks: c.tasks.map(t => t.id === id ? { ...t, title: newTitle } : t) } : c
    );
    updateColumns(cols);
  }

  function deleteColumn() {
    updateColumns(board.columns.filter(c => c.id !== column.id));
  }

  function saveTitle() {
    if (!title.trim()) return;
    const cols = board.columns.map(c =>
      c.id === column.id ? { ...c, title } : c
    );
    updateColumns(cols);
    setEditTitle(false);
  }

  return (
    <div className="column">
      <h2 {...dragHandleProps}>
        {editTitle ? (
          <>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <button className = "edit-column" onClick={saveTitle}>Save</button>
            <button className= "cancel-editcolumn"onClick={() => setEditTitle(false)}>x</button>
          </>
        ) : (
          <>
            <span onClick={() => setEditTitle(true)}>{column.title}</span>
            <button className="delete-column" onClick={deleteColumn}><b>x</b></button>
          </>
        )}
      </h2>

      <TaskList
        columnId={column.id}
        tasks={column.tasks}
        onDelete={deleteTask}
        onSave={saveTask}
      />

      {addingTask ? (
        <div>
          <input className="task-input"
            type="text"
            placeholder="Task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button className="add-newtask" onClick={addTask}>Add</button>
          <button className= "cancel-task" onClick={() => setAddingTask(false)}>x</button>
        </div>
      ) : (
        <button className="Add-Tasks" onClick={() => setAddingTask(true)}>+ Add Task</button>
      )}
    </div>
  );
}
