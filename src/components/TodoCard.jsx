import { useState } from 'react';
import PropTypes from 'prop-types';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; // adjust path as needed

export default function TodoCard({
    todo,
    handleDeleteTodo,
    todoIndex,
    handleCompleteTodo,
    handleEditTodo,
    handleUpdateDetails,
    handleVote
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [newInput, setNewInput] = useState(todo.input);
    const [newPriority, setNewPriority] = useState(todo.priority);
    const [showDetails, setShowDetails] = useState(false);
    const [description, setDescription] = useState(todo.description || '');
    const [uploadedFiles, setUploadedFiles] = useState(todo.attachments || []);
    const [reportSuccess, setReportSuccess] = useState(false);

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const newFiles = files.map(file => ({
            name: file.name,
            type: file.type,
            size: file.size,
            url: URL.createObjectURL(file)
        }));

        const updatedFiles = [...uploadedFiles, ...newFiles];
        setUploadedFiles(updatedFiles);

        if (handleUpdateDetails) {
            handleUpdateDetails(todoIndex, {
                description,
                attachments: updatedFiles
            });
        }
    };

    const saveDetails = () => {
        if (handleUpdateDetails) {
            handleUpdateDetails(todoIndex, {
                description,
                attachments: uploadedFiles
            });
        }
        setShowDetails(false);
    };

    const renderFilePreview = (file) => {
        if (file.type.startsWith('image/')) {
            return <img src={file.url} alt={file.name} width="100" />;
        } else if (file.type.startsWith('video/')) {
            return (
                <video width="200" controls>
                    <source src={file.url} type={file.type} />
                    Your browser does not support the video tag.
                </video>
            );
        } else if (file.type.startsWith('audio/')) {
            return (
                <audio controls>
                    <source src={file.url} type={file.type} />
                    Your browser does not support the audio tag.
                </audio>
            );
        } else {
            return <a href={file.url} download>{file.name}</a>;
        }
    };

    const handleReportNIC = async () => {
        try {
            const reportRef = collection(db, "nicReports");
            await addDoc(reportRef, {
                todoId: todo.id || todoIndex,
                input: todo.input,
                priority: todo.priority,
                timestamp: serverTimestamp(),
                description: description || '',
                attachments: uploadedFiles || [],
            });

            setReportSuccess(true);
        } catch (error) {
            console.error("Error reporting NIC:", error);
            alert("Failed to report NIC. Please try again.");
        }
    };

    return (
        <>
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

                    <div className="vote-container">
                        <h5 className='upvote-label'>Upvote or downvote here:</h5>
                        <span className="votes-count">{todo.votes || 0}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleVote(todoIndex, 'upvote');
                            }}
                            className="vote-btn upvote-btn"
                        >
                            <i className="fa-solid fa-arrow-up"></i>
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleVote(todoIndex, 'downvote');
                            }}
                            className="vote-btn downvote-btn"
                        >
                            <i className="fa-solid fa-arrow-down"></i>
                        </button>
                    </div>
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
                            <button onClick={() => setShowDetails(true)} className="details-button">
                                <h6>Details</h6>
                            </button>

                            {/* Report NIC Button */}
                            <button
  onClick={handleReportNIC}
  style={reportSuccess ? { backgroundColor: '#28a745', color: 'white' } : {}}
>
  <h6>{reportSuccess ? "Reported" : "Report NIC"}</h6>
</button>

                        </>
                    )}
                </div>
            </div>

            {showDetails && (
                <div className="todo-details-modal">
                    <div className="todo-details-content">
                        <h3>Task Details</h3>
                        <h4>{todo.input}</h4>

                        <div className="detail-section">
                            <label>Description:</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add detailed description..."
                                rows="4"
                            ></textarea>
                        </div>

                        <div className="detail-section">
                            <label>Attachments:</label>
                            <input
                                type="file"
                                onChange={handleFileUpload}
                                multiple
                                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                            />

                            <div className="attachments-preview">
                                {uploadedFiles.length > 0 ? (
                                    uploadedFiles.map((file, index) => (
                                        <div key={index} className="attachment-item">
                                            {renderFilePreview(file)}
                                        </div>
                                    ))
                                ) : (
                                    <p>No attachments</p>
                                )}
                            </div>
                        </div>

                        <div className="detail-actions">
                            <button onClick={saveDetails}>Save</button>
                            <button onClick={() => setShowDetails(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

TodoCard.propTypes = {
    todo: PropTypes.object.isRequired,
    handleDeleteTodo: PropTypes.func.isRequired,
    todoIndex: PropTypes.number.isRequired,
    handleCompleteTodo: PropTypes.func.isRequired,
    handleEditTodo: PropTypes.func.isRequired,
    handleUpdateDetails: PropTypes.func,
    handleVote: PropTypes.func.isRequired
};
