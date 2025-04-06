import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Auth from "./components/Auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

export default function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([{ 
    input: "Hello! Add your first todo!", 
    complete: true, 
    file: null, 
    priority: "Medium" 
  }]);
  const [selectedTab, setSelectedTab] = useState("Open");
  const [selectedPriority, setSelectedPriority] = useState("All");

  const [tribunals] = useState(['CA', 'AT', 'AA', 'EF']);
const [selectedTribunal, setSelectedTribunal] = useState('CA'); // Default to first tribunal
const [todosByTribunal, setTodosByTribunal] = useState({
  'CA': [{
    input: "Hello! Add your first CA todo!",
    complete: true,
    file: null,
    priority: "Medium"
  }],
  'AT': [],
  'AA': [],
  'EF': []
});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 3. Updated handleAddTodo function
function handleAddTodo(newTodo, file, priority) {
  const newTodoItem = {
    input: newTodo,
    complete: false,
    file: file
      ? {
          name: file.name,
          type: file.type,
          url: null,
        }
      : null,
    priority: priority || "Medium",
  };
  
  // Convert File to Base64 if file exists
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      newTodoItem.file.url = reader.result;
      const newTodoList = [...todosByTribunal[selectedTribunal], newTodoItem];
      
      // Update state for the selected tribunal only
      setTodosByTribunal({
        ...todosByTribunal,
        [selectedTribunal]: newTodoList
      });
      
      handleSaveData();
    };
  } else {
    const newTodoList = [...todosByTribunal[selectedTribunal], newTodoItem];
    
    // Update state for the selected tribunal only
    setTodosByTribunal({
      ...todosByTribunal,
      [selectedTribunal]: newTodoList
    });
    
    handleSaveData();
  }
}

// 7. Add handleUpdateDetails function 
function handleUpdateDetails(index, details) {
  const newTodoList = [...todosByTribunal[selectedTribunal]];
  newTodoList[index] = {
    ...newTodoList[index],
    description: details.description,
    attachments: details.attachments
  };
  
  setTodosByTribunal({
    ...todosByTribunal,
    [selectedTribunal]: newTodoList
  });
  
  handleSaveData();
}

// 8. Updated handleSaveData function
function handleSaveData() {
  localStorage.setItem('todo-app', JSON.stringify({ 
    todosByTribunal: todosByTribunal,
    selectedTribunal: selectedTribunal
  }));
}
  
 // 4. Updated handleCompleteTodo function
function handleCompleteTodo(index) {
  const newTodoList = [...todosByTribunal[selectedTribunal]];
  newTodoList[index].complete = true;
  
  setTodosByTribunal({
    ...todosByTribunal,
    [selectedTribunal]: newTodoList
  });
  
  handleSaveData();
}

// 5. Updated handleDeleteTodo function
function handleDeleteTodo(index) {
  const newTodoList = todosByTribunal[selectedTribunal].filter((_, valIndex) => index !== valIndex);
  
  setTodosByTribunal({
    ...todosByTribunal,
    [selectedTribunal]: newTodoList
  });
  
  handleSaveData();
}
// 6. Updated handleEditTodo function
function handleEditTodo(index, newInput, newPriority) {
  const newTodoList = [...todosByTribunal[selectedTribunal]];
  newTodoList[index].input = newInput;
  if (newPriority) {
    newTodoList[index].priority = newPriority;
  }
  
  setTodosByTribunal({
    ...todosByTribunal,
    [selectedTribunal]: newTodoList
  });
  
  handleSaveData();
}


// 9. Updated localStorage load in useEffect
useEffect(() => {
  if (!localStorage.getItem('todo-app')) return;
  
  let db = JSON.parse(localStorage.getItem('todo-app'));
  
  // Handle old localStorage format (for backward compatibility)
  if (db.todos && !db.todosByTribunal) {
    // Convert old format to new format
    setTodosByTribunal({
      'CA': db.todos,
      'AT': [],
      'AA': [],
      'EF': []
    });
    setSelectedTribunal('CA');
  } else if (db.todosByTribunal) {
    // Use new format
    setTodosByTribunal(db.todosByTribunal);
    setSelectedTribunal(db.selectedTribunal || 'CA');
  }
}, []);

  async function handleLogout() {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  }

  // 10. Create the TribunalSelector component
function TribunalSelector({ tribunals, selectedTribunal, setSelectedTribunal }) {
  return (
    <div className="tribunal-selector">
      <h3>Select Tribunal</h3>
      <div className="tribunal-buttons">
        {tribunals.map((tribunal) => (
          <button
            key={tribunal}
            onClick={() => setSelectedTribunal(tribunal)}
            className={`tribunal-button ${tribunal === selectedTribunal ? 'tribunal-selected' : ''}`}
          >
            {tribunal}
          </button>
        ))}
      </div>
    </div>
  );
}

return (
  <>
    {!user ? (
      <Auth setUser={setUser} />
    ) : (
      <div className="app-container">
        <Header todos={todosByTribunal[selectedTribunal]} />
        
        {/* Add the tribunal selector component */}
        <TribunalSelector 
          tribunals={tribunals}
          selectedTribunal={selectedTribunal}
          setSelectedTribunal={setSelectedTribunal}
        />
        
        <Tabs
          todos={todosByTribunal[selectedTribunal]}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
        />
        <div className="todo-list-container">
          <TodoList
            handleEditTodo={handleEditTodo}
            handleCompleteTodo={handleCompleteTodo}
            handleDeleteTodo={handleDeleteTodo}
            handleUpdateDetails={handleUpdateDetails}
            todos={todosByTribunal[selectedTribunal]}
            selectedTab={selectedTab}
            selectedPriority={selectedPriority}
          />
        </div>
        <TodoInput handleAddTodo={handleAddTodo} />
        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    )}
  </>
);
}