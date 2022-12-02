let historique = [];
const historiqueDisplay = () => {
  let displayHistorique = document.querySelector(".historique");
  if (displayHistorique.classList.contains("hide")) {
    displayHistorique.classList.remove("hide");
    displayHistorique.style.display = "block";
    displayHistorique.classList.add("show");
  } else {
    displayHistorique.classList.replace("show", "hide");
    setTimeout(() => {
      displayHistorique.style.display = "none";
    }, 400);
  }
};

let testCalc = false;

let inputContent = document.querySelector('#calcul')
let inputResult = document.querySelector('#result')
let btns = document.querySelectorAll('.btnP')
let startHistorique = document.querySelector('#startHistorique')
let centerHistorique = document.querySelector('#centerHistorique')
let endHistorique = document.querySelector('#endHistorique')
let historiqueContainer = document.querySelector('#historiqueContainer')

historiqueContainer.style.display = "none"

btns.forEach((myBtn) => {
  myBtn.addEventListener("click", (elt) => {
    if(testCalc == true) {
      inputContent.value = "";
      testCalc = false;
    }
    if (elt.target.id == "(") {
      if (inputContent.value && inputContent.value.includes("(")) {
        inputContent.value += ")";
      } else {
        inputContent.value += "(";
      }
    } else {
      inputContent.value += elt.target.id;
    }
    if (elt.target.id == "%") {
      inputResult.value = eval(inputContent.value.replace("%", "/100"));
    } else {
      inputResult.value = eval(inputContent.value);
    }
  });
});

const showCalcul = () => {
  inputResult.value = eval(inputContent.value)
  getHistorique()
  inputContent.value = inputResult.value;
  inputResult.value = "";
  testCalc = true;
};

const deleteElement = () =>{
  if (inputContent.value != "") {
    inputContent.value = inputContent.value.slice(0, -1)
    inputResult.value = inputResult.value.slice(0, -1)
}
};

const clearCalc = () => {
  inputContent.value = "";
  inputResult.value = "";
};

const getHistorique = () => {
  historique.push(inputContent.value + " = " + inputResult.value);
  if (historique.length > 3) {
    historique.shift();
  }
  historiqueContainer.style.display = "block";
  startHistorique.innerText = historique[0];
  if (historique[1] == undefined) {
    centerHistorique.innerText = "";
  } else {
    centerHistorique.innerText = historique[1];
  }
  if (historique[2] == undefined) {
    endHistorique.innerText = "";
  } else {
    endHistorique.innerText = historique[2];
  }
};


window.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== "Backspace") {
    let numbers = "0123456789+-/*().";
    if(numbers.includes(event.key)) {
      inputContent.value += event.key;
      inputResult.value = eval(inputContent.value);
    }
  } else if (event.key == "Enter") {
    showCalcul();
  } else if (event.key == "Backspace") {
    deleteElement();
  }
});