import PropTypes from "prop-types"; //Used for validating props in react components

export default function Header(props) {
    //Destructure the props with an empty array by default incase if received an empty prop. 
    const { todos = []} = props;
    //Taking out the length of todos:
    const todosLength = todos.length;
    
    //Logic to inject tasks or task inside header:
    const isTasksPlural = todosLength != 1;
    const tasksOrTasks = isTasksPlural ? "tasks" : "task";

    return (
        <header>
            <h1 className="text-gradient">You have {todosLength} Open {tasksOrTasks}.</h1>
        </header>
    )
}

Header.propTypes = {
    todos: PropTypes.array.isRequired,
}