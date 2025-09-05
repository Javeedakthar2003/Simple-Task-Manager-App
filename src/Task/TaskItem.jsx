// src/Task/TaskItem.jsx
import React from "react";

const TaskItem = ({ task, toggleTask, deleteTask }) => {
  const today = new Date().toISOString().split("T")[0];
  const isOverdue =
    task.dueDate && task.dueDate < today && !task.completed;

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} ${
        isOverdue ? "overdue" : ""
      }`}
    >
      <div className="task-details">
        <span className="task-text">{task.text}</span>
        <div className="meta">
          {task.dueDate && (
            <span className="due-date">
              📅 {task.dueDate}{" "}
              {isOverdue && <strong className="overdue-tag">Overdue</strong>}
            </span>
          )}
          <span className={`priority ${task.priority}`}>
            {task.priority.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button onClick={() => toggleTask(task.id)}>
          {task.completed ? "Undo" : "Done"}
        </button>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
