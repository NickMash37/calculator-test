let a = ""; //first num
let b = ""; //second num
let sign = ""; //operator
let finish = false;
const digitBtns = document.querySelectorAll(".calc-btns__btn");

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const actions = ["+", "-", "/", "*", "M", "MR"];
const memory = [];

const calcScreen = document.querySelector(".calc-screen");

function clearAll() {
  a = "";
  b = "";
  sign = ""; 
  finish = false;
  calcScreen.textContent = '0';
}

digitBtns.forEach((el) => {
  el.addEventListener("click", (event) => {
    const key = event.target.textContent;

    calcScreen.textContent = "";

    if (digits.includes(key)) {
      if (b === "" && sign === "") {
        a += key;
        calcScreen.textContent = a;
      } else if (a !== "" && b !== "" && finish) {
        b = key;
        finish = false;
        calcScreen.textContent = b;
      } else {
        b += key;
        calcScreen.textContent = b;
      }

      return;
    }

    if (actions.includes(key) && key !== 'M' && key !== 'MR') {
      sign = key;
      calcScreen.textContent = sign;
      return;
    } else if (actions.includes(key) && key === 'M') {
      memory.push(a, sign, b)
    } else if (actions.includes(key) && key === 'MR') {
      calcScreen.textContent = memory.join(' ')
    }

    if (key === "=") {
      if (b === "") {
        b = a;
      }

      switch (sign) {
        case "+":
          a = +a + +b;
          break;

        case "-":
          a = +a - +b;
          break;

        case "*":
          a = +a * +b;
          break;

        case "/":
          if (b === '0') {
            calcScreen.textContent = "Error";
            a = ''
            b = ''
            sign = ''
            return
          } else {
              a = a / b;
              break;
          }
      }

      finish = true;
      calcScreen.textContent = a;
    }
  });
});
