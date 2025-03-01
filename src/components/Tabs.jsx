

export default function Tabs(props) {

    const { todos , selectedTab , setSelectedTab } = props;

    const tabs = ["All", "Open", "Completed"];

    return (
        <nav className="tab-container">
            {
        
                //Defined tabIndex to identify each button uniquely.
                tabs.map((tab, tabIndex) => {
                    let numOfTask = 0;
                if(tab == "All"){
                    numOfTask = todos.length;
                }
                else if(tab == "Completed"){
                    numOfTask = todos.filter(val => val.complete).length;
                }
                else{
                   numOfTask = todos.filter(val => !val.complete).length;
                
                }
                    return (
                        <button onClick={()=>{setSelectedTab(tab)}} key={tabIndex} className={"tab-button " + (tab==selectedTab ? " tab-selected" : "")}>
                            <h4>{ tab } <span>({numOfTask})</span></h4>
                        </button>
                    )
                })
            }
            <hr/>
       </nav>

        
    )
}
