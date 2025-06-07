const dropdownS = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const inpAmt = document.getElementById("amountInput");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const apiKey =
  "2oKvrg87AXO4LLZSydA24LY9IJAKZATXydfZWG87sBkFdoVXb7mL12eQlQxlpHDp";
const para = document.getElementById("result");

window.addEventListener('load',()=>{
updateCurrencyValue();
})
for (let select of dropdownS) {
  for (currCodes in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCodes;
    newOption.value = currCodes;
    select.append(newOption);
    if (select.name == "from" && currCodes == "USD") {
      newOption.selected = "selected";
    } else if (select.name == "to" && currCodes == "INR") {
      newOption.selected = "selected";
    }
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

function updateFlag(element) {
  let currCode = element.value;
  newSrc = `https://flagsapi.com/${countryList[currCode]}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  calculate();
});

async function calculate() {
  let amt = inpAmt.value;
  if (amt == "" || amt <= 0) {
    inpAmt.value = 1;
    amt = 1;
  }
  updateCurrencyValue(amt);
  
}

async function updateCurrencyValue(){
   let amt = inpAmt.value;
  const from = fromCurr.value;
  const to = toCurr.value;
  const url = `https://api.unirateapi.com/api/convert?api_key=${apiKey}&amount=1&from=${from}&to=${to}`;

  const response = await fetch(url);
  const data = await response.json();
  let exchRate = data.result;
  const finalAmount = exchRate * amt;

  para.innerText=`${amt} ${from} = ${finalAmount} ${to}`;
}
