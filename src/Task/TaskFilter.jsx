// src/components/Task/TaskFilter.jsx
import React from "react";

const TaskFilter = ({ setFilter, setSort }) => {
  return (
    <div className="task-filter">
      <div className="filter-group">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <div className="sort-group">
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="none">Sort by</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;
