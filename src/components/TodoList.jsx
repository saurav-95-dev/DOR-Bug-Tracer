import TodoCard from "./TodoCard";
import PropTypes from "prop-types";

export default function TodoList(props) {
  const {
    todos,
    selectedTab,
    selectedPriority,
    ...restProps
  } = props;

  // Filter todos based on tab and priority
  const filterTodosList = todos.filter(todo => {
    // Tab filtering
    const tabMatch =
      selectedTab === "All" ||
      (selectedTab === "Completed" && todo.complete) ||
      (selectedTab === "Open" && !todo.complete);

    // Priority filtering
    const priorityMatch =
      selectedPriority === "All" ||
      todo.priority === selectedPriority;

    return tabMatch && priorityMatch;
    
  });

  return (
    <div className="todo-list-responsive">
      {filterTodosList.length > 0 ? (
        filterTodosList.map((todo, todoIndex) => {
          const originalIndex = todos.findIndex(
            val => val.input === todo.input && val.priority === todo.priority
          );
          
          return (
            <TodoCard
              key={originalIndex}
              todo={todo}
              {...restProps}
              todoIndex={originalIndex}
            />
          );
        })
      ) : (
        <div className="no-tasks">
          <p>No tasks available</p>
        </div>
      )}
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  selectedTab: PropTypes.string.isRequired,
  selectedPriority: PropTypes.string
};