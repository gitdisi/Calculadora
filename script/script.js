
// Declaração de variáveis.
const buttonResult = document.getElementById("buttonResult")
const buttonNumber = document.querySelectorAll(".buttonNumber");
const buttonBackspace = document.getElementById("buttonBackspace");
const buttonClear = document.getElementById("buttonClear");
const buttonOperator = document.querySelectorAll(".buttonOperator");
const pastLog = document.getElementById("pastLog");
const buttonFloat = document.getElementById("buttonFloat")
let resultadoExibido = false;

// start : Lógica dos botões com valor de número
buttonNumber.forEach(button => {
    button.addEventListener("click", (event) => {
        // Coloquei tokens no parâmetro dessa function acima, funcionaria?
        const value = button.textContent;
        if (input.value == 0 || resultadoExibido) {
            // Se o input estiver zerado, substitui o valor
            input.value = value;
            resultadoExibido = false; 
        } else {
            input.value += value;
        }
    });    
})
// End Numbers

// start : Lógica do botão de backspace e clear
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

// start: Lógica dos operadores numéricos + - * /
buttonOperator.forEach(button => {
    button.addEventListener("click", () => {
        const operatorValue = button.textContent;
        input.value += ` ${operatorValue} `;
        resultadoExibido = false;
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
        // Operators será substituido por um parâmetro que contenha a operação
        // De multiplicação e divisão, para depois soma e subtração.
        let i = 0;
        while (i < tokens.length) {
            pastLog.textContent = `${input.value} =`
            if (operators.includes(tokens[i])) {
                // Caso o token[i] seja um dos operadores presente em operators,
                // esse if será executado.
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
                // A lógica é que, quando i for um operador, ele vai pegar o
                // elemento anterior ao operador ( right ) e o elemento posterior
                // ao operator ( left ) e executar o calculo de acordo com a operação
                // que o operator é (+ - / *), armazenando isso na variável result.
                tokens.splice(i - 1, 3, result);
                // Remove 3 elementos, começando do elemento anterior a i, ou seja,
                // os elementos left, operator e right são deletados e substituidos
                // por result.
                i = i - 1;
                // Isso previne este bug, explicado com um exemplo :
                // [ "1", "+", "1", "+", "1" ]
                // Slice substituiu os 3 primeiros elementos por result :
                // [ 2, "+", "1" ]
                // Result ganha o indice 0 no array.
                // Porém, if foi executada quando i = 1. Acaba ocorrendo um i++, o que
                // Faz com que no próximo loop, seja executado o elemento com indice 2
                // Porém, o segundo "+" tava com indice 2, mas agora tem indice 1 por
                // causa do slice, então ele é pulado.

            } else {
                i++;
                // Caso tokens[i] não seja um operador, aumenta em +1 i.
            }
            // fim do if
        }
        // fim do while
        return tokens;
        // Retorna o valor de tokens no callback, após terminar o loop.
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
    console.log(tokens)
    let currentToken = tokens[tokens.length - 1]
    console.log(currentToken)
    if (!currentToken.includes(".") && !isNaN(currentToken)) {
        currentToken += ".";
        console.log(currentToken)
        tokens[tokens.length - 1] = currentToken;
        console.log(tokens)
    } 
    input.value = tokens.join(" ");
    })
// end botão .