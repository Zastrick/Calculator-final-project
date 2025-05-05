// funciones basicas
function add(a, b) {
    return a + b;
  }
  
  function subtract(a, b) {
    return a - b;
  }
  
  function multiply(a, b) {
    return a * b;
  }
  
  function divide(a, b) {
    if (b === 0) return "¿En serio? 🙄";
    return a / b;
  }
  
  function operate(op, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
      case '+': return add(a, b);
      case '-': return subtract(a, b);
      case '*': return multiply(a, b);
      case '/': return divide(a, b);
      default: return b;
    }
  }
  
  // inicio variables
  let currentInput = '';
  let previousInput = '';
  let operator = null;
  let resultDisplayed = false;
  
  // componentes
  const display = document.getElementById('display');
  const numberButtons = document.querySelectorAll('.number');
  const operatorButtons = document.querySelectorAll('.operator');
  const equalBtn = document.getElementById('equal');
  const clearBtn = document.getElementById('clear');
  const backspaceBtn = document.getElementById('backspace');
  const decimalBtn = document.getElementById('decimal');
  
  // refresh
  function updateDisplay(value) {
    display.textContent = value.toString().slice(0, 12);
  }
  
  // calculo numeros
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (resultDisplayed) {
        currentInput = '';
        resultDisplayed = false;
      }
      if (currentInput === '0') currentInput = '';
      currentInput += button.textContent;
      updateDisplay(currentInput);
    });
  });
  
  // calculo operadores
  operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (currentInput === '') return;
      if (previousInput && operator) {
        const result = operate(operator, previousInput, currentInput);
        previousInput = result;
        updateDisplay(result);
      } else {
        previousInput = currentInput;
      }
      operator = button.dataset.op;
      currentInput = '';
      resultDisplayed = false;
    });
  });
  
  // igual a 
  equalBtn.addEventListener('click', () => {
    if (previousInput && currentInput && operator) {
      let result = operate(operator, previousInput, currentInput);
      if (typeof result === "number") result = Math.round(result * 1000) / 1000;
      updateDisplay(result);
      currentInput = result.toString();
      previousInput = '';
      operator = null;
      resultDisplayed = true;
    }
  });
  
  // boton borrar
  clearBtn.addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay('0');
  });
  
  // retroceso
  backspaceBtn.addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
  });
  
  // punto decimal
  decimalBtn.addEventListener('click', () => {
    if (!currentInput.includes('.')) {
      if (currentInput === '') currentInput = '0';
      currentInput += '.';
      updateDisplay(currentInput);
    }
  });
  
  