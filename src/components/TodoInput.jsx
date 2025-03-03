import { useState } from "react";
import PropTypes from "prop-types";

export default function TodoInput({ handleAddTodo }) {
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Low");

  function handleSubmit(e) {
    e.preventDefault();
    if (newTask.trim() !== "") {
      handleAddTodo(newTask, priority);
      setNewTask("");
      setPriority("Low");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

TodoInput.propTypes = {
  handleAddTodo: PropTypes.func.isRequired
};
