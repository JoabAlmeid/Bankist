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

//creates a new element on the index, inside the 'movements' container div. Takes the movements, runs through each and display each
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

//pegar siglas do nome. Deixa tudo em minúsculo, divide em strings tudo entre os espaços, retorna a primeira letra, e depois junta tudo na mesma string. Feito um "side effect"(fazer algo e não retornar valor): todas as atuais accounts terão uma nova propriedade que são as siglas
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
};

createUsernames(accounts);
console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

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
/*
//AT METHOD
const arr = [23, 11, 64, 55];
console.log(arr[0]);
console.log(arr.at(0));

//there doesn't seem to be much usefulness to this, but take a look

//both these logs "get the last element in the array"
console.log(arr[arr.length - 1]);
//makes the last element a new array and takes it off from the array
console.log(arr.slice(-1)[0]);

//but, using "at" You get the same result, much simpler. The most common case to use "at":
console.log(arr.at(-1));

//works on strings, takes the first and last letter
console.log('jonas'.at(0));
console.log('jonas'.at(-1));
*/
/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//for (const movement of movements) {
//entries creates an array of arrays
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    //Math.abs removes the minus sign
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('---- FOREACH ----');
//in both cases, the 'movement' is the current element of the array as an argument, so it's first function(200), then function(450), and so forth
//the names not matter, but the order is always the first being the element, the second is the index, and the thir is the entire array
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    //Math.abs removes the minus sign
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
}); //you can't break from a forEach loop. If you need to break from it, you need to use a forOf
*/
/*

//FOREACH WITH A MAP
const currencies = new Map([
  // in a map, the first value is the 'key' (like an index) and the rest are elements
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//FOREACH WITH A SET
const currenciesUnique = new Set([['USD', 'GBP', 'USD', 'EUR', 'EUR']]);
console.log(currenciesUnique);
//in case of Sets, they don't have a key, so it's value, value, set
currenciesUnique.forEach(function (value, key, set) {
  console.log(`${key}: ${value}`);
});

*/
/*
const euroToUsd = 1.1;

//map creates a new array, pass through each element, then returns it mutated. This is more modern and used
const movementsUSD = movements.map(function (mov) {
  return mov * euroToUsd;
});
// console.log(movements);
// console.log(movementsUSD);

//same thing as using the map method, but here you create a new array, loops through the original, and puts the values on the created array; all manually
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * euroToUsd);
// console.log(movementsUSDfor);

//same thing as the others, but now arrow func
const movementsUSDarrow = movements.map(mov => mov * euroToUsd);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
// console.log(movementsDescriptions);

*/

//this boolean makes only the properties in 'movements' that are above 0 enter the 'deposits' array
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

//same thing as using the filter above
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
