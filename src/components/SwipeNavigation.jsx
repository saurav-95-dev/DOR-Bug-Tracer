// LinkedList implementation for locations
class LocationNode {
    constructor(location) {
      this.location = location;
      this.next = null;
      this.prev = null;
    }
  }
  
  class LocationLinkedList {
    constructor(locations) {
      this.head = null;
      this.tail = null;
      this.current = null;
      
      // Initialize with locations
      if (locations && locations.length) {
        this.initialize(locations);
      }
    }
    
    initialize(locations) {
      locations.forEach(location => {
        this.add(location);
      });
      
      // Set current to head initially
      this.current = this.head;
    }
    
    add(location) {
      const newNode = new LocationNode(location);
      
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
      
      // Make it circular
      this.head.prev = this.tail;
      this.tail.next = this.head;
    }
    
    next() {
      if (this.current && this.current.next) {
        this.current = this.current.next;
      }
      return this.current.location;
    }
    
    prev() {
      if (this.current && this.current.prev) {
        this.current = this.current.prev;
      }
      return this.current.location;
    }
    
    getCurrent() {
      return this.current ? this.current.location : null;
    }
    
    setCurrentByLocation(location) {
      let temp = this.head;
      while (temp) {
        if (temp.location === location) {
          this.current = temp;
          return true;
        }
        temp = temp.next;
        if (temp === this.head) break; // Avoid infinite loop
      }
      return false;
    }
  }
  
  // React hook to manage swipe
  import { useState, useEffect, useRef } from 'react';
  
  export function useSwipeNavigation(tribunalLocations) {
    // Initialize linked lists for each tribunal
    const linkedListsRef = useRef({});
    const [currentTribunal, setCurrentTribunal] = useState('CA');
    const [currentLocation, setCurrentLocation] = useState('New Delhi');
    
    // Initialize the linked lists for all tribunals
    useEffect(() => {
      const lists = {};
      Object.keys(tribunalLocations).forEach(tribunal => {
        lists[tribunal] = new LocationLinkedList(tribunalLocations[tribunal]);
      });
      linkedListsRef.current = lists;
    }, []);
    
    // Handle swipe navigation
    const handleSwipeLeft = () => {
      const currentList = linkedListsRef.current[currentTribunal];
      if (currentList) {
        const nextLocation = currentList.next();
        setCurrentLocation(nextLocation);
      }
    };
    
    const handleSwipeRight = () => {
      const currentList = linkedListsRef.current[currentTribunal];
      if (currentList) {
        const prevLocation = currentList.prev();
        setCurrentLocation(prevLocation);
      }
    };
    
    // Handle tribunal change
    const changeTribunal = (tribunal) => {
      setCurrentTribunal(tribunal);
      const list = linkedListsRef.current[tribunal];
      if (list) {
        setCurrentLocation(list.getCurrent());
      }
    };
    
    return {
      currentTribunal,
      currentLocation,
      handleSwipeLeft,
      handleSwipeRight,
      changeTribunal
    };
  }
  
 