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
        <div class="movements__value">${mov}€</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

//pega siglas do nome. Deixa tudo em minúsculo, divide em strings tudo entre os espaços, retorna a primeira letra, e depois junta tudo na mesma string. Feito um "side effect"(fazer algo e não retornar valor): todas as atuais accounts terão uma nova propriedade que são as siglas
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

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc.movements);

  //Display balance
  calcDisplayBalance(acc);

  //Display summary
  calcDisplaySummary(acc);
};

// Event Handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //prevents form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  //the interrogation is basically a "if exists". Without it, it would be currentAccount && [the rest]
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and welcome message
    //takes the full name, splits it into two divided right at where the space is, and use only the first division. And changes the HTML
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //UPDATE UI (use anywhere)
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //doing the transfering2
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //UPDATE UI (use anywhere)
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    //loops through array and finds the first index that corresponds to the condition
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    console.log(index);

    //Deletes account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

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



/*

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

*/

/*
//REDUCE METHOD (most powerful method)
console.log(movements);

//o reduce volta apenas um único valor quando soma tudo dentro do array, e nele tem o acumulador (atual soma de tudo), o valor atual, o index do atual, e o array inteiro. O zero é o valor inicial do acumulador
const balance = movements.reduce(function (accum, cur, i, arr) {
  console.log(`Iteration ${i}: ${accum}`);
  return accum + cur;
}, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

//Reduce também trás o Maximum Value
//se o acumulador for maior que o atual, trás o acumulador. Senão, traz o atual
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);
*/

/*
//DESAFIO 1 IDADE DE CACHORROS
//test data 1: [3, 5, 2, 12, 7], [4, 1, 15, 8, 3]
//test data 2: [9,16, 6, 8, 3], [10, 5, 6, 1, 4]

const dogArr1 = [3, 5, 2, 12, 7];
const dogArr2 = [4, 1, 15, 8, 3];

const dogArr1Corrected = dogArr1.slice(1, -2);
console.log(dogArr1Corrected);

const checkDogs = dogArr1Corrected.concat(dogArr2);
console.log(checkDogs);

checkDogs.forEach(function (dogAge, i, arr) {
  if (dogAge < 3) {
    console.log(`Dog number ${i + 1} is still a puppy`);
  } else {
    console.log(`Dog number ${i + 1} is an adult, and is ${dogAge} years old.`);
  }
});
*/

//DESAFIO 2 IDADE DE CACHORROS
//test data 1: [5, 2, 4, 1, 15, 8, 3]
//test data 2: [16, 6, 10, 5, 6, 1, 4]

const dogAge1 = [5, 2, 4, 1, 15, 8, 3];
const dogAge2 = [16, 6, 10, 5, 6, 1, 4];

//se quiser usar isso aqui pra ver melhor os entre-processos, mude o nome dos arrays de dogAge1 e 2 para dogAge
/*
const calcAverageHumanAge1 = dogAge.map(function (mov) {
  if (mov <= 2) {
    return mov * 2;
  } else {
    return 16 + mov * 4;
  }
});

const calcAverageHumanAge2 = dogAge
  .map(function (mov) {
    if (mov <= 2) {
      return mov * 2;
    } else {
      return 16 + mov * 4;
    }
  })
  .filter(function (mov) {
    return mov > 18;
  });
const calcAverageHumanAge3 = dogAge
  .map(function (mov) {
    if (mov <= 2) {
      return mov * 2;
    } else {
      return 16 + mov * 4;
    }
  })
  .filter(function (mov) {
    return mov > 18;
  })
  .reduce(function (acc, mov) {
    return acc + mov;
  }, 0);

  */
/*
const calcAverageHumanAge = function (ages) {
  const calcAverageHumanAge4 = ages
    .map(function (age) {
      if (age <= 2) {
        return age * 2;
      } else {
        return 16 + age * 4;
      }
    })
    .filter(function (age) {
      return age > 18;
    })
    .reduce(function (acc, age, i, arr) {
      return acc + age / arr.length;
    }, 0);
  return calcAverageHumanAge4;
};

// console.log(calcAverageHumanAge1);
// console.log(calcAverageHumanAge2);
// console.log(calcAverageHumanAge3);
console.log(calcAverageHumanAge(dogAge1));
console.log(calcAverageHumanAge(dogAge2));
*/
/*
const euroToUsd = 1.1;
console.log(movements);

//PIPELINE (chained methods)
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    return mov * euroToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
*/
/*
//loops through the array and retrieves element(s). Needs a condition and is a boolean, returns the first element that satisfies condition
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/
