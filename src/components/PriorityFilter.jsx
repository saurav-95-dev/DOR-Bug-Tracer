import PropTypes from "prop-types";

export default function PriorityFilter({ selectedPriority, setSelectedPriority }) {
  return (
    <div className="priority-filter">
      <label>Filter by Priority: </label>
      <select value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)}>
        <option value="All">All</option>
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>
    </div>
  );
}

PriorityFilter.propTypes = {
  selectedPriority: PropTypes.string.isRequired,
  setSelectedPriority: PropTypes.func.isRequired
};
