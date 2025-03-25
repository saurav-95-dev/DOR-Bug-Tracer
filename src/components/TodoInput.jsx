import { useState } from "react";
import PropTypes from "prop-types";

export default function TodoInput(props) {
  const { handleAddTodo } = props;

  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);
  const [priority, setPriority] = useState("Medium");

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  return (
    <div className="input-container">
      <input 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Add Task"
      />
      
      <select 
        value={priority} 
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <input type="file" onChange={handleFileChange} />
      
      <button 
        onClick={() => {
          if (!inputValue) return;
          handleAddTodo(inputValue, file, priority);
          setInputValue("");
          setFile(null);
          setPriority("Medium");
        }}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}

TodoInput.propTypes = {
  handleAddTodo: PropTypes.func.isRequired
};