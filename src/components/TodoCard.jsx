import { useState } from "react";
import PropTypes from "prop-types";

export default function TodoCard({ 
    todo, 
    handleDeleteTodo, 
    todoIndex, 
    handleCompleteTodo, 
    handleEditTodo 
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [newInput, setNewInput] = useState(todo.input);
    const [newPriority, setNewPriority] = useState(todo.priority);

    return (
        <div className={`card todo-item priority-${todo.priority.toLowerCase()}`}>
            {isEditing ? (
                <>
                    <input 
                        type="text" 
                        value={newInput} 
                        onChange={(e) => setNewInput(e.target.value)} 
                    />
                    <select 
                        value={newPriority} 
                        onChange={(e) => setNewPriority(e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </>
            ) : (
                <>
                    <p>{todo.input}</p>
                    <span className="priority-badge">{todo.priority}</span>
                </>
            )}

            {todo.file && (
                <div className="file-preview">
                    {todo.file.type.startsWith("image/") ? (
                        <img src={todo.file.url} alt="Uploaded file" width="100" />
                    ) : todo.file.type.startsWith("video/") ? (
                        <video width="200" controls>
                            <source src={todo.file.url} type={todo.file.type} />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <a href={todo.file.url} download>Download File</a>
                    )}
                </div>
            )}

            <div className="todo-buttons">
                {isEditing ? (
                    <button 
                        onClick={() => {
                            handleEditTodo(todoIndex, newInput, newPriority);
                            setIsEditing(false);
                        }}
                    >
                        <h6>Save</h6>
                    </button>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)}>
                            <h6>Edit</h6>
                        </button>
                        <button 
                            onClick={() => handleCompleteTodo(todoIndex)} 
                            disabled={todo.complete}
                        >
                            <h6>Done</h6>
                        </button>
                        <button onClick={() => handleDeleteTodo(todoIndex)}>
                            <h6>Delete</h6>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

TodoCard.propTypes = {
    todo: PropTypes.object.isRequired,
    handleDeleteTodo: PropTypes.func.isRequired,
    todoIndex: PropTypes.number.isRequired,
    handleCompleteTodo: PropTypes.func.isRequired,
    handleEditTodo: PropTypes.func.isRequired,
};