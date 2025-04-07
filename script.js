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
const input = document.getElementById("calculatorInput")
const buttonFrog = document.getElementById("buttonFrog")
const ribbitSound = document.getElementById("ribbitSound")

let resultadoExibido = false;

// Impede digitação e abertura do teclado mobile
input.readOnly = true;

// start input
input.addEventListener("keydown", function(e) {
    e.preventDefault(); // bloqueia tudo

    // menos backspace
    if (e.key === "Backspace") {
        e.preventDefault();
        // Checando currentToken
        let currentToken = tokens[tokens.length - 1];
        if (tokens.length === 1) {
            tokens = [0];
        } else {
            console.log(tokens);
            tokens.pop();
        }
        console.log(tokens);
        input.value = tokens.join(" ");
    }
});
// end input

// start frog
buttonFrog.addEventListener("click", () => {
    ribbitSound.play();
});
// end frog

// Escopo Global
let tokens = [0];

// start Numbers
buttonNumber.forEach(button => {
    button.addEventListener("click", (event) => {
        // Conteúdo
        const numberValue = button.textContent;
        // Atualizando currentToken
        let currentToken = tokens[tokens.length - 1];
        if ((tokens.length === 1 && tokens[0] === 0) || resultadoExibido) {
            // Caso seja apenas um 0 no tokens ou o resultado seja exibido.
            tokens[0] = numberValue;
            console.log(tokens);
        } else if (["+", "-", "×", "÷"].includes(currentToken)) {
            // Caso seja operador numérico
            tokens.push(numberValue);
        } else if (!currentToken.includes("%")) {
            tokens[tokens.length - 1] += numberValue;
        }
        // Atualizando input com memória
        input.value = tokens.join(" ");
        // Previne que ocorra uma substituição extra (pós apertar o =)
        resultadoExibido = false;
    });
});
// End Numbers

// start BackSpace e Clear
buttonBackspace.addEventListener("click", () => {
    // Atualizando currentToken
    let currentToken = tokens[tokens.length - 1];
    if (tokens.length === 1 && currentToken.length === 1) {
        tokens = [0];
    } else if (currentToken.length > 1) {
        console.log(tokens);
        tokens[tokens.length - 1] = currentToken.slice(0, -1);
    } else {
        tokens.pop();
        // Se for um operador
    }
    // Atualizando input com memória
    console.log(tokens);
    input.value = tokens.join(" ");
});

buttonClear.addEventListener("click", () => {
    // Zera todos os valores de tokens para um elemento com o valor 0 number
    tokens = [0];
    input.value = tokens.join(" ");
    pastLog.textContent = "Clean";
});
// End BackSpace & Clear

// start operadores numéricos + - * /
buttonOperator.forEach(button => {
    button.addEventListener("click", () => {
        // Conteúdo
        const operatorValue = button.textContent;
        // Atualizando currentToken
        let currentToken = tokens[tokens.length - 1];
        console.log(currentToken);
        console.log(tokens);
        if (!["+", "-", "×", "÷"].includes(currentToken)) {
            tokens.push(`${operatorValue}`);
            console.log(tokens);
        }
        // Atualizando input com memória
        input.value = tokens.join(" ");
        // Previne que ocorra uma substituição de acontecer.
        resultadoExibido = false;
    });
});
// end operadores numéricos

// start: Lógica de mostrar resultado.
buttonResult.addEventListener("click", () => {
    // Atualizando currentToken
    let currentToken = tokens[tokens.length - 1];
    // % = * 0.01;

    // Valores
    tokens = tokens.map(token => {
        if (token.includes("%")) {
            token = Number(token.replace("%", "") * 0.01);
            return String(token);
        }
        return token;
    });
    // Se for número inteiro, fica normal. Se for número decimal, arredonda para 2 casas decimais.
    function formatarResultado(resultado) {
        return Number.isInteger(resultado)
            ? resultado.toString()
            : resultado.toFixed(2);
    }
    
    function operation(tokens, operators) {
        let i = 0;
        while (i < tokens.length) {
            // Vai verificar todos os elementos de tokens neste while.
            pastLog.textContent = `${input.value} =`;
            if (operators.includes(tokens[i])) {
                // Substitui operadores por operações matemáticas
                let operator = tokens[i];
                let right = Number(tokens[i - 1]);
                let left = Number(tokens[i + 1]);
                let result;

                if (operator == "×" || operator == "&times") {
                    // Caso esteja multiplicando
                    result = right * left;
                } else if (operator == "÷") {
                    // Caso esteja dividindo
                    result = right / left;
                } else if (operator == "-") {
                    // Caso esteja subtraindo
                    result = right - left;
                } else if (operator == "+") {
                    // Caso esteja somando
                    result = right + left;
                }
                // Substitui os elementos right, left e operator por result.
                tokens.splice(i - 1, 3, result);
                // Retrocede i para não pular elemento no próximo loop.
                i = i - 1;
            } else {
                // Se tokens[i] não for operador, vai para o próximo.
                i++;
            }
        }
        return tokens;
    }
    // Primeiro, processa multiplicação e divisão.
    tokens = operation(tokens, ["*", "×", "/", "÷"]);
    // Depois, processa adição e subtração.
    tokens = operation(tokens, ["+", "-"]);
    
    // O resultado final será o primeiro elemento do array.
    input.value = formatarResultado(Number(tokens[0]));

    // Transforma todos os elementos de tokens em string.
    tokens = tokens.map(String);
    console.log(tokens);

    // Isso faz com que, ao digitar um número, o resultado seja substituído.
    resultadoExibido = true;
});
// End botão de =

// start botão de casa decimal
buttonFloat.addEventListener("click", () => {
    // Atualizando currentToken
    let currentToken = tokens[tokens.length - 1];
    if (!currentToken.includes(".") && !isNaN(currentToken)) {
        // Se o token não tiver "." e for um número:
        tokens[tokens.length - 1] += ".";
    }
    // Atualiza o display.
    input.value = tokens.join(" ");
    resultadoExibido = false;
});
// end botão .

// start botão de porcentagem
buttonPorcentagem.addEventListener("click", () => {
    // Atualizando currentToken
    let currentToken = tokens[tokens.length - 1];
    // Valor
    const porcentagem = buttonPorcentagem.textContent;
    if (!currentToken.includes(porcentagem) && !isNaN(currentToken)) {
        // Se o token não tiver "%" e for um número:
        tokens[tokens.length - 1] += porcentagem;
        console.log(tokens);
    }
    input.value = tokens.join(" ");
});
// end botão %
