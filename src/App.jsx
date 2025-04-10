import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Auth from "./components/Auth";
<<<<<<< HEAD
import LocationNavigation from "./components/LocationNavigation";
import tribunalLocationManager from "./components/TribunalLocationManager";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import "./LocationNavigation.css"
=======
import LocationNavigator from "./components/LocationNavigator";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import "./LocationStyles.css";
>>>>>>> 9fe4e5c658d05ffa66f29d044b6f5d0be7e0dcc9

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

<<<<<<< HEAD
  const [tribunals] = useState(['CA', 'AT', 'AA', 'EF']);
  const [selectedTribunal, setSelectedTribunal] = useState('CA'); // Default to first tribunal
  const [selectedLocation, setSelectedLocation] = useState('New Delhi'); // Default location
  
  // Initialize todosByTribunal with locations for CA
  const [todosByTribunal, setTodosByTribunal] = useState({
    'CA': {
      'New Delhi': [{
        input: "Hello! Add your first CA New Delhi todo!",
        complete: true,
        file: null,
        priority: "Medium"
      }],
      'Kolkata': [{
        input: "Hello! Add your first CA Kolkata todo!",
        complete: true,
        file: null,
        priority: "Medium"
      }],
      'Mumbai': [{
        input: "Hello! Add your first CA Mumbai todo!",
        complete: true,
        file: null,
        priority: "Medium"
      }],
      'Chennai': [{
        input: "Hello! Add your first CA Chennai todo!",
        complete: true,
        file: null,
        priority: "Medium"
      }]
    },
    'AT': [],
    'AA': [],
    'EF': []
  });

  // Get current todos based on selected tribunal and location
  const getCurrentTodos = () => {
    if (selectedTribunal === 'CA') {
      return todosByTribunal[selectedTribunal][selectedLocation] || [];
    } else {
      return todosByTribunal[selectedTribunal] || [];
    }
  };

=======
>>>>>>> 9fe4e5c658d05ffa66f29d044b6f5d0be7e0dcc9
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

<<<<<<< HEAD
  // Fix for your handleAddTodo function
=======
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

>>>>>>> 9fe4e5c658d05ffa66f29d044b6f5d0be7e0dcc9
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
<<<<<<< HEAD
        
        // Update state based on tribunal type
        if (selectedTribunal === 'CA') {
          const newTodoList = [...(todosByTribunal[selectedTribunal][selectedLocation] || []), newTodoItem];
          
          const updatedTodosByTribunal = {
            ...todosByTribunal,
            [selectedTribunal]: {
              ...todosByTribunal[selectedTribunal],
              [selectedLocation]: newTodoList
            }
          };
          setTodosByTribunal(updatedTodosByTribunal);
          
          // Save to localStorage immediately with the updated data
          localStorage.setItem('todo-app', JSON.stringify({
            todosByTribunal: updatedTodosByTribunal,
            selectedTribunal: selectedTribunal,
            selectedLocation: selectedLocation
          }));
        } else {
          const newTodoList = [...(todosByTribunal[selectedTribunal] || []), newTodoItem];
          
          const updatedTodosByTribunal = {
            ...todosByTribunal,
            [selectedTribunal]: newTodoList
          };
          setTodosByTribunal(updatedTodosByTribunal);
          
          // Save to localStorage immediately with the updated data
          localStorage.setItem('todo-app', JSON.stringify({
            todosByTribunal: updatedTodosByTribunal,
            selectedTribunal: selectedTribunal,
            selectedLocation: selectedLocation
          }));
        }
      };
    } else {
      // Update state based on tribunal type
      if (selectedTribunal === 'CA') {
        const newTodoList = [...(todosByTribunal[selectedTribunal][selectedLocation] || []), newTodoItem];
        
        const updatedTodosByTribunal = {
          ...todosByTribunal,
          [selectedTribunal]: {
            ...todosByTribunal[selectedTribunal],
            [selectedLocation]: newTodoList
          }
        };
        setTodosByTribunal(updatedTodosByTribunal);
        
        // Save to localStorage immediately with the updated data
        localStorage.setItem('todo-app', JSON.stringify({
          todosByTribunal: updatedTodosByTribunal,
          selectedTribunal: selectedTribunal,
          selectedLocation: selectedLocation
        }));
      } else {
        const newTodoList = [...(todosByTribunal[selectedTribunal] || []), newTodoItem];
        
        const updatedTodosByTribunal = {
          ...todosByTribunal,
          [selectedTribunal]: newTodoList
        };
        setTodosByTribunal(updatedTodosByTribunal);
        
        // Save to localStorage immediately with the updated data
        localStorage.setItem('todo-app', JSON.stringify({
          todosByTribunal: updatedTodosByTribunal,
          selectedTribunal: selectedTribunal
        }));
      }
    }
  }

  // Add handleUpdateDetails function 
  function handleUpdateDetails(index, details) {
    if (selectedTribunal === 'CA') {
      const newTodoList = [...(todosByTribunal[selectedTribunal][selectedLocation] || [])];
      newTodoList[index] = {
        ...newTodoList[index],
        description: details.description,
        attachments: details.attachments
      };
      
      setTodosByTribunal({
        ...todosByTribunal,
        [selectedTribunal]: {
          ...todosByTribunal[selectedTribunal],
          [selectedLocation]: newTodoList
        }
      });
    } else {
      const newTodoList = [...(todosByTribunal[selectedTribunal] || [])];
      newTodoList[index] = {
        ...newTodoList[index],
        description: details.description,
        attachments: details.attachments
      };
      
      setTodosByTribunal({
        ...todosByTribunal,
        [selectedTribunal]: newTodoList
      });
    }
    
    handleSaveData();
  }

  // Updated handleSaveData function
  function handleSaveData() {
    localStorage.setItem('todo-app', JSON.stringify({ 
      todosByTribunal: todosByTribunal,
=======
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
>>>>>>> 9fe4e5c658d05ffa66f29d044b6f5d0be7e0dcc9
      selectedTribunal: selectedTribunal,
      selectedLocation: selectedLocation
    }));
  }
