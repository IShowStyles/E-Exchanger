const promoBlock = document.querySelector(".swaper-promo__visible");
const promoInput = document.querySelector(".swaper-promo__input");
const dropdownHead = document.querySelector(".swaper-exchange__dropdown-head");
const dropdownBody = document.querySelector(".swaper-exchange__dropdown-inner");
const dropdown = document.querySelector(".lang-select");
const dropdownElems = document.querySelectorAll(".swaper-exchange__elem-currency");
const dropArray = [dropdownHead, ...dropdownElems];
//swaper
promoBlock.onclick = () => {
  promoInput.classList.toggle("open");
};

let attrState = {
  card: ``,
  crypto: ``
};

const regexps = {
  cyrillic: new RegExp(/^[\s\u0400-\u04FF]+$/),
  special: new RegExp(/[-+!_@*^:"()\\]/),
  nums: new RegExp(/^[0-9]+$/),
  english: new RegExp(/^[a-zA-Z?><;,{}[\]\-_+=!@#$%\^&*|']*$/),
  email: new RegExp(/^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)
};


dropdown.addEventListener("click", () => {
  dropdown.classList.toggle("is-active");
})

// fiat dropdown  //
let dropdownFiat = document.querySelector(".swaper-exchange__card-list");

dropdownFiat.addEventListener("click", () => {
  dropdownFiat.classList.toggle("is-active");
})


const selectFiat = document.querySelectorAll(".master__picker > option");
const visibleSelectFiat = document.querySelector(".swaper-exchange__card-list");
let fiatArr = [];
selectFiat.forEach(elem => {
  const img = elem.getAttribute("data-value");
  const text = elem.innerHTML;
  const optVal = elem.value;
  const item = '<li data-value="' + optVal + '"><img width="25" height="25" src="' + img + '" alt="' + optVal + '"/><span>' + text + '</span></li>';
  fiatArr.push(item);
})

fiatArr.forEach(item => {
  visibleSelectFiat.innerHTML += item;
})
const fiatVisibleBtn = document.querySelector(".swaper-exchange__card-btn");
fiatVisibleBtn.innerHTML = fiatArr[0];
fiatVisibleBtn.setAttribute('value', 'master');
const cardVisibleSelectElem = document.querySelectorAll("#b > li");
cardVisibleSelectElem.forEach(elem => {
  elem.addEventListener("click", (e) => {
    const current = e.currentTarget;
    const img = current.querySelector('img').src;
    let val = current.getAttribute("data-value");
    const text = current.innerText;
    let itemBtn = `<li><img src="${img}" alt="${val}"/><span>${text}</span></li>`;
    fiatVisibleBtn.innerHTML = itemBtn;
    fiatVisibleBtn.setAttribute('data-value', val);
    if (val !== undefined) {
      attrState.card = current.getAttribute("data-value");
    }
  })
});


document.querySelector(".swaper-exchange__card-select").onclick = () => {
  visibleSelectFiat.firstElementChild.style.display = "none";
  document.querySelector(".swaper-exchange__card-wrap").classList.toggle("open");
  fiatVisibleBtn.classList.add("active-btn");
  fiatVisibleBtn.classList.toggle("active-chevron");
};

//    currencyDrop    //
let currencyArr = [];
const select = document.querySelectorAll(".vodiapicker > option");
const visibleSelect = document.querySelector("#a");
const visibleSelectBtn = document.querySelector(".btn-select");
const visibleSelectBlock = document.querySelector(".b");


select.forEach(elem => {
  const img = elem.getAttribute("data-value");
  const text = elem.innerHTML;
  const optVal = elem.value;
  const item = '<li data-value="' + optVal + '"><img width="25" height="25" src="' + img + '" alt="' + optVal + '"/><span>' + text + '</span></li>';
  currencyArr.push(item);
})


currencyArr.forEach(item => {
  visibleSelect.innerHTML += item;
})
visibleSelectBtn.innerHTML = currencyArr[0];
visibleSelectBtn.setAttribute('value', 'tether');


const visibleSelectElem = document.querySelectorAll("#a > li");

visibleSelectElem.forEach(elem => {
  elem.addEventListener("click", (e) => {
    const current = e.currentTarget;
    const img = current.querySelector('img').src;
    const val = current.getAttribute("data-value");
    const text = current.innerText;
    console.log(text, val, img);
    let itemBtn = `<li><img src="${img}" alt="${val}"/><span>${text}</span></li>`;
    visibleSelectBtn.innerHTML = itemBtn;
    visibleSelectBtn.setAttribute('data-value', val);

  })
});

//
document.querySelector(".lang-select").onclick = () => {
  visibleSelect.firstElementChild.style.display = "none";
  visibleSelectBlock.classList.toggle("open");
  visibleSelectBtn.classList.add("active-btn");
  visibleSelectBtn.classList.toggle("active-chevron");
};


//sliding Block`s
const navElem = document.querySelectorAll('.swaper-list li');
const innerBlock = document.querySelectorAll('.swaper-inner > .block');
let count = {
  nav: 0,
  cards: 0
}
const removeClass = (block, classrem) => {
  block.forEach(el => {
    el.classList.contains(classrem) ? el.classList.remove(classrem) : null;
  })
}

const ChangeBlock = () => {
  let num = count.nav;
  let prevIndex = count.nav - 1;

  removeClass(innerBlock, "block-flex")
  innerBlock.forEach((el, index) => {
    el.classList.add("block-valid");

    if (num === index) {
      el.classList.add("block-flex");
    }

    if (num === 1 || num <= 3) {  //&& num <= 1
      document.querySelector(".swaper__available").style.display = "none";
    }
    if (num < 1) {
      document.querySelector(".swaper__available").style.display = "block";
    }
    if (num === 2 && num <= 2 || num <= 3) {
      document.querySelector(".swaper-promo").style.display = "none";
      document.querySelector(".swaper-btn").style.display = "none";
    }
    if (num < 2) {
      document.querySelector(".swaper-promo").style.display = "block";
      document.querySelector(".swaper-btn").style.display = "block";
    }
  })
}
//
const validBlock = () => {
  if (!removeClassDetails()) return false;
  if (removeClassDetails()) count.nav++;
  ChangeBlock();
}
//change func for validate
// document.addEventListener('DOMContentLoaded', () =>changeBlock() )


//menu
const burger = document.querySelector(".header-top__burger");
const mobileMenu = document.querySelector(".header-top__menu-list");


burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('menu--active');
  if (mobileMenu.classList.contains('menu--active')) {
    burger.classList.add('burger--active');
  } else {
    ю
    burger.classList.remove('burger--active');
  }
  setTimeout(() => {
    burger.classList.remove('burger--active');
  }, 2500)
});

//currency rate

const curValAPI = ["EURUSDT", "BUSDUSDT", "USDTUAH", "USDTRUB"];
let currRate = [];
const arrFetchCurrency = curValAPI.map(elem => fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${elem}`).then((response) => response.json()).then(data => data));
const listPromises = Promise.all(arrFetchCurrency)
  .then((resolve) => {
    currRate = resolve;
    return currRate;
  })
  .catch(error => {
    console.error(error)
  });


const enteredVal = document.querySelector("#fiat-in");
const outedVal = document.querySelector("#fiat-out");
const currentVal = document.querySelector(".swaper-exchange__card-btn");


function inputChangeIn(percent) {
  let val = +enteredVal.value;
  if (enteredVal.value === " " || val.length === 0) outedVal.value = (70 * percent).toFixed(2)
  outedVal.value = (val * percent).toFixed(2);

}

function inputChangeOut(percent) {
  let val = +outedVal.value;
  console.log(percent)
  enteredVal.value = (val / percent).toFixed(2);
}

const infoRateSpan = document.querySelector(".swaper__available-num");

const infoRates = (fiat, value) => {
  infoRateSpan.innerHTML = `1USDT - ${fiat.toFixed(2)}${value}`
}

async function rates(elem) {
  let data = [];
  data = await listPromises;
  const cardUah = +data[2].price * 1.04;
  const cardRub = +data[3].price * 1.07;
  const cardEur = +data[0].price * 1.03;
  const cardUsd = +data[1].price * 1.04;
  if (enteredVal.value.length === 0) outedVal.placeholder = (70 * cardUsd).toFixed(2);
  outedVal.placeholder = (70 * cardUsd).toFixed(2);
  infoRateSpan.innerHTML = `1USDT - ${(+data[1].price + 0.04).toFixed(2)}USD`;
  enteredVal.addEventListener("input", (e) => inputChangeIn(cardUsd));
  Object.defineProperty(elem, "card", {
    set(val) {
      if (val === "uah") {
        outedVal.value = (enteredVal.value * cardUah).toFixed(2);
        enteredVal.addEventListener("input", () => inputChangeIn(cardUah));
        outedVal.addEventListener("input", () => inputChangeOut(cardUah));
        infoRates(cardUah, val);
      }

      if (val === "rub") {
        outedVal.value = (enteredVal.value * cardRub).toFixed(2);
        enteredVal.addEventListener("input", () => inputChangeIn(cardRub));
        outedVal.addEventListener("input", () => inputChangeOut(cardRub));
        infoRates(cardRub, val);
      }

      if (val === "eur") {
        console.log(cardEur)
        outedVal.value = (enteredVal.value * cardEur).toFixed(2);
        enteredVal.addEventListener("input", () => inputChangeIn(cardEur));
        outedVal.addEventListener("input", () => inputChangeOut(cardEur));
        infoRates(cardEur, val);
      }

      if (val === "usd") {
        outedVal.value = (enteredVal.value * cardUsd).toFixed(2);
        enteredVal.addEventListener("input", () => inputChangeIn(cardUsd));
        outedVal.addEventListener("input", () => inputChangeOut(cardUsd));
        infoRates(cardUsd, val);
      }
    }
  });
}

const clearFields = (elem, numStr) => {
  elem.value = elem.value.substring(0, numStr);
};

enteredVal.oninput = function () {
  clearFields(enteredVal, 8);
  this.value = this.value.replace(regexps.special, "");
  this.value = this.value.replace(/\D/, "");
};

outedVal.oninput = function () {
  clearFields(outedVal, 14);
  this.value = this.value.replace(regexps.special, "");
  this.value = this.value.replace(/\D/, "");
};


const exchangeBlock = document.querySelector(".swaper-exchange");
const btnCard = document.querySelector("#card-btn");
const validateDetails = (elem, type) => {
  const fiatCurrency = ["eur", "usd", "rub", "uah"];
  const cryptoAttr = ["tether_trc-20", "tether_bep-20"];
  let valData = btnCard.getAttribute("data-value");
  let valCryptoData = document.querySelector("#btn-crypto").getAttribute("data-value");
  const errors = {
    count: "Минимальная сумма перевода 70$!",
    emptyVal: "Введите сумму для перевода!",
    trade: [
      "Выберете Сеть Tether!",
      "Выберете карту для пополнения!"
    ]
  };
  let errorArr = [];

  switch (type) {
    case "card":
      if (!fiatCurrency.includes(valData)) {
        errorArr.push(errors["trade"][1]);
      }
      break;
    case "crypto":
      if (!cryptoAttr.includes(valCryptoData)) {
        errorArr.push(errors["trade"][0]);
        console.log(true)
      }
      if (!elem.value.length) {
        errorArr.push(errors["emptyVal"]);
      }
      if (+elem.value < 70) {
        errorArr.push(errors["count"]);
      }
      break;
  }


  console.log(errorArr)

  return errorArr.reduce((acc, item) => acc + `<p>${item}</p>  `, "");
};


const error = document.querySelector(".swaper-exchange__errors");

const removeClassDetails = () => {
  let resultStr = "";
  error.innerHTML = "";

  resultStr += validateDetails(enteredVal, "crypto");
  resultStr += validateDetails(outedVal, "card");


  if (resultStr.length) {
    error.innerHTML += resultStr;
    error.classList.add("open")
    return false;
  }

  error.classList.add("close")
  return true;
};

const email = document.querySelector("#deposit-email");
const card = document.querySelector("#deposit-card");
const cardName = document.querySelector("#deposit-name");
const cardDate = document.querySelector("#deposit-date");
const arrDeposit = [email, card, cardName, cardDate];

console.log(typeof email)
const depositFileds  = document.querySelectorAll(".swaper-deposit__elem");
const validateFieldDeposit = () => {
  card.oninput = function () {
    this.value = this.value.replace(/\D/, "");
  }

  const errorData = {
    email: "Введите корректный E-mail адрес",
    card: "Введите корректный номер кредитной карты",
    name: "Введите имя Владельца карты",
    data: "Введите корректную информацию об кредитной карты"
  };

  const errorArr = [];

  arrDeposit.forEach(elem => {
    console.log(elem)

    elem.addEventListener("input", (evt => {
      const currField = evt.currentTarget;
      let currFieldValue = currField.value;
      const currFieldId = currField.id;
      switch (currFieldId) {
        case  "deposit-email":
          clearFields(email, 28);
          if (!regexps.email.test(currFieldValue)) {
            errorArr.push(errorData.email);
          }
          break;
        case  "deposit-card":
          clearFields(card, 16);
          if (!regexps.nums.test(currFieldValue)) {
            errorArr.push(errorData.card);
          }
          break;

        case  "deposit-name":
          clearFields(cardName, 35);
          if (!regexps.english.test(currFieldValue)) {
            errorArr.push(errorData.name);
          }
          break;

        case  "deposit-date":
          clearFields(cardDate, 7);
          break;
      }
    }))
  })
  return errorArr.reduce((acc,item)=> acc + `<p>${item}</p><br/>`,"")
}

const validateDeposit=()=>{
  if(!depositFileds.value.length) {
    depositFileds.classList.add("required");
    return false;
  }
 const errorHTML = validateFieldDeposit();
  console.log(errorHTML)
}


const depositBtn = document.querySelector(".swaper-btn");
depositBtn.addEventListener("click", (e) => {
  if (!validBlock()){
    return false;
  }
  validateDeposit();
});


rates(attrState);


// document.querySelector("#reserv").innerHTML = Math.

//date
const date = new Date();
let year = date.getFullYear();
document.querySelector('.footer-copyrights__text > span').innerHTML = year;
