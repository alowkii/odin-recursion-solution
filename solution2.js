// Create Linked List

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    head() {
        return this.head;
    }

    tail() {
        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }
        return current;
    }

    append(data) {
        let newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    prepend(data) {
        let newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode
    }

    size() {
        let current = this.head;
        let count = 0;
        while (current !== null) {
            count++;
            current = current.next;
        }
        return count;
    }

    at(index) {
        let current = this.head;
        let count = 0;
        while (current !== null) {
            if (count === index) {
                return current.data;
            }
            count++;
            current = current.next;
        }
        return null;
    }

    pop() {
        let current = this.head;
        let previous = null;
        while (current.next !== null) {
            previous = current;
            current = current.next;
        }
        previous.next = null;
    }

    contains(data) {
        let current = this.head;
        while (current !== null) {
            if (current.data === data) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    find(data) {
        let current = this.head;
        let count = 0;
        while (current !== null) {
            if (current.data === data) {
                return count;
            }
            count++;
            current = current.next;
        }
        return
    }

    toString() {
        let current = this.head;
        let str = '';
        while (current !== null) {
            str += `(${current.data}) -> `;
            current = current.next;
        }
        str += 'null';
        return str;
    }

    insertAt(index, data) {
        let newNode = new Node(data);
        let current = this.head;
        let previous = null;
        let count = 0;
        while (current !== null) {
            if (count === index) {
                if (previous === null) {
                    newNode.next = this.head;
                    this.head = newNode;
                } else {
                    previous.next = newNode;
                    newNode.next = current;
                }
                return;
            }
            count++;
            previous = current;
            current = current.next;
        }
    }

    removeAt(index) {
        let current = this.head;
        let previous = null;
        let count = 0;
        while (current !== null) {
            if (count === index) {
                if (previous === null) {
                    this.head = current.next;
                } else {
                    previous.next = current.next;
                }
                return;
            }
            count++;
            previous = current;
            current = current.next;
        }
    }

    print() {
        let current = this.head;
        while (current !== null) {
            console.log(current.data);
            current = current.next;
        }
    }
}

let list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.prepend(0);

let size = list.size();
console.log('Size: '+size);

let str = list.toString();
console.log('String: '+str);

list.insertAt(2, 5);
list.removeAt(3);

size = list.size();
console.log('Size: '+size);

str = list.toString();
console.log('String: '+str);

list.print();
