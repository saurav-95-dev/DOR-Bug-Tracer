import { useState } from "react";

export default function TodoCard({ todo, handleDeleteTodo, todoIndex, handleCompleteTodo, handleEditTodo }) {

  const [isEditing, setIsEditing] = useState(false); //isEditing is defaultly set to false! (Sequence-1)
  const [newInput, setNewInput] = useState(todo.input);


  return (
    <div className="card todo-item"> 
      {/* Sequence-3 , When the page re-render after the click of edit btn, a new input box gets rendered instead of todo.input since isEditing is set to true! */}
      {isEditing ? (
        <input type="text" value={newInput} onChange={(e) => setNewInput(e.target.value)} /> 
      ) : (
        <p>{todo.input}</p>
      )}

      <div className="todo-buttons">
        {isEditing ? (
          <button onClick={()=>{
            handleEditTodo(todoIndex , newInput)
            setIsEditing(false);
          }}><h6>Save</h6></button> 
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}><h6>Edit</h6></button> {/* (Sequence-2) When the edit btn is clicked , isEditing is set to true and the page re-renders itself*/}
            <button onClick={() => handleCompleteTodo(todoIndex)} disabled={todo.complete}><h6>Done</h6></button>
            <button onClick={() => handleDeleteTodo(todoIndex)}><h6>Delete</h6></button>
          </>
        )}
      </div>
    </div>
  );
}
