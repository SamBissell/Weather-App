'use strict'

const mainInput = document.getElementById("zip-input")
const addButton = document.getElementById("add");
const tempUnitButton = document.getElementById("temp-unit");
const root = document.getElementById("root");

let list = [];
let isFaren = true;

const changeTempUnit = function () {
  // getUnits();
  isFaren = isFaren ? false : true;
  tempUnitButton.textContent = (isFaren ? "F" : "C");
}

// F to C
const convertFtoC = (temp) => {
  let newTemp = Math.floor((temp - 32) / 1.8);
  return newTemp;
}

// C to F 
const convertCtoF = (temp) => {
  let newTemp = Math.floor((temp * 1.8) + 32);
  return newTemp;
}

// loop through array and send each temp property through the changer function
const convertTemps = function () {
  // converting between F and C
  if (isFaren) {
    for (let i = 0; i <= list.length - 1; i++) {
      list[i].temp = convertFtoC(list[i].temp);
      list[i].tempLo = convertFtoC(list[i].tempLo);
      list[i].tempHi = convertFtoC(list[i].tempHi);
    };
  } else {
    for (let i = 0; i <= list.length - 1; i++) {
      list[i].temp = convertCtoF(list[i].temp);
      list[i].tempLo = convertCtoF(list[i].tempLo);
      list[i].tempHi = convertCtoF(list[i].tempHi);
    };
  };
  // changeTempUnit();
};

const clearDisplay = () => {
  // clear the elements displayed
  while (root.lastChild) {
    root.removeChild(root.lastChild);
  }
}

const getTargetIndex = (e) => {
  let targetElement = e.target.closest(".card");
  let targetId = parseInt(targetElement.id);
  let targetIndex = list.findIndex(x => x.id === targetId);
  return targetIndex;
}

const getTargetElement = (e) => {
  let targetElement = e.target.closest(".card");
  return targetElement;
}

const deleteElement = (e) => {
  let myTarget = getTargetIndex(e)
  console.log(myTarget);
  list.splice(myTarget, 1);
  console.log(list);
  renderList()
  // console.log(list);
};

// const deleteElement = (e) => {
//   e.preventDefault()
//   let targetCard = e.target.closest(".card");

//   let targetIndex = (targetCard.id - 1);

//   targetCard.remove();

//   list.splice(targetIndex, 1);
// }

const printList = () => {
  // loop through array, adding elements for each index
  for (let i = 0; i <= list.length - 1; i++) {

    // create elements
    let elCard = document.createElement("div");
    let elCity = document.createElement("h1");
    let elTempHolder = document.createElement("div")
    let elTemp = document.createElement("h1");
    let elTempLo = document.createElement("h3");
    let elTempHi = document.createElement("h3");
    let elWeather = document.createElement("h1");
    let elDelete = document.createElement("div");

    // Text for city, weather, high/low temp, conditions would be added here via a tect COntent 
    elCity.textContent = `${list[i].city}`
    elTemp.textContent = `${list[i].temp}`;
    elTempLo.textContent = `${list[i].tempLo}`;
    elTempHi.textContent = `${list[i].tempHi}`;
    elWeather.textContent = ` ${list[i].weather}`;

    // add classes
    elCard.classList.add("card");
    elCity.classList.add("city");
    elTempHolder.classList.add("temp-holder");
    elTemp.classList.add("temp");
    elTempLo.classList.add("temp-lo");
    elTempHi.classList.add("temp-hi");
    elWeather.classList.add("weather-info");
    elDelete.classList.add("delete-btn");
    elCard.id = `${list[i].id}`;

    elDelete.addEventListener("click", deleteElement);

    elCard.appendChild(elDelete)
    elCard.appendChild(elCity)
    elCard.appendChild(elTempHolder)
    elTempHolder.appendChild(elTempLo)
    elTempHolder.appendChild(elTemp)
    elTempHolder.appendChild(elTempHi)
    elCard.appendChild(elWeather)
    root.appendChild(elCard);
  }
}

// Kelvin to F /C
const convertKToFarenheit = (temp) => {
  let tempFar = Math.floor(1.8 * (temp - 273.15) + 32);
  return tempFar;
};

const convertKToCelsius = (temp) => {
  let tempFar = Math.floor(temp - 273.15);
  return tempFar;
};

//  K to F/C for constructor
// minimized version
const convertTempsFromK = function (temp) {
  if (isFaren) {
    let tempF = convertKToFarenheit(temp);
    return tempF
  } if (!isFaren) {
    let tempC = convertKToCelsius(temp);
    return tempC
  }
}

const renderList = () => {
  clearDisplay();
  printList();
}

// API CALL
async function getWeatherData() {

  let zip = mainInput.value;
  const apiKey = "b45954231b752db8c98eac867c8c3bc1";
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`

  let response = await fetch(url)
  let data = await response.json()

  return data;
  // const objz = JSON.parse(data);

}

// process data into object
class WeatherDataObject {
  constructor(data) {
    this.id = Date.now();
    this.city = data.name;
    this.temp = convertTempsFromK(data.main.temp);
    this.tempHi = convertTempsFromK(data.main.temp_max);
    this.tempLo = convertTempsFromK(data.main.temp_min);
    this.weather = data.weather[0].main;
  }

  // add to list
  addToList() {
    list.push(this);
  }
}

addButton.addEventListener("click", function (e) {
  getWeatherData().then((data) => {
    const newObj = new WeatherDataObject(data);
    newObj.addToList();
    renderList();
  });
});

tempUnitButton.addEventListener("click", function () {
  convertTemps();
  renderList();
  changeTempUnit();
});
