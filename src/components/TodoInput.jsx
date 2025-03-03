import { useState } from "react"
import PropTypes from "prop-types";

export default function TodoInput(props) {
    
    const {handleAddTodo} = props;
   
    const [inputValue , setInputValue] = useState('');
    console.log(inputValue);
    return (
        <div className="input-container">
            <input value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} placeholder="Add Task" ></input>

            <button onClick={()=>{
                if(!inputValue){return};
                handleAddTodo(inputValue);
                setInputValue("");
            }}>
            <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    )
}

TodoInput.propTypes = {
    handleAddTodo: PropTypes.array.isRequired
};
