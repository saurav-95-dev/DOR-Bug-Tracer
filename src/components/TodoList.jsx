import TodoCard from "./TodoCard";
import PropTypes from "prop-types";

export default function TodoList({ todos, selectedTab, selectedPriority, ...props }) {
  let filterTodosList = todos;
  
  if (selectedTab !== "All") {
    filterTodosList = selectedTab === "Completed" 
      ? todos.filter(todo => todo.complete)
      : todos.filter(todo => !todo.complete);
  }

  if (selectedPriority !== "All") {
    filterTodosList = filterTodosList.filter(todo => todo.priority === selectedPriority);
  }

  return (
    <>
      <h2>Prioritized Tasks</h2>
      {filterTodosList.filter(todo => todo.priority === "High").map((todo, todoIndex) => (
        <TodoCard key={todoIndex} todo={todo} {...props} todoIndex={todos.findIndex(t => t.input === todo.input)} />
      ))}
      
      <h2>All Tasks</h2>
      {filterTodosList.map((todo, todoIndex) => (
        <TodoCard key={todoIndex} todo={todo} {...props} todoIndex={todos.findIndex(t => t.input === todo.input)} />
      ))}
    </>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  selectedTab: PropTypes.string.isRequired,
  selectedPriority: PropTypes.string.isRequired,
};
