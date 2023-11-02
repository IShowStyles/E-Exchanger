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
  english: new RegExp(/^[aA-zZ]/),
  email: new RegExp(/^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/),
  date: new RegExp(/\//),
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
    let itemBtn = `<li><img src="${img}" alt="${val}"/><span>${text}</span></li>`;
    visibleSelectBtn.innerHTML = itemBtn;
    visibleSelectBtn.setAttribute('data-value', val);
    if (val !== undefined) {
      attrState.crypto = val;
    }

  });
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
    }

    if (num < 2) {
      document.querySelector(".swaper-promo").style.display = "block";
    }

    if (num === 1) {
      document.querySelector(".swaper-btn").style.display = "none";
      document.querySelector(".swaper-btn__deposit").style.display = "block";
    }

    if (num >= 2) document.querySelector(".swaper-btn").style.display = "none";

    if (num >= 2) {
      document.querySelector(".swaper-btn__deposit").style.display = "none";
    }

  })
}

const adressWallet = document.querySelector("#receive-adress");
const adressChain = document.querySelector("#receive-chain");
const usdCurrency = document.querySelector("#usd-receive");


const validDeposit = () => {
  if (!validateDeposit()) return false;
  if (validateDeposit()) count.nav++;
  usdCurrency.innerHTML = enteredVal.value;
  const attrAdressChain = attrState.crypto;
  if (attrAdressChain === "tether_trc-20") {
    adressWallet.innerHTML = `TFHi9StMrntGNsNoMc9zCFq2xeTUXLmPXy`;
    adressChain.innerHTML = `ТRС20`;
    document.querySelector("#chain").innerHTML = `ТRС20`;
  }
  if (attrAdressChain === "tether_erc-20") {
    adressWallet.innerHTML = `0x1B2A19F9423E01Dac515a0F3E0d570dB6680F22c`;
    adressChain.innerHTML = `ЕRC20`;
    document.querySelector("#chain").innerHTML = `ЕRC20`;
  }

  ChangeBlock();
}

const validBlock = () => {
  if (!removeClassDetails()) return false;
  if (removeClassDetails()) count.nav++;
  ChangeBlock();
}


