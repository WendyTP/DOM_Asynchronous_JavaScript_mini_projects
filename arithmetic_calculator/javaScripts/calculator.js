// validate input (if no input on either, then don't compute, show alert)
// transform string input to number before computing
// transform computed number to 2-digits string number for display (num.toFixed(2))
    function validInput(input) {
      return input.length !== 0;
    }

    function compute(num1, num2, operator) {
      let result;

      switch (operator) {
        case '+':
          result = num1 + num2;
          break;
        case '-':
          result = num1 - num2;
          break;
        case '*':
          result = num1 * num2;
          break;
        case '/': 
          result = num1 / num2;
          break;
      }
      return result;
    }

    document.addEventListener('DOMContentLoaded', event => {
      let form = document.querySelector('form');
      let h1 = document.querySelector('h1');
      form.reset();

      form.addEventListener('submit', event => {
        event.preventDefault();
        let firstNum = document.getElementById('firstNum').value;
        let secondNum = document.getElementById('secondNum').value;
        let operatorValue = document.getElementById('arithmeticOperation').value;

        if (!validInput(firstNum) || !validInput(secondNum)) {
          alert('Please put some number');
        } else {
          let computeResult = compute(Number(firstNum), Number(secondNum), operatorValue);
          h1.textContent = computeResult.toFixed(2);
        }
      });

    });