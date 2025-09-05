// src/pages/Dashboard.jsx
import React, { useState } from "react";
import TaskFilter from "../Task/TaskFilter";
import TaskForm from "../Task/TaskForm";
import TaskList from "../Task/TaskList";
import { useNavigate } from "react-router-dom"; 


const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("none");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // clear login
    navigate("/login"); // redirect to login
  };

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Filtering
  let filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  // Sorting
  if (sort === "priority") {
    const order = { high: 1, medium: 2, low: 3 };
    filteredTasks = [...filteredTasks].sort((a, b) => order[a.priority] - order[b.priority]);
  } else if (sort === "dueDate") {
    filteredTasks = [...filteredTasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }

  const todayDate = new Date().toISOString().split("T")[0];
  const todayTasks = filteredTasks.filter((t) => t.dueDate && t.dueDate === todayDate);
  const otherTasks = filteredTasks.filter((t) => !t.dueDate || t.dueDate !== todayDate);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Task Manager</h2>
        <button onClick={handleLogout} className="btn logout-btn">
          🚪 Logout
        </button>
      </div>

      <TaskForm addTask={addTask} />
      <TaskFilter setFilter={setFilter} setSort={setSort} />

      {todayTasks.length > 0 && (
        <>
          <h3 className="section-title">📌 Today</h3>
          <TaskList tasks={todayTasks} toggleTask={toggleTask} deleteTask={deleteTask} />
        </>
      )}

      <h3 className="section-title">📋 All Tasks</h3>
      <TaskList tasks={otherTasks} toggleTask={toggleTask} deleteTask={deleteTask} />
    </div>
  );
};

export default Dashboard;