<<<<<<< HEAD
    
  // Updated handleCompleteTodo function
  function handleCompleteTodo(index) {
    if (selectedTribunal === 'CA') {
      const newTodoList = [...(todosByTribunal[selectedTribunal][selectedLocation] || [])];
      newTodoList[index].complete = true;
      
      setTodosByTribunal({
        ...todosByTribunal,
        [selectedTribunal]: {
          ...todosByTribunal[selectedTribunal],
          [selectedLocation]: newTodoList
        }
      });
    } else {
      const newTodoList = [...(todosByTribunal[selectedTribunal] || [])];
      newTodoList[index].complete = true;
      
      setTodosByTribunal({
        ...todosByTribunal,
        [selectedTribunal]: newTodoList
      });
    }
    
    handleSaveData();
  }

  // Updated handleDeleteTodo function
  function handleDeleteTodo(index) {
    if (selectedTribunal === 'CA') {
      const newTodoList = (todosByTribunal[selectedTribunal][selectedLocation] || [])
        .filter((_, valIndex) => index !== valIndex);
      
      setTodosByTribunal({
        ...todosByTribunal,
        [selectedTribunal]: {
          ...todosByTribunal[selectedTribunal],
          [selectedLocation]: newTodoList
        }
      });
    } else {
      const newTodoList = (todosByTribunal[selectedTribunal] || [])
        .filter((_, valIndex) => index !== valIndex);
      
      setTodosByTribunal({
        ...todosByTribunal,
        [selectedTribunal]: newTodoList
      });
    }
    
    handleSaveData();
  }

  // Updated handleEditTodo function
  function handleEditTodo(index, newInput, newPriority) {
    if (selectedTribunal === 'CA') {
      const newTodoList = [...(todosByTribunal[selectedTribunal][selectedLocation] || [])];
      newTodoList[index].input = newInput;
      if (newPriority) {
        newTodoList[index].priority = newPriority;
      }
      
      setTodosByTribunal({
        ...todosByTribunal,
        [selectedTribunal]: {
          ...todosByTribunal[selectedTribunal],
          [selectedLocation]: newTodoList
        }
      });
    } else {
      const newTodoList = [...(todosByTribunal[selectedTribunal] || [])];
      newTodoList[index].input = newInput;
      if (newPriority) {
        newTodoList[index].priority = newPriority;
      }
      
      setTodosByTribunal({
        ...todosByTribunal,
        [selectedTribunal]: newTodoList
      });
    }
    
    handleSaveData();
  }

  // Handle location change
  function handleLocationChange(newLocation) {
    setSelectedLocation(newLocation);
  }

  // Updated localStorage load in useEffect
