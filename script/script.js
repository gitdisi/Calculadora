
// Declaração de variáveis.
const buttonResult = document.getElementById("buttonResult")
const buttonNumber = document.querySelectorAll(".buttonNumber");
const buttonBackspace = document.getElementById("buttonBackspace");
const buttonClear = document.getElementById("buttonClear");
const buttonOperator = document.querySelectorAll(".buttonOperator");
const pastLog = document.getElementById("pastLog");
const buttonFloat = document.getElementById("buttonFloat")
let resultadoExibido = false;

// start Numbers
buttonNumber.forEach(button => {
    button.addEventListener("click", (event) => {
        // Coloquei tokens no parâmetro dessa function acima, funcionaria?
        const value = button.textContent;
        if (input.value === "0" || resultadoExibido) {
            // Se o input estiver zerado, substitui o valor
            input.value = value;
            resultadoExibido = false; 
        } else {
            input.value += value;
        }
    });    
})
// End Numbers

// start BackSpace e Clear
buttonBackspace.addEventListener("click", () => {
        if (input.value.length === 1) {
            input.value = 0;
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
        console.log(currentToken);
            if (!["+", "-", "×", "÷"].includes(currentToken)) {
                const operatorValue = button.textContent;
                tokens.push(` ${operatorValue} `);
                console.log(currentToken);
                input.value = tokens.join(" ");
                resultadoExibido = false;
            }
            // Bug de varios operadores consecutivos 2 + + + resolvido.
            // Como? Coloquei a lógica de transformar o input.value em um array
            // Separado por espaço, depois fiz uma variável "currentoken" que
            // seleciona o ultimo elemento do array ( o que está sendo editado )
            // Após isso, eu verificado caso esse ultimo elemento seja um operador
            // matemático, se não for eu adiciono um novo elemento no array que possui
            // o conteúdo de texto do operador, depois atualizo o valor do input com
            // o array novo, que é deletado pelo joins.
    })
})
// end operadores numéricos

// start: Lógica de mostrar resultado.
buttonResult.addEventListener("click", () => {
    let tokens = input.value.trim().split(" ");
    tokens = tokens.map(token => {
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

// start Lógica do botão de casa decimal, como 1.2
buttonFloat.addEventListener("click", () => {
    let tokens = input.value.trim().split(" ");
    let currentToken = tokens[tokens.length - 1]
    if (!currentToken.includes(".") && !isNaN(currentToken)) {
        currentToken += ".";
        tokens[tokens.length - 1] = currentToken;
    } 
    input.value = tokens.join(" ");
    resultadoExibido = false;
    })
// end botão .