document.addEventListener("DOMContentLoaded", function() {
    const screen = document.getElementById('screen');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    // Function to update the screen
    function updateScreen(value) {
        screen.value = value;
    }

    // Add event listeners for number buttons
    document.querySelectorAll('.btn').forEach(function(button) {
        button.addEventListener('click', function() {
            const btnValue = this.innerText;
            if (btnValue >= '0' && btnValue <= '9' || btnValue === '.') {
                currentInput += btnValue;
                updateScreen(currentInput);
            } else if (btnValue === 'C') {
                currentInput = '';
                previousInput = '';
                operator = '';
                updateScreen('');
            } else if (btnValue === '←') {
                currentInput = currentInput.slice(0, -1);
                updateScreen(currentInput);
            } else if (['+', '-', '*', '/'].includes(btnValue)) {
                if (previousInput !== '') {
                    calculate();
                }
                operator = btnValue;
                previousInput = currentInput;
                currentInput = '';
            } else if (btnValue === '=') {
                calculate();
            }
        });
    });

    // Function to perform calculation
    function calculate() {
        let result = 0;
        if (operator === '+') {
            result = parseFloat(previousInput) + parseFloat(currentInput);
        } else if (operator === '-') {
            result = parseFloat(previousInput) - parseFloat(currentInput);
        } else if (operator === '*') {
            result = parseFloat(previousInput) * parseFloat(currentInput);
        } else if (operator === '/') {
            result = parseFloat(previousInput) / parseFloat(currentInput);
        }
        updateScreen(result);
        currentInput = result.toString();
        previousInput = '';
        operator = '';
    }
});
