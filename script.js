

let body = document.querySelector('body')
let searchTextButton = document.querySelector(".search-text-submit")
let searchTextField = document.querySelector(".search-text-field")
let searchedCity = ''//[]//''
let cityName


let container = document.querySelector(".container")
let textColumn1 = document.querySelector(".text-column-1") //".text-column-1"

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

let stringArray = []

searchTextButton.addEventListener("click", function (event) {
    event.preventDefault()
    let cityName = searchTextField.value
    searchedCity = document.createElement('p') //p //button
    searchedCity.setAttribute("style", "font-weight: bold; text-align: center;")
    
    searchedCity.textContent = cityName
    textColumn1.appendChild(searchedCity) /// i need to append this to a different place

 //  console.group(searchedCity) ///this is returning the search query accurately
    stringArray.push(searchedCity.textContent)
    console.log(stringArray)


    saveCities()
    myWeather()
    fiveDayWeather()
})

let saveCities = function () {
    localStorage.setItem(searchedCity.textContent, []) ///minor hack to getting the local storage to be set properly .textContent
}

let loadCities = function () {
    let cityText = JSON.stringify(localStorage) //JSON.stringify(localStorage)
    return cityText.replace(/[{}:"",]/gi, '');
}

let mySearchedCities = document.createElement('p')
mySearchedCities.setAttribute("style", "font-weight: bold; text-align: center;")
mySearchedCities.textContent = loadCities()
textColumn1.appendChild(mySearchedCities)

let apiKey = "43ec9b071b79e32f1a5fb7f0d1a5d468"

