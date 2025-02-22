import PropTypes from "prop-types";

export default function Tabs(props) {

    //The TodoInput will be dependent on this Tab functional component :
    const { todos = [] } = props;
    //We have three tabs in total i.e tabs length is 3!
    const tabs = ["All", "Open", "Completed"];

    return (
        <nav className="tab-container">
            {
                //Logic to show the number of tasks beside the respective tabs:
                //First map over the tabs array:
                tabs.map((tab, tabIndex) => {
                    let numOfTask = 0;
                    if (tab == "All") {
                        numOfTask = todos.length;
                    }
                    else if (tab == "Open") {
                        //Rendering incomplete todos:
                        numOfTask = todos.filter(val => !val.complete).length;
                    }
                    else {
                        //Rendering complete todos:
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

Tabs.propTypes = {
    todos : PropTypes.array.isRequired,
}

