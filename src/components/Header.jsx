import PropTypes from "prop-types";

export default function Header({ todos }) {
    const todosLength = todos.length;
    const openTasksCount = todos.filter(todo => !todo.complete).length; 

    return (
        <header>
            <h1 className="text-gradient">
                You have {openTasksCount} open {todosLength === 1 ? "ticket" : "tickets"}.
            </h1>
        </header>
    );
}

Header.propTypes = {
    todos: PropTypes.array.isRequired
};