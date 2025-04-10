// TribunalLocationManager.js
// This file implements a doubly linked list to manage tribunal locations

// Node class for the doubly linked list
class LocationNode {
    constructor(location) {
      this.location = location;
      this.next = null;
      this.prev = null;
    }
  }
  
  // Doubly Linked List implementation for tribunal locations
  class TribunalLocationList {
    constructor(locations = []) {
      this.head = null;
      this.tail = null;
      this.current = null;
      this.size = 0;
      
      // Initialize with locations if provided
      if (locations.length > 0) {
        this.initializeWithLocations(locations);
      }
    }
    
    // Initialize the linked list with an array of locations
    initializeWithLocations(locations) {
      locations.forEach(location => {
        this.append(location);
      });
      
      // Set current to head by default
      this.current = this.head;
    }
    
    // Add a new location to the end of the list
    append(location) {
      const newNode = new LocationNode(location);
      
      if (!this.head) {
        // If list is empty
        this.head = newNode;
        this.tail = newNode;
      } else {
        // Add to the end and update references
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
      }
      
      // Make the list circular (optional)
      this.head.prev = this.tail;
      this.tail.next = this.head;
      
      this.size++;
      return this;
    }
    
    // Get the current location
    getCurrentLocation() {
      return this.current ? this.current.location : null;
    }
    
    // Move to the next location
    next() {
      if (!this.current) return null;
      this.current = this.current.next;
      return this.getCurrentLocation();
    }
    
    // Move to the previous location
    prev() {
      if (!this.current) return null;
      this.current = this.current.prev;
      return this.getCurrentLocation();
    }
    
    // Move to a specific location by name
    moveTo(locationName) {
      if (!this.head) return null;
      
      let current = this.head;
      do {
        if (current.location === locationName) {
          this.current = current;
          return this.getCurrentLocation();
        }
        current = current.next;
      } while (current !== this.head);
      
      return null; // Location not found
    }
    
    // Get all locations as an array
    getAllLocations() {
      if (!this.head) return [];
      
      const locations = [];
      let current = this.head;
      
      do {
        locations.push(current.location);
        current = current.next;
      } while (current !== this.head);
      
      return locations;
    }
  }
  
  // Create and export a singleton instance for the CA tribunal locations
  const caLocations = ['New Delhi', 'Kolkata', 'Mumbai', 'Chennai'];
  const tribunalLocationManager = new TribunalLocationList(caLocations);
  
  export default tribunalLocationManager;