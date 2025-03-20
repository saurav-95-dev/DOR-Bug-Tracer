import { useState } from "react";
import PropTypes from "prop-types";

export default function TodoInput(props) {
    const { handleAddTodo } = props;

    const [inputValue, setInputValue] = useState("");
    const [file, setFile] = useState(null);

    function handleFileChange(e) {
        setFile(e.target.files[0]);
    }

    return (
        <div className="input-container">
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Add Task"></input>

            <input type="file" onChange={handleFileChange} />

            <button onClick={() => {
                if (!inputValue) return;
                handleAddTodo(inputValue, file);
                setInputValue("");
                setFile(null);
            }}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    );
}

TodoInput.propTypes = {
    handleAddTodo: PropTypes.func.isRequired
};
