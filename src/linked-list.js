import Node from './node.js';
class LinkedList {
    constructor() {
        this.listHead = null;
    }
    // this only works if there is no element in the linked-list yet
    prepend(value) {
        // 1) if there is already a first node, store in tmp variable
        // 2) Make first Node the new value
        // 3) make second node the old value (tmp variable)
        let tmp = null;
        if (this.listHead != null) {
            tmp = this.listHead;
        }
        this.listHead = new Node(value);
        this.listHead.nextNode = tmp;
    }
    //works to append values
    append(item) {
        // 1) if there is no first node already, just make it with prepend
        // 2) otherwise traverse the list until we reach the end and add the new item as a node
        if (this.listHead === null) {
            this.prepend(item);
        } else {
            let tmp = this.listHead;
            while (tmp.nextNode != null) {
                tmp = tmp.nextNode;
            }
            tmp.nextNode = new Node(item);
        }
    }
    // returns total number of nodes in the list
    size() {
        let count = 0;
        if (this.listHead === null) {
            return count;
        } else {
            let tmp = this.listHead;
            while (tmp != null) {
                count += 1;
                tmp = tmp.nextNode;
            }
            return count;
        }
    }

    // returns the first node in the list
    head() {
        if (this.listHead != null) {
            return this.listHead.value;
        } else {
            return 'Head does not exist';
        }
    }
    //return the value of the tail node of the list
    tail() {
        if (this.listHead != null) {
            let tmp = this.listHead;
            while (tmp.nextNode != null) {
                tmp = tmp.nextNode;
            }
            return tmp.value;
        }
    }

    // at(index) returns the node at a given index
    at(index) {
        let tmp = this.listHead;
        for (let counter = 0; counter < index; counter++) {
            tmp = tmp.nextNode;
        }
        return tmp.value;
    }

    // pop() removes the last element from the list
    pop() {
        // issue with pop adding null as another
        if (this.listHead === null) {
            return 'No last elements in list';
        } else if (this.listHead.nextNode === null) {
            // case for only a single node in the list
            let lastElement = this.listHead;
            this.listHead = null;
            return lastElement;
        } else {
            let cur = this.listHead;
            let prev = null;
            while (cur.nextNode !== null) {
                prev = cur;
                cur = cur.nextNode;
            }
            let lastElement = cur; //prev.nextNode;
            prev.nextNode = null;
            return lastElement;
        }
    }
    // contains() returns true if the passed in value is contained in the list
    contains(value) {
        let tmp = this.listHead;
        while (tmp.nextNode != null) {
            if (tmp.value === value) return true;
            tmp = tmp.nextNode;
        }
        return false;
    }

    // returns the index of a node containing a value or null if not found
    find(value) {
        let tmp = this.listHead;
        let counter = 0;
        while (tmp.value != null) {
            if (tmp.value === value) {
                return counter;
            }
            tmp = tmp.nextNode;
            counter += 1;
        }
        return null;
    }
    // last method toString
    toString() {
        let tmp = this.listHead;
        let string = '';
        while (tmp != null) {
            string += `(${tmp.value}) -> `;
            // console.log(tmp.value);

            if (tmp.nextNode === null) {
                string += 'null';
            }
            tmp = tmp.nextNode;
        }
        console.log(string);
    }

    //challenge problems
    // insertAt(value, index) inserts value at specified index
    // insertAt(value, index) {
    //     let tmp = this.listHead;
    //     let prev = null;
    //     for (let i = 0; i <= index; i++) {
    //         if (i === index - 1) {
    //             prev = tmp;
    //         }
    //         if (i === index) {
    //             let next = tmp.nextNode;
    //             let current = new Node(value);

    //             prev.nextNode = current;
    //             current.nextNode = next;
    //         }
    //         tmp = tmp.nextNode;
    //     }
    // }
    insertAt(value, index) {
        if (this.listHead === null)
            this.prepend(value); // if linked list is empty, prepend
        else {
            let cur = this.listHead;
            let prev = null;
            for (let i = 0; i < index; i++) {
                prev = cur;
                cur = cur.nextNode;
                if (cur === null) break; // if index is bigger than end of list, add node to end of list
            }
            const tmp = new Node(value);
            prev.nextNode = tmp;
            tmp.nextNode = cur;
        }
    }

    // removeAt(index) removes a node at a given index
    removeAt(index) {
        // 1)traverses nodes until we reach index of node we want removed
        // 2) goes to previous node, and assigns it's nextNode to node after the current node
        if (this.listHead === null) return 'List is already empty';
        // special case: removing the head
        if (index === 0) {
            this.listHead = this.listHead.nextNode;
            return;
        }
        let cur = this.listHead;
        let prev = null;
        // let next = cur.nextNode;
        for (let i = 0; i < index; i++) {
            prev = cur;
            cur = cur.nextNode;
            if (cur === null) return 'There is no item for this index';
        }

        prev.nextNode = cur.nextNode;
    }
}

export default LinkedList;
