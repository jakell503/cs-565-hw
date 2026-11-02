/** Exercise 01 - Coins.
 * Use file 01-coins.js and run this file with the following command: node 01-coins.js
Use console.log() to write the proper output to the command line.
Write a program that takes up any dollar amount (up to $100), and converts it to the numbers coins needed. The coins we will be using are: dollars ($1), quarters ($0.25), dimes ($0.10), nickels ($0.05), and pennies ($0.01)
Example: $4.62 should return 4 dollars, 2 quarters, 1 dime, and 2 pennies.
There are some sample test cases to ensure your program works as expected.
Add additional test (including edge cases) cases to your file. **/

// Add your function here
const calculateChange = (amount) => {
  // validate the input
  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    return `${amount} ==> Error: amount must be a valid number`;
  }
  if (amount > 100) {
    return `$${amount} ==> Error: the number is too large`;
  }
  if (amount < 0) {
    return `($${amount * -1}) ==> Error: the number cannot be negative`;
  }
  if (amount === 0) {
    return `$${amount} ==> No change needed`;
  }

  // calculate the number of dollars, quarters, dimes, nickels, and pennies
  // convert amount to cents then use % to determine the number of each coin
  let remainingCents = Math.round(amount * 100);

  const dollars = Math.floor(remainingCents / 100);
  remainingCents %= 100;

  const quarters = Math.floor(remainingCents / 25);
  remainingCents %= 25;

  const dimes = Math.floor(remainingCents / 10);
  remainingCents %= 10;

  const nickels = Math.floor(remainingCents / 5);
  remainingCents %= 5;

  const pennies = remainingCents;

  // output array
  const output = [
    dollars > 0 && `${dollars} dollar${dollars !== 1 ? 's' : ''}`,
    quarters > 0 && `${quarters} quarter${quarters !== 1 ? 's' : ''}`,
    dimes > 0 && `${dimes} dime${dimes !== 1 ? 's' : ''}`,
    nickels > 0 && `${nickels} nickel${nickels !== 1 ? 's' : ''}`,
    pennies > 0 && `${pennies} penn${pennies !== 1 ? 'ies' : 'y'}`,
  ]
    .filter(Boolean)
    .join(', ');

  return `$${amount} ==> ${output}`;
};

// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Add additional test cases here
console.log(calculateChange(-150.11));
// ($150.11) ==> Error: the number cannot be negative
console.log(calculateChange(0));
// $0 ==> No change needed
console.log(calculateChange(100));
// $100 ==> 100 dollars
console.log(calculateChange(0.09));
// $0.09 ==> 1 nickel, 4 pennies
console.log(calculateChange(99.99));
// $99.99 ==> 99 dollars, 3 quarters, 2 dimes, 4 pennies
console.log(calculateChange(99.91));
// $99.91 ==> 99 dollars, 3 quarters, 1 dime, 1 nickel, 1 penny
console.log(calculateChange(99.25));
// $99.25 ==> 99 dollars, 1 quarter
console.log(calculateChange(null));
// null ==> Error: amount must be a valid number
