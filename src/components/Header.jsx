export default function Header(props) {
    
    const { todos } = props;
    const todosLength = todos.length;
    return (
        <header>
            <h1 className="text-gradient">You have { todosLength} Open tasks.</h1>
        </header>
    )
}