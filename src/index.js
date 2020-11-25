import "./styles.css";

//-------------------------------------------------------------------
// TASK 1
const sum = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};
//-------------------------------------------------------------------

//this function will implement your calculations
const performCalculation = {
  "/": (firstOperand, secondOperand) => divide(firstOperand, secondOperand),

  "*": (firstOperand, secondOperand) => multiply(firstOperand, secondOperand),

  "+": (firstOperand, secondOperand) => sum(firstOperand, secondOperand),

  "-": (firstOperand, secondOperand) => subtract(firstOperand, secondOperand),

  "=": (firstOperand, secondOperand) => secondOperand
};

// the object calculator and its default values
const calculator = {
  displayValue: "0",
  infoValue: null,
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null
};

//whenever a digit is clicked this function runs
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  // If the `displayValue` does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    // Append the decimal point
    calculator.displayValue += dot;
  }
}

//-------------------------------------------------------------------
// TASK 2
function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand == null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;

    //here is where the result is calculated
    const result = performCalculation[operator](currentValue, inputValue);

    calculator.displayValue = String(result);

    //here we use the feature of the calculator called
    // "infoValue" is set as the binary result
    if (result % 2 === 0) {
      calculator.infoValue = "Even";
    } else {
      calculator.infoValue = "Odd";
    }
    //

    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

//resets the calculator
function resetCalculator() {
  calculator.displayValue = "0";
  calculator.infoValue = null;
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function updateDisplay() {
  const display = document.querySelector(".calculator-screen");
  display.value = calculator.displayValue;
  const info = document.querySelector(".calculator-info");
  info.value = calculator.infoValue;
}

updateDisplay();

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", (event) => {
  const { target } = event;

  //checks hat the user has clicked on a button - error handling
  if (!target.matches("button")) {
    return;
  }

  // if the user has clicked on an operator
  if (target.classList.contains("operator")) {
    calculator.infoValue = target.value;
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  //if the user has clicked to clear the screen
  if (target.classList.contains("all-clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }
  //-------------------------------------------------------------------
  //TASK 3
  calculator.infoValue = parseFloat(target.value).toString(2);
  //
  inputDigit(target.value);
  updateDisplay();
});
