'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE METHOD --------------

//make new array starting from C, which is [2]
console.log(arr.slice(2));
//make new array starting from C and end before E, which is [4]
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
//always the last element
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
//just make a new copy
console.log(arr.slice());
//same thing as copy
console.log([...arr]);

//SPLICE METHOD -------------
//changes the original array. Shows it without the first two elements, and then the extracted elements
//console.log(arr.splice(2));
//this just deletes the last element
arr.splice(-1);
console.log(arr);
//went to position 1(b) and deleted 2 elements(b and c)
arr.splice(1, 2);
console.log(arr);

//REVERSE METHOD ---------------
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
//mutates the array, keep that in mind
console.log(arr2.reverse());
console.log(arr2);

//CONCAT METHOD ------------------
//joins two arrays. Doesn't mutate
const letters = arr.concat(arr2);
console.log(letters);
//same thing
console.log([...arr, ...arr2]);

//JOIN METHOD --------------------
//puts characters between the elements in a array
console.log(letters.join(' - '));

*/

//AT METHOD
const arr = [23, 11, 64, 55];
console.log(arr[0]);
console.log(arr.at(0));

//there doesn't seem to be much usefulness to this, but take a look

//both these logs "get the last element"
console.log(arr[arr.length - 1]);
//makes the last element a new array and takes it off from the array
console.log(arr.slice(-1)[0]);

//but, using "at"... You get the same result, much simpler. The most common case to use "at"
console.log(arr.at(-1));

//works on strings, takes the first and last letter
console.log('jonas'.at(0));
console.log('jonas'.at(-1));
