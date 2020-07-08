const buttons  = document.querySelectorAll('button');
const prevOperand = document.querySelector('.prev-operand');
const currentOperand = document.querySelector('.current-operand')
let hasComma = false
let currentOperation
let isEqualComputed = false

function handleClick(event) {
    const input = event.target.innerText

    if (input === ".") {
        if (hasComma){
            return;
        }
        else{
            hasComma = true
        }
    }

    if ( !isNaN(input) || input === "."){

        if ((isEqualComputed || currentOperand.innerText === "0") && input !== "." ){
            currentOperand.innerText = input
            isEqualComputed = false
        }
        else{
            currentOperand.innerText += input
        }
        
    }

    else if (input === "+" || input === "-" || input === "÷" || input === "*"){
        hasComma = false
        if (prevOperand.innerText === "" && currentOperand.innerText === "") {  // (input === "÷" || input === "*")
            return;
        }
        // compute if we both input 
        if (prevOperand.innerText !== "" && currentOperand.innerText !== "") {
            prevOperand.innerText = compute()
            currentOperation = input
            prevOperand.innerText += currentOperation
            currentOperand.innerText = "";
            return 
        }
        currentOperation = input
        if (currentOperand.innerText === ""){
            prevOperand.innerText = `${prevOperand.innerText.slice(0, -1)}${currentOperation}`
            return 
        }
        else{
            prevOperand.innerText = `${currentOperand.innerText}${currentOperation}`
            currentOperand.innerText = ""
        }
    }


    else if (input === "AC"){
        reset()
    }

    else if (input === "DEL"){
        deleteHandler()
    }

    else if (input === "="){
        if (currentOperand.innerText !== "" && prevOperand.innerText !== ""){
            currentOperand.innerText = compute()
            currentOperation = undefined
            prevOperand.innerText = ""
        }
        else if(prevOperand.innerText !== ""){
            currentOperand.innerText = prevOperand.innerText;
        }
        isEqualComputed = true
    }
}


function reset() {
    hasComma = false;
    currentOperation = null;
    prevOperand.innerText = "";
    currentOperand.innerText = "";
}

function deleteHandler() {
    if (currentOperand.innerText[currentOperand.innerText.length -1 ] === "."){
        hasComma = false
    }
    currentOperand.innerText = currentOperand.innerText.slice(0, -1)
}

function compute() {
    var result;
    switch (currentOperation) {
        case "+":
            result = parseFloat(prevOperand.innerText.slice(0, -1)) + parseFloat(currentOperand.innerText)
            break;
        case "-":
            result = parseFloat(prevOperand.innerText.slice(0, -1)) - parseFloat(currentOperand.innerText)
            break;
        case "*":
            result = parseFloat(prevOperand.innerText.slice(0, -1)) * parseFloat(currentOperand.innerText)
            break;
        case "÷":
            result = parseFloat(prevOperand.innerText.slice(0, -1)) / parseFloat(currentOperand.innerText)
            break;
    
        default:
            break;
    }
    return result;
}
        
buttons.forEach(button => {
    //button.addEventListener('onClick', handleClick)
     button.onclick =  handleClick;
});