const curValAPI = ["EURUSDT", "BUSDUSDT", "USDTUAH", "USDTRUB"];
let currRate = [];
const arrFetchCurrency = curValAPI.map(elem => fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${elem}`).then((response) => response.json()).then(data => data));
const listPromises = Promise.all(arrFetchCurrency)
  .then((resolve) => {
    currRate = resolve;
    document.querySelector(".preloader").style.display = "none";
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
  enteredVal.value = (val / percent).toFixed(2);
}

const infoRateSpan = document.querySelector(".swaper__available-num");

const infoRates = (fiat, value, currency) => {
  const rateStr = `1USDT - ${fiat.toFixed(2)}${value}`;
  infoRateSpan.innerHTML = rateStr.toUpperCase();
  if (value === "eur") {
    const rateStr = `1USDT - ${fiat.toFixed(3)}${value}`;
    infoRateSpan.innerHTML = rateStr.toUpperCase();
  }

}

function getRandom(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}


let reserved;
const generateReserved = (num) => {

  if (localStorage.getItem("reserv") === null || localStorage.getItem("reserv") === undefined) {
    localStorage.setItem("reserv", JSON.stringify(num));
  }

  addReserved();
};

const addReserved = () => {
  let lsReserv = JSON.parse(localStorage.getItem("reserv"));
  if (lsReserv === null) {
    generateReserved();
  }
  document.querySelector("#reserv").innerHTML = lsReserv;
}
setInterval(() => {
  const randomNum = getRandom(768, 8479);
  localStorage.removeItem('reserv');
  generateReserved(randomNum);
  addReserved();
}, 1000 * 4 * 4)


// setInterval(() => addReserved(), 1000 * 60 * 3);

const changeInputVal = (rate, val) => {
  val = "";
  val = rate * enteredVal.value;
}

async function rates(elem) {
  let data = [];
  data = await listPromises;
  const cardUah = +data[2].price * 1.04;
  const cardRub = +data[3].price * 1.07;
  const cardEur = +data[0].price * 1.04;
  const cardUsd = +data[1].price * 1.04;
  if (enteredVal.value.length === 0) outedVal.value = (70 * cardUsd).toFixed(2);
  outedVal.placeholder = (70 * cardUsd).toFixed(2);
  infoRateSpan.innerHTML = `1USDT - ${(+data[1].price + 0.04).toFixed(2)}USD`;
  enteredVal.addEventListener("input", (e) => inputChangeIn(cardUsd));
  Object.defineProperty(elem, "card", {
    set(val) {
      enteredVal.value = 70;
      if (val === "uah") {
        outedVal.value = (enteredVal.value * cardUah).toFixed(2);
        enteredVal.addEventListener("input", () => inputChangeIn(cardUah));
        outedVal.addEventListener("input", () => inputChangeOut(cardUah));
        infoRates(cardUah, val);
        changeInputVal(cardUah, outedVal.value);
      }

      if (val === "rub") {
        outedVal.value = (enteredVal.value * cardRub).toFixed(2);
        enteredVal.addEventListener("input", () => inputChangeIn(cardRub));
        outedVal.addEventListener("input", () => inputChangeOut(cardRub));
        infoRates(cardRub, val);
        changeInputVal(cardRub, outedVal.value);
      }

      if (val === "eur") {
        outedVal.value = (enteredVal.value * cardEur).toFixed(2);
        enteredVal.addEventListener("input", () => inputChangeIn(cardEur));
        outedVal.addEventListener("input", () => inputChangeOut(cardEur));
        infoRates(cardEur, val);
        changeInputVal(cardEur, outedVal.value);
      }

      if (val === "usd") {
        outedVal.value = (enteredVal.value * cardUsd).toFixed(2);
        enteredVal.addEventListener("input", () => inputChangeIn(cardUsd));
        outedVal.addEventListener("input", () => inputChangeOut(cardUsd));
        infoRates(cardUsd, val);
        changeInputVal(cardUsd, outedVal.value);
      }
    }
  });


}


const clearFields = (elem, numStr) => {
  return elem.value = elem.value.substring(0, numStr);
};

enteredVal.oninput = function () {
  clearFields(enteredVal, 8);
  this.value = this.value.replace(regexps.special, "");
  this.value = this.value.replace(/\D/, "");
  this.value = this.value.replace(/^0+/, "");
};

outedVal.oninput = function () {
  clearFields(outedVal, 14);
  this.value = this.value.replace(regexps.special, "");
  this.value = this.value.replace(/\D/, "");
  this.value = this.value.replace(/^0+/, "");
};

let config = {attributes: true, childList: false, characterData: false};
let observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {

    if (mutation.type === "attributes" && mutation.attributeName === "data-value") {
      attrState.crypto = document.querySelector("#btn-crypto").getAttribute(mutation.attributeName);
    }

  });
});

observer.observe(document.querySelector("#btn-crypto"), config);


const exchangeBlock = document.querySelector(".swaper-exchange");
const btnCard = document.querySelector("#card-btn");
const validateDetails = (elem, type) => {
  const fiatCurrency = ["eur", "usd", "rub", "uah"];
  const cryptoAttr = ["tether_trc-20", "tether_erc-20"];
  let valData = btnCard.getAttribute("data-value");
  let valCryptoData = attrState.crypto;
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
      }
      if (!elem.value.length) {
        errorArr.push(errors["emptyVal"]);
      }
      if (+elem.value < 70) {
        errorArr.push(errors["count"]);
      }
      break;
  }

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
    exchangeBlock.classList.add("required");
    return false;
  }

  error.classList.add("close")
  return true;
};

const email = document.querySelector("#deposit-email");
const card = document.querySelector("#deposit-card");
const cardName = document.querySelector("#deposit-name");
const arrDeposit = [email, card, cardName];

const depositFileds = document.querySelectorAll(".swaper-deposit__elem");
arrDeposit.forEach(elem => {

  elem.addEventListener("input", (evt => {
    const currField = evt.currentTarget;
    let currFieldValue = currField.value;
    const currFieldId = currField.id;
    switch (currFieldId) {
      case "deposit-email":
        clearFields(email, 35);
        break;
      case "deposit-card":
        clearFields(card, 16);
        break;
      case "deposit-name":
        clearFields(cardName, 35);
        break;
    }
  }))
});


const validateFieldDeposit = (val, type) => {
  card.oninput = function () {
    this.value = this.value.replace(/\D/, "");
  }

  const errorData = {
    email: "Введите корректный E-mail адрес",
    card: "Введите корректный номер кредитной Карты",
    name: "Введите имя Владельца Карты"
  };

  const errorDepArr = [];

  switch (type) {
    case "email":
      if (!regexps.email.test(val.value)) {
        errorDepArr.push(errorData.email);
        val.setAttribute("data-error", "true")
      }
      if (regexps.email.test(val.value) === true) {
        val.setAttribute("data-error", "false")
      }
      break;
    case "name":
      if (!regexps.english.test(val.value)) {
        errorDepArr.push(errorData.name);
        val.setAttribute("data-error", "true")
      }
      if (regexps.english.test(val.value) === true) {
        val.setAttribute("data-error", "false")
      }
      break;
    case "card":
      if (!regexps.nums.test(val.value)) {
        errorDepArr.push(errorData.card);
        val.setAttribute("data-error", "true")
      }
      if (regexps.nums.test(val.value) === true) {
        val.setAttribute("data-error", "false")
      }
      break;
    case "date":
      if (!regexps.date.test(val.value)) {
        errorDepArr.push(errorData.date);
        val.setAttribute("data-error", "true")
      }
      if (regexps.date.test(val.value) === true) {
        val.setAttribute("data-error", "false");
      }
      break;
  }

  return errorDepArr.reduce((acc, item) => acc + `<p>${item}</p><br/>`, "")
}

const errDeposit = document.querySelector(".swaper-deposit__errors");
const elemDeposit = document.querySelectorAll(".swaper-deposit__elem");

const validateDeposit = () => {
  let errStr = "";
  errDeposit.innerHTML = "";


  errStr += validateFieldDeposit(email, "email");
  errStr += validateFieldDeposit(cardName, "name");
  errStr += validateFieldDeposit(card, "card");

  elemDeposit.forEach(elem => {
    const inputElement = elem.querySelector("input");
    const errorData = inputElement.getAttribute("data-error");
    if (errorData === "false") {
      elem.classList.remove("required");
    }
    if (errorData === "true") {
      elem.classList.add("required");
    }
  })

  if (errStr.length) {
    errDeposit.innerHTML += errStr;
    errDeposit.classList.add("open");
    return false;
  }
  errDeposit.classList.remove("open");
  return true;

}

let dataTradeObj = [];

const saveTradeData = (arr) => {
  localStorage.setItem("trade", JSON.stringify(arr));
}

let cryptoNetwork = '';
let cryptoIn = '';
let fiatOut = '';
let fiatVal = '';

const swaperExchange = document.querySelector(".swaper-exchange");

function getDataFromTradeMenu() {

  let tmpObj = {
    network: "",
    cryptoVal: 0,
    cardNum: 0,
    typeFiat: ""
  }
  if (!swaperExchange.classList.contains("block-valid")) {
    return false;
  }

  if (swaperExchange.classList.contains("block-valid")) {
    cryptoNetwork = document.querySelector("#btn-crypto").getAttribute("data-value");
    cryptoIn = document.querySelector("#fiat-in").value;
    fiatOut = document.querySelector("#fiat-out").value;
    fiatVal = document.querySelector("#card-btn").getAttribute("data-value");
  }

  tmpObj["network"] = cryptoNetwork;
  tmpObj["cryptoVal"] = cryptoIn;
  tmpObj["cardNum"] = fiatOut;
  tmpObj["typeFiat"] = fiatVal;


  if (localStorage.getItem("trade") !== null) {
    const tmpLS = JSON.parse(localStorage.getItem("trade"));
    dataTradeObj = [...tmpLS, tmpObj]
  } else {
    dataTradeObj.push(tmpObj);
  }
  return dataTradeObj;

}


// console.log(JSON.parse(localStorage.getItem("trade")));

const templateTrade = ({network, cryptoVal, cardNum, typeFiat}) => {

  let fiatCard = ``;
  let networkCrypto = ``;
  if (typeFiat === "eur") {
    fiatCard = `Visa/MasterCar EUR`;
  }

  if (typeFiat === "rub") {
    fiatCard = `Visa/MasterCar RUB`;
  }

  if (typeFiat === "uah") {
    fiatCard = `Visa/MasterCar UAH`;
  }

  if (typeFiat === "usd") {
    fiatCard = `Visa/MasterCar USD`;
  }

  if (network === "tether_trc-20") {
    networkCrypto = "USDT TRC20";
  }

  if (network === "tether_erc-20") {
    networkCrypto = "USDT ERC20";
  }

  return `<div class="swaper-results__block-wrap">
  <div class="swaper-results__block-elem">
  <img class="swaper-results__block-img" width="20" height="20" src="assets/img/tether.png" alt="tether img">
  <span class="swaper-results__block-val" id="crypto-out">
    ${cryptoVal}
  </span>
  <p class="swaper-results__block-text uppperCase" id="crypto-network">
    ${networkCrypto}
  </p>
</div>
<div class="swaper-results__block-elem">
  <img class="swaper-results__block-img" width="20" height="20"src="assets/img/Mastercard.png" alt="card img">
  <span class="swaper-results__block-val" id="fiat-out">
    ${cardNum}
  </span>
  <p class="swaper-results__block-text" id="fiat-type">
   ${fiatCard}
  </p>
</div>
</div>`;

}


function renderDataFromTradeMenu() {

  let dataLS = JSON.parse(localStorage.getItem("trade"));

  if (dataLS === null) {
    document.querySelector(".swaper-trades__block").style.display = "flex";
  }


  let res = ``

  if (dataLS !== null) {
    document.querySelector(".swaper-trades__block-empty").style.display = "none";
    const arrData = JSON.parse(localStorage.getItem("trade"))
    let arrDataLegnth = arrData.length;
    for (let key in arrData) {
      let data = arrData[key];
      res += templateTrade(data);
    }
  }
  document.querySelector(".swaper-results").innerHTML = res;

}


const detailBtn = document.querySelector(".swaper-btn");
detailBtn.addEventListener("click", () => {
  if (!validBlock()) {
    return false;
  }
});

const depositBtn = document.querySelector(".swaper-btn__deposit");
depositBtn.addEventListener("click", () => validDeposit());

document.querySelector(".swaper-waiting__bottom-btn").addEventListener("click", () => {
  count.nav++
  ChangeBlock();
  localStorage.setItem("tradesVisible", JSON.stringify(true))
  let data = getDataFromTradeMenu();
  saveTradeData(data);
});

document.querySelector(".swaper-result__text").addEventListener("click", () => {
  document.location.reload();
})

document.querySelector(".swaper-trades__top-add").addEventListener("click", () => {
  document.location.reload();
})

rates(attrState);


//date
const date = new Date();
let year = date.getFullYear();
document.querySelector('.footer-copyrights__text > span').innerHTML = year;


const tradeBurger = document.querySelector(".swaper-trade__burger-wrap");
const trades = document.querySelector(".swaper-trades");

tradeBurger.onclick = () => {
  trades.style.display = "block";
  document.querySelector(".swaper-exchange").style.display = "none";
  document.querySelector(".swaper-list").style.display = "none";
  document.querySelector(".swaper-promo").style.display = "none";
  document.querySelector(".swaper-promo").style.display = "none";
  document.querySelector(".swaper__available").style.display = "none";
  document.querySelector(".swaper-deposit").style.display = "none";
  document.querySelector(".swaper-trade").style.display = "none";
  document.querySelector(".swaper-btn").style.display = "none";
  document.querySelector(".swaper-waiting").style.display = "none";
  document.querySelector(".swaper-result").style.display = "none";
  document.querySelector("#trades").style.display = "block";
  document.querySelector(".swaper-btn__deposit").style.display = "none";
  if (JSON.parse(localStorage.getItem("trades")) === null) document.querySelector(".swaper-results").style.display = "block";
  renderDataFromTradeMenu();
};

const setFlagVisible = () => {
  if (JSON.stringify(localStorage.getItem("trades")) === null || JSON.stringify(localStorage.getItem("trades")) === undefined) {
    localStorage.setItem("tradesVisible", JSON.stringify(false))
  }
}


document.querySelector(".swaper-trades__top-close").onclick = () => displayTradeMenu();
document.querySelector(".swaper-trades__top-back").onclick = () => displayTradeMenu();

function displayTradeMenu() {
  trades.style.display = "none";
  document.querySelector(".swaper-exchange").style.display = "";
  document.querySelector(".swaper-list").style.display = "";
  document.querySelector(".swaper-promo").style.display = "";
  document.querySelector(".swaper-deposit").style.display = "";
  document.querySelector(".swaper__available").style.display = "";
  document.querySelector(".swaper-trade").style.display = "";
  document.querySelector(".swaper-btn").style.display = "";
  document.querySelector(".swaper-result").style.display = "";
  document.querySelector(".swaper-waiting").style.display = "";
  document.querySelector(".swaper-btn__deposit").style.display = "";
  document.querySelector("#trades").style.display = "none";
  if (count.nav >= 2) {
    document.querySelector(".swaper-btn").style.display = "none";
    document.querySelector(".swaper-promo").style.display = "none";
  }

  if (count.nav >= 1) {
    document.querySelector(".swaper__available").style.display = "none";
  }

  if (count.nav >= 3) {
    document.querySelector(".swaper-btn__deposit").style.display = "none";
  }

}

const visibleMenu = () => {
  const lsIsVisible = JSON.parse(localStorage.getItem("tradesVisible"));


  if (lsIsVisible === false) {
    document.querySelector(".swaper-trades__block-empty").style.display = "block"
    document.querySelector(".swaper-results").style.display = "none"
  }
  if (lsIsVisible === true) {
    document.querySelector(".swaper-results").style.display = "block"
    document.querySelector(".swaper-trades__block-empty").style.display = "none"
  }
}

window.onload = () => {
  let reservTmp = getRandom(768, 8479)
  if (localStorage.getItem("trade") !== null) {
    generateReserved(reservTmp);
  }


  if (localStorage.getItem("trade") === null) {
    const firstRender = getRandom(768, 8479);
    document.querySelector("#reserv").innerHTML = firstRender;
    generateReserved(firstRender);
  }
  visibleMenu();
};
