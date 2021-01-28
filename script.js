

let body = document.querySelector('body')
let searchTextButton = document.querySelector(".search-text-submit")
let searchTextField = document.querySelector(".search-text-field")
let searchedCity = ''
let cityName


let container = document.querySelector(".container")
let textColumn1 = document.querySelector(".text-column-1")

let currentWeatherSection = document.querySelector(".current-weather-section")
let displayedCityName = document.querySelector(".city-name")


searchTextButton.addEventListener("click", function (event) {
    event.preventDefault()
    let cityName = searchTextField.value
    searchedCity = document.createElement('p')
    searchedCity.setAttribute("style", "font-weight: bold; text-align: center;")
    searchedCity.textContent = cityName
   textColumn1.appendChild(searchedCity) /// i need to append this to a different place
    saveCities()
    console.log(searchedCity.textContent)
    myWeather()
})

let saveCities = function () {
    localStorage.setItem(searchedCity.textContent, searchedCity.textContent) ///minor hack to getting the local storage to be set properly .textContent
}

let loadCities = function () {
    let cityText = JSON.stringify(localStorage)
    return cityText.replace(/[{}:"",]/gi, '');
}

let mySearchedCities = document.createElement('p')
mySearchedCities.setAttribute("style", "font-weight: bold; text-align: center;")
mySearchedCities.textContent = loadCities()
textColumn1.appendChild(mySearchedCities)
////maybe make a grid to display the value of loadCities

//searchedCity.values = loadCities()
let apiKey = "43ec9b071b79e32f1a5fb7f0d1a5d468"

//api endpoint --> api.openweathermap.org
let getCurrentWeather = function (argument) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
    argument +
    "&appid=" +
    apiKey +
    "&units=imperial"
    )
    .then(function (response) {
        return response.json()
    })
}

//`https://api.openweathermap.org/data/2.5/weather?q=Portland&appid=${apiKey}`
//`https://api.openweathermap.org/data/2.5/weather?q=Portland&appid=43ec9b071b79e32f1a5fb7f0d1a5d468`


let myWeather = function () {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.textContent}&appid=${apiKey}&units=imperial`
      )
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data);
          let myCityName = document.createElement('p')
          myCityName.textContent = searchedCity.textContent
          displayedCityName.appendChild(myCityName)

          let temperature = document.createElement('p')
          temperature.textContent = `Temperature: ${data.main.temp}ºf`
          displayedCityName.appendChild(temperature)

          let humidity = document.createElement('p')
          humidity.textContent = `Humidity: ${data.main.humidity}`
          displayedCityName.appendChild(humidity)

          let windSpeed = document.createElement('p')
          windSpeed.textContent = `Wind Speed: ${data.wind.speed}`
          displayedCityName.appendChild(windSpeed)


            ///need to fix this and find the proper UV index property
          let uvIndex = document.createElement('p')
          uvIndex.textContent = `UV Index: ${data.current.uvi}`
          displayedCityName.appendChild(uvIndex)

         // receiveCurrentWeather() ///may need to call a receiveCurrentWeather function here
        });
}

//myWeather()

//let receiveCurrentWeather = function () {
   // let myCityName = document.createElement('p')
   // myCityName.textContent = searchedCity.textContent
  //  displayedCityName.appendChild(myCityName)

   // displayedCityName.textContent= searchedCity.textContent
   // console.log(displayedCityName)
//}

//receiveCurrentWeather()