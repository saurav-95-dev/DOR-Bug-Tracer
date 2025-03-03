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
        <p>{todo.input} <strong>({todo.priority})</strong></p>
      )}

      <div className="todo-buttons">
        {isEditing ? (
          <button onClick={() => { handleEditTodo(todoIndex, newInput); setIsEditing(false); }}>Save</button> 
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => handleCompleteTodo(todoIndex)} disabled={todo.complete}>Done</button>
            <button onClick={() => handleDeleteTodo(todoIndex)}>Delete</button>
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
