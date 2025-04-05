
// Declaração de variáveis.
const buttonResult = document.getElementById("buttonResult")
const buttonNumber = document.querySelectorAll(".buttonNumber");
const buttonBackspace = document.getElementById("buttonBackspace");
const buttonClear = document.getElementById("buttonClear");
const buttonOperator = document.querySelectorAll(".buttonOperator");
const pastLog = document.getElementById("pastLog");
const buttonFloat = document.getElementById("buttonFloat")
const buttonPorcentagem = document.getElementById("buttonPorcentagem")
const buttonOpen = document.getElementById("buttonOpen")
let resultadoExibido = false;

// start Numbers
buttonNumber.forEach(button => {
    button.addEventListener("click", (event) => {
        const value = button.textContent;
        if (input.value === "0" || resultadoExibido) {
            // Se o input estiver zerado, substitui o valor
            input.value = value;
            resultadoExibido = false; 
            console.log(input.value)
        } else {
            input.value += value;
            console.log(input.value)
        }
    });    
})
// End Numbers

// start BackSpace e Clear
buttonBackspace.addEventListener("click", () => {
        if (input.value.length === 1) {
            input.value = 0;
        } else if (input.value.slice(-1) === " ") {
            input.value = input.value.slice(0,-2)
        } else {
            input.value = input.value.slice(0,-1);
        }
})

buttonClear.addEventListener("click", () => {
    input.value = 0;
    pastLog.textContent = "Clean";
})
// End BackSpace & Clear

// start operadores numéricos + - * /
buttonOperator.forEach(button => {
    button.addEventListener("click", () => {
        let tokens = input.value.trim().split(" ");
        let currentToken = tokens[tokens.length - 1];
            if (!["+", "-", "×", "÷"].includes(currentToken)) {
                const operatorValue = button.textContent;
                tokens.push(`${operatorValue} `);
                // Tem que por um espaço apenas na direita, pois number não faz a separação de elemento
                input.value = tokens.join(" ");
                resultadoExibido = false;
                console.log(input.value)
            }
    })
})
// end operadores numéricos

// start: Lógica de mostrar resultado.
buttonResult.addEventListener("click", () => {
    console.log(input.value)
    let tokens = input.value.trim().split(" ");
    console.log(tokens)
    tokens = tokens.map(token => {
        if (typeof token === "string" && token.includes("%")) {
            // Remove o "%" e converte o restante para número, depois divide por 100
            let valueWithoutPercent = token.replace("%", "");
            return Number(valueWithoutPercent) * 0.01;
        }
        return isNaN(token) ? token : Number(token);
    })
    console.log(tokens);
    
    function operation(tokens, operators) {
        let i = 0;
        while (i < tokens.length) {
            pastLog.textContent = `${input.value} =`
            if (operators.includes(tokens[i])) {
                let operator = tokens[i];
                let right = tokens[i - 1];
                let left = tokens[i + 1];
                let result;
                if (operator == "×" || operator == "&times") {
                    result = right * left
                } else if (operator == "÷") {
                    result = right / left
                } else if (operator == "-") {
                    result = right - left
                } else if (operator == "+") {
                    result = right + left
                }
                tokens.splice(i - 1, 3, result);
                i = i - 1;
            } else {
                i++;
            }
            // fim do if
        }
        // fim do while
        return tokens;
    }
    // fim da function operation
    
    // Primeiro, processa multiplicação e divisão
    tokens = operation(tokens, ["*", "×", "/", "÷"]);
    // Depois, processa adição e subtração
    tokens = operation(tokens, ["+", "-"]);
    
    // O resultado final estará no primeiro elemento do array
    input.value = tokens[0];

    // Isso faz com que, ocorra uma substituição do resultado
    resultadoExibido = true;
})

// End botão de =

// start botão de casa decimal
buttonFloat.addEventListener("click", () => {
    let tokens = input.value.trim().split(" ");
    let currentToken = tokens[tokens.length - 1]
    if (!currentToken.includes(".") && !isNaN(currentToken)) {
        currentToken += ".";
        tokens[tokens.length - 1] = currentToken;
        input.value = tokens.join(" ");
    } 
    resultadoExibido = false;
    })
// end botão .

// start botão de porcentagem
buttonPorcentagem.addEventListener("click", () => {
    tokens = input.value.trim().split(" ")
    currentToken = tokens[tokens.length - 1]
    const porcentagem = buttonPorcentagem.textContent
    if (!currentToken.includes(porcentagem) && !isNaN(currentToken)) {
        currentToken += porcentagem
        tokens[tokens.length - 1] = currentToken
        input.value = tokens.join(" ")
        console.log("teste")
    }
})
// end botão %

// start botões de ()
// buttonOpen.addEventListener("click", () => {
//     tokens = input.value.trim().split(" ")
//     currentToken = tokens[tokens.length - 1]
//     currentToken = `(${currentToken})`
// })
// end parenteses