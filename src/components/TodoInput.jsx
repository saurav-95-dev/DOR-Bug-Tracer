import { useState } from "react";
import PropTypes from "prop-types";

export default function TodoInput(props) {
  const { handleAddTodo } = props;
  
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);
  const [priority, setPriority] = useState("Medium");
  
  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }
  
  return (
    <div className="input-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add Task"
        aria-label="Task input"
      />
      
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        aria-label="Priority selection"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      
      <input 
        type="file" 
        onChange={handleFileChange} 
        aria-label="File attachment"
      />
      
      <button
        onClick={() => {
          if (!inputValue) return;
          handleAddTodo(inputValue, file, priority);
          setInputValue("");
          setFile(null);
          setPriority("Medium");
        }}
        aria-label="Add task"
      >
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}

TodoInput.propTypes = {
  handleAddTodo: PropTypes.func.isRequired
};