=======
  
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
>>>>>>> 9fe4e5c658d05ffa66f29d044b6f5d0be7e0dcc9
  useEffect(() => {
    if (!localStorage.getItem('todo-app')) return;
    
    let db = JSON.parse(localStorage.getItem('todo-app'));
    
<<<<<<< HEAD
    // Handle different localStorage formats
    if (db.todos && !db.todosByTribunal) {
      // Convert oldest format to new format
      const initializedTodosByTribunal = {
        'CA': {
          'New Delhi': db.todos,
          'Kolkata': [],
          'Mumbai': [],
          'Chennai': []
        },
        'AT': [],
        'AA': [],
        'EF': []
      };
      
      setTodosByTribunal(initializedTodosByTribunal);
      setSelectedTribunal('CA');
      setSelectedLocation('New Delhi');
    } else if (db.todosByTribunal && !db.todosByTribunal.CA.hasOwnProperty('New Delhi')) {
      // Convert old format (without locations) to new format
      const oldCATodos = db.todosByTribunal.CA || [];
      
      const initializedTodosByTribunal = {
        'CA': {
          'New Delhi': oldCATodos,
          'Kolkata': [],
          'Mumbai': [],
          'Chennai': []
        },
        'AT': db.todosByTribunal.AT || [],
        'AA': db.todosByTribunal.AA || [],
        'EF': db.todosByTribunal.EF || []
      };
      
      setTodosByTribunal(initializedTodosByTribunal);
      setSelectedTribunal(db.selectedTribunal || 'CA');
      setSelectedLocation('New Delhi');
    } else if (db.todosByTribunal) {
      // Use new format with locations
      setTodosByTribunal(db.todosByTribunal);
      setSelectedTribunal(db.selectedTribunal || 'CA');
      setSelectedLocation(db.selectedLocation || 'New Delhi');
      
      // Initialize location in the doubly linked list
      if (db.selectedTribunal === 'CA' && db.selectedLocation) {
        tribunalLocationManager.moveTo(db.selectedLocation);
      }
=======
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
>>>>>>> 9fe4e5c658d05ffa66f29d044b6f5d0be7e0dcc9
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

<<<<<<< HEAD
  // TribunalSelector component
=======
  // Tribunal selector component
>>>>>>> 9fe4e5c658d05ffa66f29d044b6f5d0be7e0dcc9
  function TribunalSelector({ tribunals, selectedTribunal, setSelectedTribunal }) {
    return (
      <div className="tribunal-selector">
        <h3>Select Tribunal</h3>
        <div className="tribunal-buttons">
          {tribunals.map((tribunal) => (
            <button
              key={tribunal}
<<<<<<< HEAD
              onClick={() => setSelectedTribunal(tribunal)}
=======
              onClick={() => handleTribunalChange(tribunal)}
>>>>>>> 9fe4e5c658d05ffa66f29d044b6f5d0be7e0dcc9
              className={`tribunal-button ${tribunal === selectedTribunal ? 'tribunal-selected' : ''}`}
            >
              {tribunal}
            </button>
          ))}
<<<<<<< HEAD
        </div>
      </div>
    );
  }

  // Get the current todos based on tribunal and location
  const currentTodos = getCurrentTodos();
=======
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
>>>>>>> 9fe4e5c658d05ffa66f29d044b6f5d0be7e0dcc9

  return (
    <>
      {!user ? (
        <Auth setUser={setUser} />
      ) : (
        <div className="app-container">
<<<<<<< HEAD
          <Header todos={currentTodos} />
          
          {/* Add the tribunal selector component */}
=======
>>>>>>> 9fe4e5c658d05ffa66f29d044b6f5d0be7e0dcc9
          <TribunalSelector 
            tribunals={tribunals}
            selectedTribunal={selectedTribunal}
            setSelectedTribunal={setSelectedTribunal}
          />
          
<<<<<<< HEAD
          {/* Add the location navigation component */}
          <LocationNavigation
            selectedTribunal={selectedTribunal}
            selectedLocation={selectedLocation}
            onLocationChange={handleLocationChange}
          />
          
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
=======
          <LocationNavigator
            tribunalType={selectedTribunal}
            locations={tribunalLocations[selectedTribunal]}
            renderContent={renderLocationContent}
            initialLocation={selectedLocation}
            onLocationChange={handleLocationChange}
          />
          
>>>>>>> 9fe4e5c658d05ffa66f29d044b6f5d0be7e0dcc9
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