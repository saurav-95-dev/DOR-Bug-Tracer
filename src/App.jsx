// App.jsx
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Auth from "./components/Auth";
import LocationNavigation from "./components/LocationNavigation";
import tribunalLocationManager from "./components/TribunalLocationManager";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import "./LocationNavigation.css"

export default function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([{
    input: "Hello! Add your first todo!",
    complete: true,
    file: null,
    priority: "Medium",
    votes: 0 // Added votes field
  }]);
  const [selectedTab, setSelectedTab] = useState("Open");
  const [selectedPriority, setSelectedPriority] = useState("All");

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
        priority: "Medium",
        votes: 0 // Added votes field
      }],
      'Kolkata': [{
        input: "Hello! Add your first CA Kolkata todo!",
        complete: true,
        file: null,
        priority: "Medium",
        votes: 0 // Added votes field
      }],
      'Mumbai': [{
        input: "Hello! Add your first CA Mumbai todo!",
        complete: true,
        file: null,
        priority: "Medium",
        votes: 0 // Added votes field
      }],
      'Chennai': [{
        input: "Hello! Add your first CA Chennai todo!",
        complete: true,
        file: null,
        priority: "Medium",
        votes: 0 // Added votes field
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fix for your handleAddTodo function
  function handleAddTodo(newTodo, file, priority) {
    const newTodoItem = {
      input: newTodo,
      complete: false,
      file: file ? { name: file.name, type: file.type, url: null } : null,
      priority: priority || "Medium",
      votes: 0 // Initialize votes to 0
    };
    
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        newTodoItem.file.url = reader.result;
        
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

  // Add handleVote function
  function handleVote(index, voteType) {
    if (selectedTribunal === 'CA') {
      const newTodoList = [...(todosByTribunal[selectedTribunal][selectedLocation] || [])];
      if (voteType === 'upvote') {
        newTodoList[index].votes = (newTodoList[index].votes || 0) + 1;
      } else if (voteType === 'downvote') {
        newTodoList[index].votes = (newTodoList[index].votes || 0) - 1;
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
      if (voteType === 'upvote') {
        newTodoList[index].votes = (newTodoList[index].votes || 0) + 1;
      } else if (voteType === 'downvote') {
        newTodoList[index].votes = (newTodoList[index].votes || 0) - 1;
      }
      
      setTodosByTribunal({
        ...todosByTribunal,
        [selectedTribunal]: newTodoList
      });
    }
    
    handleSaveData();
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
      selectedTribunal: selectedTribunal,
      selectedLocation: selectedLocation
    }));
  }
    
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
  useEffect(() => {
    if (!localStorage.getItem('todo-app')) return;
    
    let db = JSON.parse(localStorage.getItem('todo-app'));
    
    // Handle different localStorage formats
    if (db.todos && !db.todosByTribunal) {
      // Convert oldest format to new format
      const initializedTodosByTribunal = {
        'CA': {
          'New Delhi': db.todos.map(todo => ({ ...todo, votes: 0 })), // Add votes field
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
          'New Delhi': oldCATodos.map(todo => ({ ...todo, votes: 0 })), // Add votes field
          'Kolkata': [],
          'Mumbai': [],
          'Chennai': []
        },
        'AT': (db.todosByTribunal.AT || []).map(todo => ({ ...todo, votes: 0 })), // Add votes field
        'AA': (db.todosByTribunal.AA || []).map(todo => ({ ...todo, votes: 0 })), // Add votes field
        'EF': (db.todosByTribunal.EF || []).map(todo => ({ ...todo, votes: 0 })) // Add votes field
      };
      
      setTodosByTribunal(initializedTodosByTribunal);
      setSelectedTribunal(db.selectedTribunal || 'CA');
      setSelectedLocation('New Delhi');
    } else if (db.todosByTribunal) {
      // Add votes field to existing todos if not present
      const updatedTodosByTribunal = { ...db.todosByTribunal };
      
      // Process CA tribunal with locations
      if (updatedTodosByTribunal.CA) {
        Object.keys(updatedTodosByTribunal.CA).forEach(location => {
          updatedTodosByTribunal.CA[location] = updatedTodosByTribunal.CA[location].map(todo =>
            todo.votes !== undefined ? todo : { ...todo, votes: 0 }
          );
        });
      }
      
      // Process other tribunals
      ['AT', 'AA', 'EF'].forEach(tribunal => {
        if (Array.isArray(updatedTodosByTribunal[tribunal])) {
          updatedTodosByTribunal[tribunal] = updatedTodosByTribunal[tribunal].map(todo =>
            todo.votes !== undefined ? todo : { ...todo, votes: 0 }
          );
        }
      });
      
      setTodosByTribunal(updatedTodosByTribunal);
      setSelectedTribunal(db.selectedTribunal || 'CA');
      setSelectedLocation(db.selectedLocation || 'New Delhi');
      
      // Initialize location in the doubly linked list
      if (db.selectedTribunal === 'CA' && db.selectedLocation) {
        tribunalLocationManager.moveTo(db.selectedLocation);
      }
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

  // TribunalSelector component
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

  // Get the current todos based on tribunal and location
  const currentTodos = getCurrentTodos();

  return (
    <>
      {!user ? (
        <Auth setUser={setUser} />
      ) : (
        <div className="app-container">
          <Header todos={currentTodos} />
          
          {/* Tribunal selector */}
          <TribunalSelector
            tribunals={tribunals}
            selectedTribunal={selectedTribunal}
            setSelectedTribunal={setSelectedTribunal}
          />
          
          {/* Location navigation */}
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
          
          {/* Add a specific height class to ensure proper space */}
          <div className="todo-list-container">
            <TodoList
              handleEditTodo={handleEditTodo}
              handleCompleteTodo={handleCompleteTodo}
              handleDeleteTodo={handleDeleteTodo}
              handleUpdateDetails={handleUpdateDetails}
              handleVote={handleVote}
              todos={currentTodos}
              selectedTab={selectedTab}
              selectedPriority={selectedPriority}
            />
          </div>
          
          {/* Fixed positioning for input */}
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