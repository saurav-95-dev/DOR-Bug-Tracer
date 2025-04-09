// LocationNavigator.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LinkedList } from './LinkedList';
import SwipeableView from './SwipeableView';

const LocationNavigator = ({ 
  tribunalType, 
  locations, 
  renderContent, 
  initialLocation,
  onLocationChange 
}) => {
  const [locationsList] = useState(() => {
    const list = new LinkedList();
    locations.forEach(location => list.append(location));
    
    // Set initial location
    if (initialLocation) {
      list.moveTo(initialLocation);
    }
    
    return list;
  });
  
  const [currentLocation, setCurrentLocation] = useState(() => locationsList.getCurrent());
  
  const handleSwipeLeft = () => {
    if (locationsList.moveNext()) {
      const newLocation = locationsList.getCurrent();
      setCurrentLocation(newLocation);
      onLocationChange(newLocation);
    }
  };
  
  const handleSwipeRight = () => {
    if (locationsList.movePrev()) {
      const newLocation = locationsList.getCurrent();
      setCurrentLocation(newLocation);
      onLocationChange(newLocation);
    }
  };

  // Navigate to a specific location
  const navigateTo = (location) => {
    if (locationsList.moveTo(location)) {
      setCurrentLocation(location);
      onLocationChange(location);
    }
  };
  
  return (
    <div className="location-navigator">
      <div className="location-header">
        <h2>{tribunalType} - {currentLocation}</h2>
        <div className="location-selector">
          {locations.map((location) => (
            <button
              key={location}
              className={`location-button ${location === currentLocation ? 'location-selected' : ''}`}
              onClick={() => navigateTo(location)}
            >
              {location}
            </button>
          ))}
        </div>
      </div>
      
      <SwipeableView
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      >
        {renderContent(currentLocation)}
      </SwipeableView>
    </div>
  );
};

LocationNavigator.propTypes = {
  tribunalType: PropTypes.string.isRequired,
  locations: PropTypes.array.isRequired,
  renderContent: PropTypes.func.isRequired,
  initialLocation: PropTypes.string,
  onLocationChange: PropTypes.func
};

LocationNavigator.defaultProps = {
  initialLocation: null,
  onLocationChange: () => {}
};

export default LocationNavigator;