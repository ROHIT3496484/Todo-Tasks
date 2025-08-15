import React, { useState } from "react";
import "./index.css"; 

export default function AddColumnForm({ onAdd }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");

  function handleAdd() {
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle("");
    setShowForm(false);
  }

  return (
    <div className="add-column">{
    showForm ? (
    <div className="add-column-form">
    <div className="columncreate">
      <input
        type="text"
        placeholder="Add Column"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button className="add-columntile" onClick={handleAdd}>Add</button>
      <button className="cancel-column" onClick={() => setShowForm(false)}>x</button>
    </div>
    </div>
  ) : (
    <button className="Addcolumn" onClick={() => setShowForm(true)}>+ Add Column</button>
  )
  }
</div>
  )
}