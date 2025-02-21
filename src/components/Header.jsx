export default function Header(props) {
    
    const { todos } = props;
    const todosLength = todos.length;
    const istasksPlural = todosLength != 1;
    const tasksOrTasks = istasksPlural ? "tasks" : "task";
    return (
        <header>
            <h1 className="text-gradient">You have { todosLength} Open tasks.</h1>
        </header>
    )
}