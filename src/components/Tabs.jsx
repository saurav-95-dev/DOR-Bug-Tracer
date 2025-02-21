export default function Tabs(props) {
    
    const { todos } = props;
    const tabs = ["All", "Open", "Completed"];

    return (
        <nav className="tab-container">
            {
                tabs.map((tab, tabIndex) => {
                    let numOfTask = 0;
                    if (tab == "All") {
                        numOfTask = todos.length;
                    }
                    else if (tab =="Open") {
                        numOfTask = todos.filter(val => !val.complete).length;
                    }
                    else {
                        numOfTask = todos.filter(val => val.complete).length;
                    }
                    return (
                        <button key={tabIndex} className="tab-button">
                            <h4>{tab} <span>({numOfTask})</span> </h4>
                        </button>
                    )
                })
          }

        </nav>
    )
}