//The TodoList is going to be dependent on the tab that's currently opened :
import TodoCard from "./TodoCard";
import PropTypes from "prop-types";

 
export default function TodoList(props) {

    const { todos , selectedTab} = props;
    const filterTodosList = selectedTab == "All" ? 
    todos :
    selectedTab == "Completed" ? 
    todos.filter(val=>val.complete) : 
    todos.filter(val=>!val.complete);

    
    return (
        <>
            {
                filterTodosList.map((todo , todoIndex) => {
                    return (
                        <TodoCard key={ todoIndex} todo={todo} {...props} todoIndex={todos.findIndex(val=>val.input==todo.input)}/>
                    )
                })
            }
        </>
     )
}
 
TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    selectedTab : PropTypes.array.isRequired,
};