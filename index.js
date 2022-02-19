const readline = require("readline-sync");

const operand1 = parseInt(readline.question("First operator: "));
const operand2 = parseInt(readline.question("Second operator: "));

const result = operand1 + operand2;

console.log(result);
