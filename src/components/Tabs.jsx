import PropTypes from "prop-types";

export default function Tabs(props) {
    const { 
        todos, 
        selectedTab, 
        setSelectedTab, 
        selectedPriority, 
        setSelectedPriority 
    } = props;

    const tabs = ["All", "Open", "Completed"];
    const priorities = ["All", "Low", "Medium", "High"];

    return (
        <div>
            <nav className="tab-container">
                {tabs.map((tab, tabIndex) => {
                    let numOfTask = 0;
                    if (tab === "All") {
                        numOfTask = todos.length;
                    } else if (tab === "Completed") {
                        numOfTask = todos.filter(val => val.complete).length;
                    } else {
                        numOfTask = todos.filter(val => !val.complete).length;
                    }

                    return (
                        <button 
                            onClick={() => setSelectedTab(tab)} 
                            key={tabIndex} 
                            className={"tab-button " + (tab === selectedTab ? "tab-selected" : "")}
                        >
                            <h4>{ tab } <span>({numOfTask})</span></h4>
                        </button>
                    );
                })}
                <hr/>
            </nav>

            <nav className="priority-container">
                {priorities.map((priority, priorityIndex) => {
                    let numOfTask = 0;
                    if (priority === "All") {
                        numOfTask = todos.length;
                    } else {
                        numOfTask = todos.filter(val => val.priority === priority).length;
                    }

                    return (
                        <button 
                            onClick={() => setSelectedPriority(priority)} 
                            key={priorityIndex} 
                            className={"priority-button " + (priority === selectedPriority ? "priority-selected" : "")}
                        >
                            <h4>{ priority } <span>({numOfTask})</span></h4>
                        </button>
                    );
                })}
                <hr/>
            </nav>
        </div>
    );
}

Tabs.propTypes = {
    todos: PropTypes.array.isRequired,
    selectedTab: PropTypes.string.isRequired,
    setSelectedTab: PropTypes.func.isRequired,
    selectedPriority: PropTypes.string.isRequired,
    setSelectedPriority: PropTypes.func.isRequired
};