//Todo card has to be rendered inside TodoList , i..e inside this particular component .

import TodoCard from "./TodoCard";
import PropTypes from "prop-types"; 

//This functional component has to communicate with the Tabs Component 
//Because the number shown in the Tabs will decide the list that has to be displayed!
export default function TodoList(props) {

    const { todos } = props;

    const tab = "All"
    let filterTodoList = 0;
    if (tab === "All") {
        filterTodoList = todos;
    }
    else if (tab === "completed") {
        filterTodoList = todos.filter(val=>val.complete)
    }
    else {
        filterTodoList = todos.filter(val => !val.complete);
    }
    

    return (
        <>
            {
                filterTodoList.map((todo , todoIndex) => {
                    return (
                        <TodoCard
                            key={todoIndex}
                            todo={todo}
                        />
                    )
                })
            }
        </>
    )
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
}
