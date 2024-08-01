import HashMap from './hashmap.js';
let test = new HashMap();

// test set
let testSet = test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black'); // missing
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
// test.set('lion', 'golden'); // missing
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
console.log(test.buckets);
