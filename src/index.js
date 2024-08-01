import HashMap from './hashmap.js';
let test = new HashMap();

// test set
let testSet = test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple'); //MISSING FROM BEGINNING
// grape should appear in bucket 11, but 11 already has hat.
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
// test.set('lion', 'golden');
console.log(test.buckets);
// test get
let getTrue = test.get('apple');
let getFalse = test.get('red');

console.log(`Apple is red: ${getTrue}`);
console.log(`get false: ${getFalse}`);

// // test has
let hasTrue = test.has('apple');
let hasFalse = test.has('parrot');
console.log(`Has apple true: ${hasTrue}`);
console.log(`Has parrot (false): ${hasFalse}`);

// test remove:
test.remove('apple');
// console.log(test.buckets);

// test length
console.log(test.buckets);
let length = test.length();
console.log(`length: ${length}`);

//test clear
// test.clear();
// console.log(test.buckets);

// test keyArr
let keyArr = test.keys();
console.log(keyArr);

// test valArr
let valArr = test.values();
console.log(valArr);

// test entries
let kvPairs = test.entries();
console.log(kvPairs);

// test grow
console.log('buckets before growth');
console.log(test.buckets);
test.set('lion', 'golden');
console.log('buckets after growth');
// after growth dog and
console.log(test.buckets);
console.log(test.entries());
console.log(test.length());

function hash(key) {
    let numBuckets = 16;
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
        // perhaps modulo here because js can't deal with large numbers?
        hashCode = hashCode % numBuckets;
    }
    return hashCode;
}
console.log(hash('grape'));
console.log(hash('hat'));

// CURRENT ISSUES:
// 1)both grape and hat hash to 11. It seems hat is overwriting grape
// fixed
// 2) remove function doesn't remove the LinkedList. It just sets the node to null
// fixed
// 3) when we use set() method within growBuckets() issues are created
// What is the issue??
// 1) growth factor keeps shrinking, but why?
//      - we're taking the length of

// test overwriting
test.set('dog', 'fluffy');
// test.set('Cameron');
console.log(test.entries());

//Test growing
test.set('camel', 'sandy');

// test.set('lemur', 'africa');
// test.growBuckets();
console.log(test.buckets);
console.log(test.length());
test.set('alligator', 'dinosaur');
console.log(test.buckets);
console.log(test.entries());

// // test has
let hasTrue2 = test.has('lion');
let hasFalse2 = test.has('parrot');
console.log(`Has lion true: ${hasTrue2}`);
console.log(`Has parrot (false): ${hasFalse2}`);
