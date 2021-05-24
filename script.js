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
  console.log(isFaren);

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

const deleteElement = (e) => {
  e.preventDefault()

  let targetCard = e.target.closest(".card");
  let targetIndex = (targetCard.id - 1);

  targetCard.remove();

  list.splice(targetIndex, 1);
  // console.log(list);
}
// **********
// **********
// **********
// **********
// EDIT FUNCTION

// const editElement = (e) => {
//   e.preventDefault()

//   // identify card and list index
//   let targetCard = e.target.closest(".card");
//   let targetIndex = (targetCard.id - 1);

//   // changing the list data

//   // ************
//   // ************
//   // ************
//   // provide html with a form to enter new information
//   let elEditModal = document.createElement("div");
//   let elEditInput = document.createElement("input");
//   let elEditConfirm = document.createElement("button");

//   elEditConfirm.textContent = "Confirm Change"
//   elEditModal.classList.add("edit-modal");
//   elEditInput.classList.add("zip-input");
//   elEditConfirm.classList.add("edit-confirm");

//   elEditModal.appendChild(elEditInput)
//   elEditModal.appendChild(elEditConfirm)
//   targetCard.appendChild(elEditModal)

//   const userData = function () {

//     let newZip = elEditInput.value;

//     // new data is used in an API call
//     // data from API call is passed into the edisting

//     list[targetIndex].item = newZip;
//     // view is rendered again
//     renderList();
//   }



//   elEditConfirm.addEventListener("click", userData)

// }

const printList = () => {
  // loop through array, adding elements for each index
  for (let i = 0; i <= list.length - 1; i++) {
    // Change this to add a more elaborate HTML element which can be uniquely identified
    // const x = create element 
    // x.classlist.add class
    // parent.appendChild(element)
    // element.addeventlistener
    // root.appendchild.parent

    // create elements
    let elCard = document.createElement("div");
    let elCity = document.createElement("h1");
    let elTempHolder = document.createElement("div")
    let elTemp = document.createElement("h1");
    let elTempLo = document.createElement("h3");
    let elTempHi = document.createElement("h3");
    let elWeather = document.createElement("h1");
    let elDelete = document.createElement("div");

    // let elEdit = document.createElement("div");

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
    // elEdit.classList.add("edit-btn");
    elCard.id = `${list[i].id}`;

    elDelete.addEventListener("click", deleteElement);
    // elEdit.addEventListener("click", editElement);



    elCard.appendChild(elDelete)
    elCard.appendChild(elCity)
    elCard.appendChild(elTempHolder)
    elTempHolder.appendChild(elTempLo)
    elTempHolder.appendChild(elTemp)
    elTempHolder.appendChild(elTempHi)
    elCard.appendChild(elWeather)

    // elCard.appendChild(elEdit)
    root.appendChild(elCard);
  }
}






// const convertTemps = function () {
//   if (isFaren = true) {
//     for (let i = 0; i <= list.length - 1; i++) {
//       list[i].temp = convertKToFarenheit(list[i].temp);
//       list[i].tempLo = convertKToFarenheit(list[i].tempLo);
//       list[i].tempHi = convertKToFarenheit(list[i].tempHi);
//     }
//   } else { }
//   for (let i = 0; i <= list.length - 1; i++) {
//     list[i].temp = convertKToCelsius(list[i].temp);
//     list[i].tempLo = convertKToCelsius(list[i].tempLo);
//     list[i].tempHi = convertKToCelsius(list[i].tempHi);
//   }
// }
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
  // convertTemps();
  printList();
  console.log("rendered");
}




// ************
// ************
// ************
// Add editing function: Click on a forecast and edit the infomration in that list[{object}], then re-render the list




// API CALL
// getting the data from the api
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
    // ************
    // ************
    // ************
    // Change this to include more weather information
    this.id = list.length + 1;
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


// the action of getting and storing the data itself
// getWeatherData().then((data) => helper(data));




// getWeatherData().then((data) => {
//   const newObj = new WeatherDataObject(data);
//   newObj.addToList();
//   // list.push(data);
//   console.log(list);
//   console.log(newObj);
// });

addButton.addEventListener("click", function (e) {
  getWeatherData().then((data) => {
    const newObj = new WeatherDataObject(data);
    newObj.addToList();
    console.log(list);
    renderList();
  });
});

tempUnitButton.addEventListener("click", function () {

  convertTemps();
  renderList();
  changeTempUnit();
});



// ************
// ************
// ************
// Refactor API call so that it's fed zip code from input field nearest to the button clicked
