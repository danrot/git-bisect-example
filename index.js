const readline = require("readline-sync");

const operand1 = parseInt(readline.question("First operator: "));
const operator = readline.question("Operator: ");
const operand2 = parseInt(readline.question("Second operator: "));

let result;

switch (operator) {
	case "+":
		result = operand1 + operand2;
		break;
}

console.log(result);
