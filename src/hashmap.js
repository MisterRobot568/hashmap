import LinkedList from './linked-list.js';
import Node from './node.js';
class HashMap {
    constructor() {
        // this.variable = variable;
        this.numBuckets = 16;
        this.buckets = new Array(this.numBuckets).fill(null); // figure out this line
        this.loadFactor = 0.75;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            // perhaps modulo here because js can't deal with large numbers?
            hashCode = hashCode % this.numBuckets;
        }
        return hashCode;
    }

    growBuckets() {
        // what's the best way to grow buckets?
        // 1) create new array
        // 2) iterate through old buckets, hash, set

        let currentNum = this.numBuckets;
        this.numBuckets = currentNum * 2;
        let newArr = new Array(this.numBuckets).fill(null);
        this.buckets.forEach((bucket) => {
            // maybe an if statement here to check if buckets are not empty? or does loop cover that?
            if (bucket !== null) {
                while (bucket.size() > 0) {
                    let value = bucket.pop().value;
                    let key = bucket.pop().value; // may have to modify .pop() in linked-list for this to work
                    this.set(key, value, newArr); //// NEED TO FIGURE OUT HOW TO USE SET() METHOD IN GROW BUCKETS
                }
            }
        });
        this.buckets = newArr;
    }
    // set(key, value) takes two arguments.
    // 1) maybe check if we've reached the load factor first?
    //    (use methods we're going to write later to deal with increasing buckets when we reach load factor)
    // 2) add the key/value pair as arrays in each bucket?

    set(key, value, bucketArray = this.buckets) {
        // before setting a value, check to see if we need to grow
        // console.log(bucketArray.length() + 1);
        let growthFactor = (this.length() + 1) / this.numBuckets;
        // console.log(bucketArray);
        console.log(`growth factor ${growthFactor}`);
        if (
            (this.length() + 1) / this.numBuckets > 0.75 &&
            bucketArray === this.buckets
        ) {
            this.growBuckets();
            console.log('growing');
        }
        let hashVal = this.hash(key) % this.numBuckets; // Adjust for new size
        let currentBucket = bucketArray[hashVal];

        if (currentBucket === null || currentBucket === undefined) {
            // if current bucket is empty
            let linkedList = new LinkedList();
            linkedList.append(key);
            linkedList.append(value);
            bucketArray[hashVal] = linkedList;
        } else if (currentBucket.contains(key) === false) {
            // if current bucket not empty, but doesn't contain our key
            bucketArray[hashVal].append(key);
            bucketArray[hashVal].append(value);
        } else if (currentBucket.contains(key)) {
            // if current bucket does contain our key
            let keyIndex = currentBucket.find(key);
            if (keyIndex % 2 === 0) {
                // overwrite the value for the key if already there
                bucketArray[hashVal].removeAt(keyIndex + 1);
                bucketArray[hashVal].insertAt(value, keyIndex + 1);
            } else {
                // add the key/value pair
                bucketArray[hashVal].append(key);
                bucketArray[hashVal].append(value);
            }
        }
    }

    get(key) {
        let hashCode = this.hash(key);
        let currentBucket = this.buckets[hashCode];
        if (currentBucket === null || currentBucket.contains(key) === false) {
            return null;
        } else {
            let valueIndex = currentBucket.find(key) + 1;
            return currentBucket.at(valueIndex);
        }
    }

    // has(key) takes the key as an argument and returns true or false based on whether it's in the hashmap
    has(key) {
        let hashCode = this.hash(key);
        let currentBucket = this.buckets[hashCode];
        if (currentBucket === null) {
            return false;
        } else if (currentBucket.contains(key)) {
            let keyIndex = currentBucket.find(key);
            if (keyIndex % 2 === 0) {
                return true;
            }
        }
        return false;
    }

    // remove(key) takes key as argument. If key is in the hash map, remove entry with that key and return true
    //             otherwise, return false
    remove(key) {
        if (this.has(key)) {
            let hashCode = this.hash(key);
            if (this.buckets[hashCode].size() <= 2) {
                this.buckets[hashCode] = null;
            } else {
                let keyIndex = this.buckets[hashCode].find(key);
                this.buckets[hashCode].removeAt(keyIndex);
                this.buckets[hashCode].removeAt(keyIndex);
            }
            return true;
        }
        return false;
    }

    // length() returns the length of store keys in the hash map
    length() {
        let length = 0;
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] != null) {
                let num_nodes = this.buckets[i].size();
                length += this.buckets[i].size() / 2;
            }
        }
        return length;
    }

    // clear() removes all entries in the hashmap
    clear() {
        this.buckets = new Array(this.numBuckets).fill(null);
    }

    // keys() returns an array containing all the keys inside the hash map
    keys() {
        let keyArr = [];
        this.buckets.forEach((bucket) => {
            if (bucket !== null) {
                // nested loop is shit coding practice!
                for (let i = 0; i < bucket.size(); i++) {
                    if (i % 2 === 0) {
                        keyArr.push(bucket.at(i));
                    }
                }
            }
        });
        return keyArr;
    }

    // values() returns an array containing all values
    values() {
        let valArr = [];
        this.buckets.forEach((bucket) => {
            // let current = bucket;
            if (bucket !== null) {
                // nested loop is shit coding practice!
                for (let i = 0; i < bucket.size(); i++) {
                    if (i % 2 === 1) {
                        valArr.push(bucket.at(i));
                    }
                }
            }
        });
        return valArr;
    }

    // entries() returns an array with each key/value pair
    entries() {
        let keys = this.keys();
        let values = this.values();
        let keyValuePairs = [];
        for (let i = 0; i < keys.length; i++) {
            let arr = [keys[i], values[i]];
            keyValuePairs.push(arr);
        }
        return keyValuePairs;
    }
}
export default HashMap;
