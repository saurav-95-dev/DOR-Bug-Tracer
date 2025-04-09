// LinkedList.js
export class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
      this.prev = null;
    }
  }
  
  export class LinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.current = null;
      this.size = 0;
    }
  
    append(data) {
      const newNode = new Node(data);
      
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
        this.current = newNode;
      } else {
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
      }
      
      this.size++;
      return this;
    }
  
    getCurrent() {
      return this.current ? this.current.data : null;
    }
  
    moveNext() {
      if (this.current && this.current.next) {
        this.current = this.current.next;
        return true;
      }
      return false;
    }
  
    movePrev() {
      if (this.current && this.current.prev) {
        this.current = this.current.prev;
        return true;
      }
      return false;
    }
  
    moveTo(data) {
      let current = this.head;
      while (current) {
        if (current.data === data) {
          this.current = current;
          return true;
        }
        current = current.next;
      }
      return false;
    }
  }