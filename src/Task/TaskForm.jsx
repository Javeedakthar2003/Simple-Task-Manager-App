// src/Task/TaskForm.jsx
import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    addTask({
      text,
      dueDate,
      priority,
    });

    setText("");
    setDueDate("");
    setPriority("medium");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="high">🔥 High</option>
        <option value="medium">⚡ Medium</option>
        <option value="low">🌱 Low</option>
      </select>

      <button type="submit" className="btn add-btn">+ Add Task</button>

    </form>
  );
};

export default TaskForm;
