import { useState } from 'react';
import PropTypes from 'prop-types';

export default function TodoCard({
    todo,
    handleDeleteTodo,
    todoIndex,
    handleCompleteTodo,
    handleEditTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newInput, setNewInput] = useState(todo.input);
    const [newPriority, setNewPriority] = useState(todo.priority);
    
    return (
        <div className={`card todo-item priority-${todo.priority.toLowerCase()}`}>
            <div className="todo-content">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={newInput}
                            onChange={(e) => setNewInput(e.target.value)}
                            className="edit-input"
                        />
                        <select
                            value={newPriority}
                            onChange={(e) => setNewPriority(e.target.value)}
                            className="edit-priority"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </>
                ) : (
                    <div className="todo-info">
                        <p className="todo-text">{todo.input}</p>
                        <span className="priority-badge">{todo.priority}</span>
                        
                        <div className="file-preview">
                            {todo.file ? (
                                <>
                                    {todo.file.type.startsWith('image/') ? (
                                        <img src={todo.file.url} alt="Uploaded file" width="100" />
                                    ) : todo.file.type.startsWith('video/') ? (
                                        <video width="200" controls>
                                            <source src={todo.file.url} type={todo.file.type} />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <a href={todo.file.url} download>{todo.file.name || "Download File"}</a>
                                    )}
                                </>
                            ) : (
                                <span className="no-file-text">No document attached</span>
                            )}
                        </div>
                    </div>
                )}
            </div>
            
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