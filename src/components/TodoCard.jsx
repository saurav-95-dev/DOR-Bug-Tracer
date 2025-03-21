import { useState } from "react";
import PropTypes from "prop-types";

export default function TodoCard({ todo, handleDeleteTodo, todoIndex, handleCompleteTodo, handleEditTodo }) {

  const [isEditing, setIsEditing] = useState(false);
  const [newInput, setNewInput] = useState(todo.input);

  return (
    <div className="card todo-item"> 
      {isEditing ? (
        <input type="text" value={newInput} onChange={(e) => setNewInput(e.target.value)} /> 
      ) : (
        <p>{todo.input}</p>
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
          <button onClick={() => {
            handleEditTodo(todoIndex, newInput);
            setIsEditing(false);
          }}><h6>Save</h6></button> 
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}><h6>Edit</h6></button>
            <button onClick={() => handleCompleteTodo(todoIndex)} disabled={todo.complete}><h6>Done</h6></button>
            <button onClick={() => handleDeleteTodo(todoIndex)}><h6>Delete</h6></button>
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
<<<<<<< HEAD
};
=======
};
>>>>>>> 864904fedec852b69a77c9b78d210ec6f10dae65
