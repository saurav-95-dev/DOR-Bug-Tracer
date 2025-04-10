// LocationNavigation.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import tribunalLocationManager from './TribunalLocationManager';

export default function LocationNavigation({ 
  selectedTribunal, 
  selectedLocation, 
  onLocationChange 
}) {
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('');
  
  // Initialize locations based on selected tribunal
  useEffect(() => {
    if (selectedTribunal === 'CA') {
      // For CA tribunal, use the doubly linked list to manage locations
      const allLocations = tribunalLocationManager.getAllLocations();
      setLocations(allLocations);
      
      // Set the initial location if none is selected yet
      if (!selectedLocation && allLocations.length > 0) {
        const initialLocation = tribunalLocationManager.getCurrentLocation();
        setCurrentLocation(initialLocation);
        onLocationChange(initialLocation);
      } else if (selectedLocation) {
        // Move the linked list to the selected location
        tribunalLocationManager.moveTo(selectedLocation);
        setCurrentLocation(selectedLocation);
      }
    } else {
      // For other tribunals, we don't have multiple locations yet
      setLocations([]);
      setCurrentLocation('');
    }
  }, [selectedTribunal, selectedLocation, onLocationChange]);
  
  // Handle navigation to the next location
  const handleNext = () => {
    if (selectedTribunal === 'CA') {
      const nextLocation = tribunalLocationManager.next();
      setCurrentLocation(nextLocation);
      onLocationChange(nextLocation);
    }
  };
  
  // Handle navigation to the previous location
  const handlePrevious = () => {
    if (selectedTribunal === 'CA') {
      const prevLocation = tribunalLocationManager.prev();
      setCurrentLocation(prevLocation);
      onLocationChange(prevLocation);
    }
  };
  
  // Handle direct selection of a location
  const handleLocationSelect = (location) => {
    tribunalLocationManager.moveTo(location);
    setCurrentLocation(location);
    onLocationChange(location);
  };
  
  // Don't show navigation if not CA tribunal or no locations
  if (selectedTribunal !== 'CA' || locations.length <= 1) {
    return null;
  }
  
  return (
    <div className="location-navigation">
      <h3>{selectedTribunal} Tribunal Locations</h3>
      
      <div className="location-navigation-container">
        <button 
          className="nav-button prev-button" 
          onClick={handlePrevious}
          aria-label="Previous location"
        >
          &lt; Previous
        </button>
        
        <div className="current-location">
          <span className="location-name">{currentLocation}</span>
          
          <div className="location-indicators">
            {locations.map((loc) => (
              <button
                key={loc}
                className={`location-indicator ${loc === currentLocation ? 'active' : ''}`}
                onClick={() => handleLocationSelect(loc)}
                aria-label={`Go to ${loc}`}
              />
            ))}
          </div>
        </div>
        
        <button 
          className="nav-button next-button" 
          onClick={handleNext}
          aria-label="Next location"
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
}

LocationNavigation.propTypes = {
  selectedTribunal: PropTypes.string.isRequired,
  selectedLocation: PropTypes.string,
  onLocationChange: PropTypes.func.isRequired
};