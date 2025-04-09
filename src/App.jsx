import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Auth from "./components/Auth";
import LocationNavigator from "./components/LocationNavigator";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import "./LocationStyles.css";

export default function App() {
  const [user, setUser] = useState(null);
  
  // Define tribunal types and their locations
  const tribunalLocations = {
    'CA': ['New Delhi', 'Mumbai', 'Kolkata'],
    'AT': ['New Delhi', 'Chennai', 'Ahmedabad'],
    'AA': ['New Delhi', 'Bangalore'],
    'EF': ['Mumbai', 'Kolkata' , 'New Delhi'],
  };
  
  const [tribunals] = useState(['CA', 'AT', 'AA', 'EF']);
  const [selectedTribunal, setSelectedTribunal] = useState('CA');
  const [selectedLocation, setSelectedLocation] = useState('New Delhi');
  
  // Initialize todos by tribunal and location
  const [todosByTribunalLocation, setTodosByTribunalLocation] = useState({
    'CA': {
      'New Delhi': [{
        input: "Hello! Add your first New Delhi CA todo!",
        complete: true,
        file: null,
        priority: "Medium"
      }],
      'Mumbai': [{
        input: "Hello! Add your first Mumbai CA todo!",
        complete: true,
        file: null,
        priority: "Medium"
      }],
      'Kolkata': [{
        input: "Hello! Add your first Kolkata CA todo!",
        complete: true,
        file: null,
        priority: "Medium"
      }]
    },
    'AT': {
      'New Delhi': [],
      'Chennai': [],
      'Ahmedabad': []
    },
    'AA': {
      'New Delhi': [],
      'Bangalore': []
    },
    'EF': {
      'Mumbai': [],
      'Kolkata': []
    }
  });
  
  const [selectedTab, setSelectedTab] = useState("Open");
  const [selectedPriority, setSelectedPriority] = useState("All");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle changing tribunal
  const handleTribunalChange = (tribunal) => {
    setSelectedTribunal(tribunal);
    // Set default location for the tribunal
    setSelectedLocation(tribunalLocations[tribunal][0]);
  };
  
  // Handle changing location
  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  // Get current todos based on tribunal and location
  const getCurrentTodos = () => {
    return todosByTribunalLocation[selectedTribunal]?.[selectedLocation] || [];
  };

  function handleAddTodo(newTodo, file, priority) {
    const newTodoItem = {
      input: newTodo,
      complete: false,
      file: file ? { name: file.name, type: file.type, url: null } : null,
      priority: priority || "Medium",
    };
    
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        newTodoItem.file.url = reader.result;
        const newTodoList = [...getCurrentTodos(), newTodoItem];
        
        // Update state AND localStorage immediately in the same function
        const updatedTodos = {
          ...todosByTribunalLocation,
          [selectedTribunal]: {
            ...todosByTribunalLocation[selectedTribunal],
            [selectedLocation]: newTodoList
          }
        };
        setTodosByTribunalLocation(updatedTodos);
        
        // Save to localStorage immediately with the updated data
        localStorage.setItem('todo-app', JSON.stringify({
          todosByTribunalLocation: updatedTodos,
          selectedTribunal: selectedTribunal,
          selectedLocation: selectedLocation
        }));
      };
    } else {
      const newTodoList = [...getCurrentTodos(), newTodoItem];
      const updatedTodos = {
        ...todosByTribunalLocation,
        [selectedTribunal]: {
          ...todosByTribunalLocation[selectedTribunal],
          [selectedLocation]: newTodoList
        }
      };
      setTodosByTribunalLocation(updatedTodos);
      
      // Save to localStorage immediately with the updated data
      localStorage.setItem('todo-app', JSON.stringify({
        todosByTribunalLocation: updatedTodos,
        selectedTribunal: selectedTribunal,
        selectedLocation: selectedLocation
      }));
    }
  }

  function handleUpdateDetails(index, details) {
    const currentTodos = getCurrentTodos();
    const newTodoList = [...currentTodos];
    newTodoList[index] = {
      ...newTodoList[index],
      description: details.description,
      attachments: details.attachments
    };
    
    updateTodosList(newTodoList);
  }

  function handleSaveData() {
    localStorage.setItem('todo-app', JSON.stringify({ 
      todosByTribunalLocation: todosByTribunalLocation,
      selectedTribunal: selectedTribunal,
      selectedLocation: selectedLocation
    }));
  }
  
  function handleCompleteTodo(index) {
    const currentTodos = getCurrentTodos();
    const newTodoList = [...currentTodos];
    newTodoList[index].complete = true;
    
    updateTodosList(newTodoList);
  }

  function handleDeleteTodo(index) {
    const currentTodos = getCurrentTodos();
    const newTodoList = currentTodos.filter((_, valIndex) => index !== valIndex);
    
    updateTodosList(newTodoList);
  }

  function handleEditTodo(index, newInput, newPriority) {
    const currentTodos = getCurrentTodos();
    const newTodoList = [...currentTodos];
    newTodoList[index].input = newInput;
    if (newPriority) {
      newTodoList[index].priority = newPriority;
    }
    
    updateTodosList(newTodoList);
  }
  
  // Helper function to update todos list
  function updateTodosList(newTodoList) {
    const updatedTodos = {
      ...todosByTribunalLocation,
      [selectedTribunal]: {
        ...todosByTribunalLocation[selectedTribunal],
        [selectedLocation]: newTodoList
      }
    };
    
    setTodosByTribunalLocation(updatedTodos);
    
    // Save to localStorage
    localStorage.setItem('todo-app', JSON.stringify({
      todosByTribunalLocation: updatedTodos,
      selectedTribunal: selectedTribunal,
      selectedLocation: selectedLocation
    }));
  }

  // Load data from localStorage
  useEffect(() => {
    if (!localStorage.getItem('todo-app')) return;
    
    let db = JSON.parse(localStorage.getItem('todo-app'));
    
    // Handle old localStorage format (for backward compatibility)
    if (db.todos && !db.todosByTribunalLocation) {
      // If we have old format with todosByTribunal
      if (db.todosByTribunal) {
        // Convert old format to new format with locations
        const newFormat = {};
        Object.keys(db.todosByTribunal).forEach(tribunal => {
          if (tribunalLocations[tribunal]) {
            newFormat[tribunal] = {};
            tribunalLocations[tribunal].forEach(location => {
              // For the first location, use existing todos, others start empty
              if (location === tribunalLocations[tribunal][0]) {
                newFormat[tribunal][location] = db.todosByTribunal[tribunal];
              } else {
                newFormat[tribunal][location] = [];
              }
            });
          }
        });
        
        setTodosByTribunalLocation(newFormat);
        setSelectedTribunal(db.selectedTribunal || 'CA');
        setSelectedLocation(tribunalLocations[db.selectedTribunal || 'CA'][0]);
      } else {
        // Convert very old format (just todos array) to new format
        const newFormat = {
          'CA': {
            'New Delhi': db.todos,
            'Mumbai': [],
            'Kolkata': []
          },
          'AT': {
            'New Delhi': [],
            'Chennai': [],
            'Ahmedabad': []
          },
          'AA': {
            'New Delhi': [],
            'Bangalore': []
          },
          'EF': {
            'Mumbai': [],
            'Kolkata': []
          }
        };
        
        setTodosByTribunalLocation(newFormat);
        setSelectedTribunal('CA');
        setSelectedLocation('New Delhi');
      }
    } else if (db.todosByTribunalLocation) {
      // Use new format
      setTodosByTribunalLocation(db.todosByTribunalLocation);
      setSelectedTribunal(db.selectedTribunal || 'CA');
      setSelectedLocation(db.selectedLocation || 'New Delhi');
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

  // Tribunal selector component
  function TribunalSelector({ tribunals, selectedTribunal, setSelectedTribunal }) {
    return (
      <div className="tribunal-selector">
        <h3>Select Tribunal</h3>
        <div className="tribunal-buttons">
          {tribunals.map((tribunal) => (
            <button
              key={tribunal}
              onClick={() => handleTribunalChange(tribunal)}
              className={`tribunal-button ${tribunal === selectedTribunal ? 'tribunal-selected' : ''}`}
            >
              {tribunal}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Function to render the content for a specific location
  const renderLocationContent = (location) => {
    const currentTodos = todosByTribunalLocation[selectedTribunal]?.[location] || [];
    
    return (
      <div className="location-content">
        <Header todos={currentTodos} />
        
        <Tabs
          todos={currentTodos}
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
            todos={currentTodos}
            selectedTab={selectedTab}
            selectedPriority={selectedPriority}
          />
        </div>
        
        <TodoInput handleAddTodo={handleAddTodo} />
      </div>
    );
  };

  return (
    <>
      {!user ? (
        <Auth setUser={setUser} />
      ) : (
        <div className="app-container">
          <TribunalSelector 
            tribunals={tribunals}
            selectedTribunal={selectedTribunal}
            setSelectedTribunal={setSelectedTribunal}
          />
          
          <LocationNavigator
            tribunalType={selectedTribunal}
            locations={tribunalLocations[selectedTribunal]}
            renderContent={renderLocationContent}
            initialLocation={selectedLocation}
            onLocationChange={handleLocationChange}
          />
          
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