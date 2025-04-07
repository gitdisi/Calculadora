
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

resultadoExibido = false;

// start input
function moveCaretToEnd() {
    const length = input.value.length;
    input.setSelectionRange(length, length);
  }

  input.addEventListener('click', moveCaretToEnd);
  input.addEventListener('focus', moveCaretToEnd);

  input.addEventListener("keydown", function(e) {
    if (e.key === "Backspace") {
        e.preventDefault()
        input.value = input.value.slice(0, -1) || "0";
        // Caso o valor no input seja falsy ( "", 0, null, enfim...)
        // após remover 1 vai ser 0.
    } else if (input.value == 0) {
        e.preventDefault()
        input.value = e.key
    } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault()
    }
  })
//   Ultimo a ser modificado, vou arrumar a questão dos botões e da memória primeiro.
// end input

// start frog
buttonFrog.addEventListener("click", () => {
    ribbitSound.play()
  })
// end frog

// Escopo Global
let tokens = [0]

// start Numbers
buttonNumber.forEach(button => {
    button.addEventListener("click", (event) => {
        // Conteúdo
        const numberValue = button.textContent;
        // Atualizando CurrentTokens
        let currentToken = tokens[tokens.length - 1];
        if ((tokens.length === 1 && tokens[0] === 0) || resultadoExibido) {
            // Caso seja apenas um 0 no tokens ou o resultado seja exibido.
            tokens[0] = numberValue;
            console.log(tokens) 
        } else if (["+", "-", "×", "÷"].includes(currentToken)) {
            // Caso seja operador numérico
            tokens.push(numberValue)
        } else if (!currentToken.includes("%")) {
            tokens[tokens.length - 1] += numberValue;
        }
        // Atualizando input com memória
        input.value = tokens.join(" ");
        // Previni que ocorra uma substituição extra ( pós apertar o =)
        resultadoExibido = false;
        
    });    
})
// End Numbers

// start BackSpace e Clear
buttonBackspace.addEventListener("click", () => {
    // Atualizando currentToken
    currentToken = tokens[tokens.length - 1]
        if (tokens.length === 1) {
            tokens = [0];
        } else if (currentToken.includes("(") && currentToken.includes(")")) {
            // Parenteses, assumindo que o primeiro elemento do array seja ( e o segundo seja ), basta usar shift e pop no array já e destransformar ele pra elementos normais do token
        } else {
            console.log(tokens)
            tokens.pop()
        }
        // Atualizando input com memória
        console.log(tokens)
        input.value = tokens.join(" ")
})

buttonClear.addEventListener("click", () => {
    // Zera todos os valores de tokens para um elemento com o valor 0 number
    tokens = [0];
    input.value = tokens.join(" ")
    pastLog.textContent = "Clean";
})
// End BackSpace & Clear

// start operadores numéricos + - * /
buttonOperator.forEach(button => {
    button.addEventListener("click", () => {
        // Conteúdo
        const operatorValue = button.textContent;
        // Atualizando CurrentToken
        let currentToken = tokens[tokens.length - 1];
        console.log(currentToken)
        console.log(tokens)
            if (!["+", "-", "×", "÷"].includes(currentToken) && !currentToken.includes("(")) {
                tokens.push(`${operatorValue}`);
                console.log(tokens)
            }
            // Atualizando input com memória
            input.value = tokens.join(" ")
            // Previne uma substituição de acontecer.
            resultadoExibido = false;
    })
})
// end operadores numéricos

// start: Lógica de mostrar resultado.
buttonResult.addEventListener("click", () => {
    // Atualizando currentToken
    currentToken = tokens[tokens.length - 1]
    // % = * 0.01;

    // Valores
    tokens = tokens.map(token => {
        if (token.includes("%")) {
            token = Number(token.replace("%", "") * 0.01)
            return String(token)
        }
            return token
        }
    );
    // Se for número inteiro, vai ficar normal. Se for número decimal, será arredondado para 2 casas decimais.
    function formatarResultado(resultado) {
        return Number.isInteger(resultado)
            ? resultado.toString()
            : resultado.toFixed(2);
    }
    
    function operation(tokens, operators) {
        let i = 0;
        while (i < tokens.length) {
            // Vai verificar todos os elementos de token este while.
            pastLog.textContent = `${input.value} =`
            if (operators.includes(tokens[i])) {
                // Vai substituir operators por operadores matemáticos
                let operator = tokens[i];
                let right = Number(tokens[i - 1]);
                let left = Number(tokens[i + 1]);
                let result;

                    // if token é um array, executar ideia de parenteses
                if (operator == "×" || operator == "&times") {
                    // Caso esteja multiplicando
                    result = right * left
                } else if (operator == "÷") {
                    // Caso esteja dividindo
                    result = right / left
                } else if (operator == "-") {
                    // Caso esteja subtraindo
                    result = right - left
                } else if (operator == "+") {
                    // Caso esteja somando
                    result = right + left
                }
                // Substitui os elementos right, left e operator por result.
                tokens.splice(i - 1, 3, result);
                // Retrocede I, para não pular 1 elemento quando o while se repetir
                i = i - 1;
            } else {
                // Caso o tokens[i] não seja um operador matemático, verificar o próximo elemento.
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
    
    // O resultado final será diminuido até sobrar apenas 1 elemento no array
    input.value = formatarResultado(Number(tokens[0]));

    // Transforma todos os elementos de tokens em string
    tokens = tokens.map(String);
    console.log(tokens)

    // Isso faz com que, ocorra uma substituição do resultado ao digitar um number.
    resultadoExibido = true;
})

// End botão de =

// start botão de casa decimal
buttonFloat.addEventListener("click", () => {
    // Atualizando currentToken
    let currentToken = tokens[tokens.length - 1]
    if (!currentToken.includes(".") && !isNaN(currentToken)) {
        // Se o elemento não já tiver um . e for um número :
        tokens[tokens.length - 1] += ".";
    }
    // Javascript muitas vezes não consegue definir um valor para "." de forma
    // correta, então eu sempre arredondarei o resultado para duas casas decimais no minimo.
    input.value = tokens.join(" ")
    resultadoExibido = false;
    })
// end botão .

// start botão de porcentagem
buttonPorcentagem.addEventListener("click", () => {
    // Atualizando currentToken
    currentToken = tokens[tokens.length - 1]
    // Valor
    const porcentagem = buttonPorcentagem.textContent
    if (!currentToken.includes(porcentagem) && !isNaN(currentToken)) {
        // Se já não tiver porcentagem e for um número :
        tokens[tokens.length - 1] += porcentagem
        console.log(tokens)
    }
    input.value = tokens.join(" ")
})
// end botão %

// start botões de ()
buttonOpen.addEventListener("click", () => {
    // Checando currentToken
    currentToken = tokens[tokens.length - 1]
    if (!["+", "-", "×", "÷"].includes(currentToken) && !currentToken.includes(")")) {
        tokens[tokens.length - 1] = `(${tokens[tokens.length - 1]})`;
        input.value = tokens.join(" ")
        console.log(tokens)
    }
    // não ser possivel por parenteses em 0
})