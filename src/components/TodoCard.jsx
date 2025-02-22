//This particular component of TodoCard.jsx has to get rendered inside TodoList:

import PropTypes from 'prop-types';

export default function TodoCard(props) {

    const { todo =[]} = props;

    return (
        <div className = "card todo-item">
            <p>{todo.input}</p>
            <div className="todo-button">
                <button disabled = {todo.complete}>
                <h6>Done</h6>
                </button>
                <button>
                    <h6>Delete</h6>
               </button>
            </div>
        </div>
    )
}

TodoCard.propTypes = {
    todo : PropTypes.array.isRequired,
}