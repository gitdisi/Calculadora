const input = document.getElementById("calculatorInput")

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



  const buttonFrog = document.getElementById("buttonFrog")
  const ribbitSound = document.getElementById("ribbitSound")

  buttonFrog.addEventListener("click", () => {
    ribbitSound.play()
  })