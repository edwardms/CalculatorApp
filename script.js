class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (this.fromEqual) {
            this.fromEqual = false;
            this.currentOperand = number;
            this.previousOperand = '';
            this.updateDisplay();

            return;
        }
        if (number === '.' && this.currentOperand.includes('.')) return;
        else this.currentOperand = this.currentOperand.toString() + number.toString();

        // this.resizeCurrentOperand();
    }

    chooseOperation(operation) {
        if (this.previousOperand === "" && this.currentOperand === "") return;
        
        this.operation = operation;

        if (this.fromEqual) {
            this.fromEqual = false;
            this.previousOperand = this.currentOperand + ' ' + this.operation;
            this.currentOperand = '';
        } else {
            let prevOp = this.previousOperand.toString();
            let currOp = this.currentOperand.toString();
            
            if (currOp.charAt(currOp.length - 1) === '.') return;
    
            if (this.currentOperand === "") prevOp = prevOp.substring(0, prevOp.length - 1) + this.operation.toString();
            else prevOp += ' ' + currOp + ' ' + this.operation.toString();
                    
            this.previousOperand = prevOp;
            this.currentOperand = '';
        }
    }

    compute() {
        if (this.fromEqual) return;
        
        let prev = this.previousOperand.replaceAll(" ", "");
        let current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;

        const computation = eval(prev + current);
        this.previousOperand = this.previousOperand + ' ' + this.currentOperand;
        this.currentOperand = computation;

        this.fromEqual = true;
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
    }

    updateHistory() {
        
    }
    
    // resizeCurrentOperand() {
    //     const windowWidth = window.innerWidth;
    //     const currOpLength = this.currentOperand.length;
    //     let currOpFont;

    //     if (windowWidth > 768) {
    //         if (currOpLength > 17) currOpFont = '2em';
    //         if (currOpLength > 21) currOpFont = '1.5em';
    //         if (currOpLength > 29) currOpFont = '1em';
    //     }

    //     currentOperandTextElement.style.fontSize = currOpFont;
    // }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');     //10 13 17 length screen size

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {  
    calculator.compute();
    calculator.updateDisplay();

});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();

});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();

});