let myWeather = function () {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.textContent}&appid=${apiKey}&units=imperial`
      )
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {

          let currentWeatherSectionEl = document.querySelector(".current-weather-section");
          currentWeatherSectionEl.innerHTML = '';

            console.log(data);
          let myCityName = document.createElement('p')
          myCityName.textContent = `${searchedCity.textContent} (${currentDay})`
          myCityName.setAttribute('style', 'padding-top: 10px; font-size: 35px;')
          currentWeatherSectionEl.appendChild(myCityName) //displayedCityName.appendChild(myCityName)

          let weatherIcon = document.createElement('img')
          weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
          currentWeatherSectionEl.appendChild(weatherIcon)

          let temperature = document.createElement('p')
          temperature.textContent = `Temperature: ${data.main.temp}ºf`
          temperature.setAttribute('style', 'font-size: 20px;')
          currentWeatherSectionEl.appendChild(temperature)                        

          let humidity = document.createElement('p')
          humidity.textContent = `Humidity: ${data.main.humidity}%` 
          humidity.setAttribute('style', 'font-size: 20px')
          currentWeatherSectionEl.appendChild(humidity)                       

          let windSpeed = document.createElement('p')
          windSpeed.textContent = `Wind Speed: ${data.wind.speed} MPH`
          windSpeed.setAttribute('style', 'font-size: 20px')
          currentWeatherSectionEl.appendChild(windSpeed)             


          fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}&units=imperial&exclude=minutely,hourly`
          )
          .then(function (response) {
            return response.json()
          })
          .then(function (data) {
              console.log(data)

              let uvIndex = document.createElement('p')
              let uvIndexNum = data.current.uvi

              if (uvIndexNum >= 8 && uvIndexNum <= 10.99) {
                  uvIndex.setAttribute('style', 'color: darkred; font-weight: bold')
              } else if (uvIndexNum >= 6 && uvIndexNum <= 7.99) {
                uvIndex.setAttribute('style', 'color: orange; font-weight: bold')
              } else if (uvIndexNum >= 3 && uvIndexNum <= 5.99) {
                uvIndex.setAttribute('style', 'color: rgb(204,204,0); font-weight: bold')
              } else if (uvIndexNum >= 11) {
                  uvIndex.setAttribute('style', 'color: red; font-weight: bold')
              } else if (uvIndexNum <= 2.99) {
                  uvIndex.setAttribute('style', 'color: green; font-weight: bold')
              }

              uvIndex.textContent = `UV Index: ${uvIndexNum}`
              currentWeatherSectionEl.appendChild(uvIndex)

          })
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

        fiveDayWeatherSection.innerHTML = ''

        let fiveDayWeatherHeader = document.createElement('h3')
        fiveDayWeatherHeader.textContent = "5 Day Forecast:"
        fiveDayWeatherSection.appendChild(fiveDayWeatherHeader)




        let tomorrowContainer = document.createElement('div')
        tomorrowContainer.className = 'container'
        tomorrowContainer.setAttribute('style', 'position: absolute; right: 500px;') //padding-left: 10px; ///be wary of this right property
        ///may have to set attribute for the tomorrow Container
        fiveDayWeatherSection.appendChild(tomorrowContainer)

        let tomorrowRow = document.createElement('div')
        tomorrowRow.className = 'row'
        tomorrowRow.setAttribute('style', 'border: 1px solid; border-color: black; padding-right: 150px; background-color: #1E90FF;')
        tomorrowContainer.appendChild(tomorrowRow)


        let tomorrowCol = document.createElement('div')
        tomorrowCol.className = 'col'
        tomorrowCol.setAttribute('style', 'color: white')
        tomorrowRow.appendChild(tomorrowCol)



        let tomorrowDate = document.createElement('p')
        tomorrowDate.textContent = tomorrow //`${data.list[6].dt_txt}`
        tomorrowDate.setAttribute('style', 'font-weight: bold; text-decoration: underline;')
        tomorrowCol.appendChild(tomorrowDate) //tomorrowBox.appendChild(tomorrowDate)   fiveDayWeatherSection.appendChild(tomorrowDate)

        let tomorrowIcon = document.createElement('img')
        tomorrowIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[6].weather[0].icon}@2x.png`)
        tomorrowCol.appendChild(tomorrowIcon)

        let tomorrowTemp = document.createElement('p')
        tomorrowTemp.textContent = `Temp: ${data.list[6].main.temp}ºf`
        tomorrowCol.appendChild(tomorrowTemp) //fiveDayWeatherSection.appendChild(tomorrowTemp)

        let tomorrowHumidity = document.createElement('p')
        tomorrowHumidity.textContent = `Humidity: ${data.list[6].main.humidity}%`
        tomorrowCol.appendChild(tomorrowHumidity) //fiveDayWeatherSection.appendChild(tomorrowHumidity)




        let twoDaysFromNowContainer = document.createElement('div')
        twoDaysFromNowContainer.className = 'container'
        twoDaysFromNowContainer.setAttribute('style','padding-right: 50px; position: absolute; left: 200px')
        ///may have to set attribute for the tomorrow Container
        fiveDayWeatherSection.appendChild(twoDaysFromNowContainer)

        let twoDaysFromNowRow = document.createElement('div')
        twoDaysFromNowRow.className = 'row'
        twoDaysFromNowRow.setAttribute('style', 'border: 1px solid; border-color: black; padding-right: 120px; background-color: #1E90FF')
        twoDaysFromNowContainer.appendChild(twoDaysFromNowRow)


        let twoDaysFromNowCol = document.createElement('div')
        twoDaysFromNowCol.className = 'col'
        twoDaysFromNowCol.setAttribute('style', 'color: white')
        twoDaysFromNowRow.appendChild(twoDaysFromNowCol)




        let twoDaysFromNowDate = document.createElement('p')
        twoDaysFromNowDate.textContent = twoDays//`${data.list[14].dt_txt}`
        twoDaysFromNowDate.setAttribute('style', 'font-weight: bold; text-decoration: underline;')
        twoDaysFromNowCol.appendChild(twoDaysFromNowDate) //fiveDayWeatherSection.appendChild(twoDaysFromNowDate)

        let twoDaysFromNowIcon = document.createElement('img')
        twoDaysFromNowIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[14].weather[0].icon}@2x.png`)
        twoDaysFromNowCol.appendChild(twoDaysFromNowIcon)

        let twoDaysFromNowTemp = document.createElement('p')
        twoDaysFromNowTemp.textContent = `Temp: ${data.list[14].main.temp}ºf`
        twoDaysFromNowCol.appendChild(twoDaysFromNowTemp) //fiveDayWeatherSection.appendChild(twoDaysFromNowTemp)

        let twoDaysFromNowHumidity = document.createElement('p')
        twoDaysFromNowHumidity.textContent = `Humidity: ${data.list[14].main.humidity}%`
        twoDaysFromNowCol.appendChild(twoDaysFromNowHumidity) //fiveDayWeatherSection.appendChild(twoDaysFromNowHumidity)






        let threeDaysFromNowContainer = document.createElement('div')
        threeDaysFromNowContainer.className = 'container'
        threeDaysFromNowContainer.setAttribute('style','padding-right: 50px; position: absolute; left: 400px')
        ///may have to set attribute for the tomorrow Container
        fiveDayWeatherSection.appendChild(threeDaysFromNowContainer)

        let threeDaysFromNowRow = document.createElement('div')
        threeDaysFromNowRow.className = 'row'
        threeDaysFromNowRow.setAttribute('style', 'border: 1px solid; border-color: black; padding-right: 120px; background-color: #1E90FF')
        threeDaysFromNowContainer.appendChild(threeDaysFromNowRow)


        let threeDaysFromNowCol = document.createElement('div')
        threeDaysFromNowCol.className = 'col'
        threeDaysFromNowCol.setAttribute('style', 'color: white')
        threeDaysFromNowRow.appendChild(threeDaysFromNowCol)






        let threeDaysFromNowDate = document.createElement('p')
        threeDaysFromNowDate.textContent = threeDays//`${data.list[22].dt_txt}`
        threeDaysFromNowDate.setAttribute('style', 'font-weight: bold; text-decoration: underline;')
        threeDaysFromNowCol.appendChild(threeDaysFromNowDate) //fiveDayWeatherSection.appendChild(threeDaysFromNowDate)

        let threeDaysFromNowIcon = document.createElement('img')
        threeDaysFromNowIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[22].weather[0].icon}@2x.png`)
        threeDaysFromNowCol.appendChild(threeDaysFromNowIcon)

        let threeDaysFromNowTemp = document.createElement('p')
        threeDaysFromNowTemp.textContent = `Temp: ${data.list[22].main.temp}ºf`
        threeDaysFromNowCol.appendChild(threeDaysFromNowTemp)  ///fiveDayWeatherSection.appendChild(threeDaysFromNowTemp)

        let threeDaysFromNowHumidity = document.createElement('p')
        threeDaysFromNowHumidity.textContent = `Humidity: ${data.list[22].main.humidity}%`
        threeDaysFromNowCol.appendChild(threeDaysFromNowHumidity) ///fiveDayWeatherSection.appendChild(threeDaysFromNowHumidity)



        let fourDaysFromNowContainer = document.createElement('div')
        fourDaysFromNowContainer.className = 'container'
        fourDaysFromNowContainer.setAttribute('style','padding-right: 50px; position: absolute; left: 600px')
        ///may have to set attribute for the tomorrow Container
        fiveDayWeatherSection.appendChild(fourDaysFromNowContainer)

        let fourDaysFromNowRow = document.createElement('div')
        fourDaysFromNowRow.className = 'row'
        fourDaysFromNowRow.setAttribute('style', 'border: 1px solid; border-color: black; padding-right: 120px; background-color: #1E90FF')
        fourDaysFromNowContainer.appendChild(fourDaysFromNowRow)


        let fourDaysFromNowCol = document.createElement('div')
        fourDaysFromNowCol.className = 'col'
        fourDaysFromNowCol.setAttribute('style', 'color: white')
        fourDaysFromNowRow.appendChild(fourDaysFromNowCol)





        let fourDaysFromNowDate = document.createElement('p')
        fourDaysFromNowDate.textContent = fourDays//`${data.list[30].dt_txt}`
        fourDaysFromNowDate.setAttribute('style', 'font-weight: bold; text-decoration: underline;')
        fourDaysFromNowCol.appendChild(fourDaysFromNowDate)  //fiveDayWeatherSection.appendChild(fourDaysFromNowDate)

        let fourDaysFromNowIcon = document.createElement('img')
        fourDaysFromNowIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[30].weather[0].icon}@2x.png`)
        fourDaysFromNowCol.appendChild(fourDaysFromNowIcon)

        let fourDaysFromNowTemp = document.createElement('p')
        fourDaysFromNowTemp.textContent = `Temp: ${data.list[30].main.temp}ºf`
        fourDaysFromNowCol.appendChild(fourDaysFromNowTemp)  //fiveDayWeatherSection.appendChild(fourDaysFromNowTemp)

        let fourDaysFromNowHumidity = document.createElement('p')
        fourDaysFromNowHumidity.textContent = `Humidity: ${data.list[30].main.humidity}%`
        fourDaysFromNowCol.appendChild(fourDaysFromNowHumidity)  ///fiveDayWeatherSection.appendChild(fourDaysFromNowHumidity)



        let fiveDaysFromNowContainer = document.createElement('div')
        fiveDaysFromNowContainer.className = 'container'
        fiveDaysFromNowContainer.setAttribute('style','padding-right: 50px; position: absolute; left: 800px')
        ///may have to set attribute for the tomorrow Container
        fiveDayWeatherSection.appendChild(fiveDaysFromNowContainer)

        let fiveDaysFromNowRow = document.createElement('div')
        fiveDaysFromNowRow.className = 'row'
        fiveDaysFromNowRow.setAttribute('style', 'border: 1px solid; border-color: black; padding-right: 120px; background-color: #1E90FF')
        fiveDaysFromNowContainer.appendChild(fiveDaysFromNowRow)


        let fiveDaysFromNowCol = document.createElement('div')
        fiveDaysFromNowCol.className = 'col'
        fiveDaysFromNowCol.setAttribute('style', 'color: white')
        fiveDaysFromNowRow.appendChild(fiveDaysFromNowCol)



        let fiveDaysFromNowDate = document.createElement('p')
        fiveDaysFromNowDate.textContent = fiveDays//`${data.list[38].dt_txt}`
        fiveDaysFromNowDate.setAttribute('style', 'font-weight: bold; text-decoration: underline;')
        fiveDaysFromNowCol.appendChild(fiveDaysFromNowDate) //fiveDayWeatherSection.appendChild(fiveDaysFromNowDate)

        let fiveDaysFromNowIcon = document.createElement('img')
        fiveDaysFromNowIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[38].weather[0].icon}@2x.png`)
        fiveDaysFromNowCol.appendChild(fiveDaysFromNowIcon)

        let fiveDaysFromNowTemp = document.createElement('p')
        fiveDaysFromNowTemp.textContent = `Temp: ${data.list[38].main.temp}ºf`
        fiveDaysFromNowCol.appendChild(fiveDaysFromNowTemp) //fiveDayWeatherSection.appendChild(fiveDaysFromNowTemp)

        let fiveDaysFromNowHumidity = document.createElement('p')
        fiveDaysFromNowHumidity.textContent = `Humidity: ${data.list[38].main.humidity}%`
        fiveDaysFromNowCol.appendChild(fiveDaysFromNowHumidity) //fiveDayWeatherSection.appendChild(fiveDaysFromNowHumidity)
    })
}
