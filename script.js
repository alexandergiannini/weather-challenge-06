

let body = document.querySelector('body')
let searchTextButton = document.querySelector(".search-text-submit")
let searchTextField = document.querySelector(".search-text-field")
let searchedCity = ''
let cityName


let container = document.querySelector(".container")
let textColumn1 = document.querySelector(".text-column-1")

let currentWeatherSection = document.querySelector(".current-weather-section")
let displayedCityName = document.querySelector(".city-name")

let currentDay = moment().format('MM/DD/YYYY')
let tomorrow = moment().add(1,'days').format('MM/DD/YYYY')
let twoDays = moment().add(2,'days').format('MM/DD/YYYY')
let threeDays = moment().add(3,'days').format('MM/DD/YYYY')
let fourDays = moment().add(4,'days').format('MM/DD/YYYY')
let fiveDays = moment().add(5,'days').format('MM/DD/YYYY')

let fiveDayWeatherSection = document.querySelector(".five-day-weather-section")

///declare global variables for each date from 5 days from now!!

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
    fiveDayWeather()
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
          temperature.textContent = `Temperature: ${data.main.temp}ºf (${currentDay})`
          displayedCityName.appendChild(temperature)

          let humidity = document.createElement('p')
          humidity.textContent = `Humidity: ${data.main.humidity}%` ///need to fix humidity
          displayedCityName.appendChild(humidity)

          let windSpeed = document.createElement('p')
          windSpeed.textContent = `Wind Speed: ${data.wind.speed} MPH`
          displayedCityName.appendChild(windSpeed)


            ///need to fix this and find the proper UV index property
          let uvIndex = document.createElement('p')
          uvIndex.textContent = `UV Index: ${data.current.uvi}`
          displayedCityName.appendChild(uvIndex)

         // receiveCurrentWeather() ///may need to call a receiveCurrentWeather function here
        });
}

let fiveDayWeather = function () {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity.textContent}&appid=${apiKey}&units=imperial`
    )
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)

        let tomorrowDate = document.createElement('p')
        tomorrowDate.textContent = tomorrow //`${data.list[6].dt_txt}`
        tomorrowDate.setAttribute('style', 'font-weight: bold; text-decoration: underline;')
        fiveDayWeatherSection.appendChild(tomorrowDate)

        let tomorrowTemp = document.createElement('p')
        tomorrowTemp.textContent = `Temp: ${data.list[6].main.temp} ºf`
        fiveDayWeatherSection.appendChild(tomorrowTemp)

        let tomorrowHumidity = document.createElement('p')
        tomorrowHumidity.textContent = `Humidity: ${data.list[6].main.humidity} %`
        fiveDayWeatherSection.appendChild(tomorrowHumidity)



        let twoDaysFromNowDate = document.createElement('p')
        twoDaysFromNowDate.textContent = twoDays//`${data.list[14].dt_txt}`
        twoDaysFromNowDate.setAttribute('style', 'font-weight: bold; text-decoration: underline;')
        fiveDayWeatherSection.appendChild(twoDaysFromNowDate)

        let twoDaysFromNowTemp = document.createElement('p')
        twoDaysFromNowTemp.textContent = `Temp: ${data.list[14].main.temp} ºf`
        fiveDayWeatherSection.appendChild(twoDaysFromNowTemp)

        let twoDaysFromNowHumidity = document.createElement('p')
        twoDaysFromNowHumidity.textContent = `Humidity: ${data.list[14].main.humidity} %`
        fiveDayWeatherSection.appendChild(twoDaysFromNowHumidity)




        let threeDaysFromNowDate = document.createElement('p')
        threeDaysFromNowDate.textContent = threeDays//`${data.list[22].dt_txt}`
        threeDaysFromNowDate.setAttribute('style', 'font-weight: bold; text-decoration: underline;')
        fiveDayWeatherSection.appendChild(threeDaysFromNowDate)

        let threeDaysFromNowTemp = document.createElement('p')
        threeDaysFromNowTemp.textContent = `Temp: ${data.list[22].main.temp} ºf`
        fiveDayWeatherSection.appendChild(threeDaysFromNowTemp)

        let threeDaysFromNowHumidity = document.createElement('p')
        threeDaysFromNowHumidity.textContent = `Humidity: ${data.list[22].main.humidity} %`
        fiveDayWeatherSection.appendChild(threeDaysFromNowHumidity)




        let fourDaysFromNowDate = document.createElement('p')
        fourDaysFromNowDate.textContent = fourDays//`${data.list[30].dt_txt}`
        fourDaysFromNowDate.setAttribute('style', 'font-weight: bold; text-decoration: underline;')
        fiveDayWeatherSection.appendChild(fourDaysFromNowDate)

        let fourDaysFromNowTemp = document.createElement('p')
        fourDaysFromNowTemp.textContent = `Temp: ${data.list[30].main.temp} ºf`
        fiveDayWeatherSection.appendChild(fourDaysFromNowTemp)

        let fourDaysFromNowHumidity = document.createElement('p')
        fourDaysFromNowHumidity.textContent = `Humidity: ${data.list[30].main.humidity} %`
        fiveDayWeatherSection.appendChild(fourDaysFromNowHumidity)




        let fiveDaysFromNowDate = document.createElement('p')
        fiveDaysFromNowDate.textContent = fiveDays//`${data.list[38].dt_txt}`
        fiveDaysFromNowDate.setAttribute('style', 'font-weight: bold; text-decoration: underline;')
        fiveDayWeatherSection.appendChild(fiveDaysFromNowDate)

        let fiveDaysFromNowTemp = document.createElement('p')
        fiveDaysFromNowTemp.textContent = `Temp: ${data.list[38].main.temp} ºf`
        fiveDayWeatherSection.appendChild(fiveDaysFromNowTemp)

        let fiveDaysFromNowHumidity = document.createElement('p')
        fiveDaysFromNowHumidity.textContent = `Humidity: ${data.list[38].main.humidity} %`
        fiveDayWeatherSection.appendChild(fiveDaysFromNowHumidity)
    })
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