//Calling global variables up here for later use
let searchTextButton = document.querySelector(".search-text-submit");
let searchTextField = document.querySelector(".search-text-field");
let searchedCity = '';
let cityName;

let container = document.querySelector(".container");
let textColumn1 = document.querySelector(".text-column-1");

let currentWeatherSection = document.querySelector(".current-weather-section");
let displayedCityName = document.querySelector(".city-name");

let currentDay = moment().format('MM/DD/YYYY');
let tomorrow = moment().add(1,'days').format('MM/DD/YYYY');
let twoDays = moment().add(2,'days').format('MM/DD/YYYY');
let threeDays = moment().add(3,'days').format('MM/DD/YYYY');
let fourDays = moment().add(4,'days').format('MM/DD/YYYY');
let fiveDays = moment().add(5,'days').format('MM/DD/YYYY');

let fiveDayWeatherSection = document.querySelector(".five-day-weather-section");

let stringArray = []; //FOR LATER USE TO PUSH

///functionality when the user inputs/searches for a city
searchTextButton.addEventListener("click", function (event) {
    event.preventDefault();
    let cityName = searchTextField.value;
    searchedCity = document.createElement('p'); 
    searchedCity.setAttribute("style", "font-weight: bold; text-align: center;");
    
    searchedCity.textContent = cityName;
    textColumn1.appendChild(searchedCity); /// i need to append this to a different place

 //  console.group(searchedCity) ///this is returning the search query accurately
    stringArray.push(searchedCity.textContent);
    console.log(stringArray);

//calling different functions when the search is inputted to save the content, display current and 5 day weather
    saveCities();
    myWeather();
    fiveDayWeather();
})

//Save cities function when search is inputted
let saveCities = function () {
    localStorage.setItem(searchedCity.textContent, []); ///minor hack to getting the local storage to be set properly .textContent
}

//load cities function to load the previous searched cities
let loadCities = function () {
    let cityText = JSON.stringify(localStorage); //JSON.stringify(localStorage)
    return cityText.replace(/[{}:"",]/gi, '');
}

let mySearchedCities = document.createElement('p');
mySearchedCities.setAttribute("style", "font-weight: bold; text-align: center;");
mySearchedCities.textContent = loadCities(); ///utilizing the load cities function to append previous searched cities here
textColumn1.appendChild(mySearchedCities);

let apiKey = "43ec9b071b79e32f1a5fb7f0d1a5d468"; ///Storing my weather api key in this variable to use in below functions

///calling the current weather function to display current weather
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

          let myCityName = document.createElement('p');
          myCityName.textContent = `${searchedCity.textContent} (${currentDay})`;
          myCityName.setAttribute('style', 'padding-top: 10px; font-size: 35px;');
          currentWeatherSectionEl.appendChild(myCityName);

          let weatherIcon = document.createElement('img');
          weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
          currentWeatherSectionEl.appendChild(weatherIcon);

          let temperature = document.createElement('p');
          temperature.textContent = `Temperature: ${data.main.temp}ºf`;
          temperature.setAttribute('style', 'font-size: 20px;');
          currentWeatherSectionEl.appendChild(temperature);          

          let humidity = document.createElement('p');
          humidity.textContent = `Humidity: ${data.main.humidity}%`;
          humidity.setAttribute('style', 'font-size: 20px');
          currentWeatherSectionEl.appendChild(humidity);                 

          let windSpeed = document.createElement('p');
          windSpeed.textContent = `Wind Speed: ${data.wind.speed} MPH`;
          windSpeed.setAttribute('style', 'font-size: 20px');
          currentWeatherSectionEl.appendChild(windSpeed);        

          ///using the fetch call to retrieve UX index of the search result  
          fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}&units=imperial&exclude=minutely,hourly`
          )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
              let uvIndex = document.createElement('p');
              let uvIndexNum = data.current.uvi;

              if (uvIndexNum >= 8 && uvIndexNum <= 10.99) {
                  uvIndex.setAttribute('style', 'color: darkred; font-weight: bold');
              } else if (uvIndexNum >= 6 && uvIndexNum <= 7.99) {
                uvIndex.setAttribute('style', 'color: orange; font-weight: bold');
              } else if (uvIndexNum >= 3 && uvIndexNum <= 5.99) {
                uvIndex.setAttribute('style', 'color: rgb(204,204,0); font-weight: bold');
              } else if (uvIndexNum >= 11) {
                  uvIndex.setAttribute('style', 'color: red; font-weight: bold');
              } else if (uvIndexNum <= 2.99) {
                  uvIndex.setAttribute('style', 'color: green; font-weight: bold');
              }
              uvIndex.textContent = `UV Index: ${uvIndexNum}`;
              currentWeatherSectionEl.appendChild(uvIndex);
          })
        })
}
///Function use to call 5 day weather content based on the search result
let fiveDayWeather = function () {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity.textContent}&appid=${apiKey}&units=imperial`
    )
    .then(function (response) { 
        return response.json();
    })
    .then(function (data) {
        fiveDayWeatherSection.innerHTML = '';

        let fiveDayWeatherHeader = document.createElement('h3');
        fiveDayWeatherHeader.textContent = "5 Day Forecast:";
        fiveDayWeatherSection.appendChild(fiveDayWeatherHeader);

        let tomorrowContainer = document.createElement('div');
        tomorrowContainer.className = 'container';
        tomorrowContainer.setAttribute('style', 'position: absolute; right: 500px;');
        fiveDayWeatherSection.appendChild(tomorrowContainer);

        let tomorrowRow = document.createElement('div');
        tomorrowRow.className = 'row';
        tomorrowRow.setAttribute('style', 'border: 1px solid; border-color: black; padding-right: 150px; background-color: #1E90FF;');
        tomorrowContainer.appendChild(tomorrowRow);

        let tomorrowCol = document.createElement('div');
        tomorrowCol.className = 'col';
        tomorrowCol.setAttribute('style', 'color: white');
        tomorrowRow.appendChild(tomorrowCol);

        let tomorrowDate = document.createElement('p');
        tomorrowDate.textContent = tomorrow;
        tomorrowDate.setAttribute('style', 'font-weight: bold; text-decoration: underline;');
        tomorrowCol.appendChild(tomorrowDate);

        let tomorrowIcon = document.createElement('img');
        tomorrowIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[6].weather[0].icon}@2x.png`);
        tomorrowCol.appendChild(tomorrowIcon);

        let tomorrowTemp = document.createElement('p');
        tomorrowTemp.textContent = `Temp: ${data.list[6].main.temp}ºf`;
        tomorrowCol.appendChild(tomorrowTemp);

        let tomorrowHumidity = document.createElement('p');
        tomorrowHumidity.textContent = `Humidity: ${data.list[6].main.humidity}%`;
        tomorrowCol.appendChild(tomorrowHumidity);

        let twoDaysFromNowContainer = document.createElement('div');
        twoDaysFromNowContainer.className = 'container';
        twoDaysFromNowContainer.setAttribute('style','padding-right: 50px; position: absolute; left: 200px');
        fiveDayWeatherSection.appendChild(twoDaysFromNowContainer);

        let twoDaysFromNowRow = document.createElement('div');
        twoDaysFromNowRow.className = 'row';
        twoDaysFromNowRow.setAttribute('style', 'border: 1px solid; border-color: black; padding-right: 120px; background-color: #1E90FF');
        twoDaysFromNowContainer.appendChild(twoDaysFromNowRow);

        let twoDaysFromNowCol = document.createElement('div');
        twoDaysFromNowCol.className = 'col';
        twoDaysFromNowCol.setAttribute('style', 'color: white');
        twoDaysFromNowRow.appendChild(twoDaysFromNowCol);

        let twoDaysFromNowDate = document.createElement('p');
        twoDaysFromNowDate.textContent = twoDays;
        twoDaysFromNowDate.setAttribute('style', 'font-weight: bold; text-decoration: underline;');
        twoDaysFromNowCol.appendChild(twoDaysFromNowDate);

        let twoDaysFromNowIcon = document.createElement('img');
        twoDaysFromNowIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[14].weather[0].icon}@2x.png`);
        twoDaysFromNowCol.appendChild(twoDaysFromNowIcon);

        let twoDaysFromNowTemp = document.createElement('p');
        twoDaysFromNowTemp.textContent = `Temp: ${data.list[14].main.temp}ºf`;
        twoDaysFromNowCol.appendChild(twoDaysFromNowTemp);

        let twoDaysFromNowHumidity = document.createElement('p');
        twoDaysFromNowHumidity.textContent = `Humidity: ${data.list[14].main.humidity}%`;
        twoDaysFromNowCol.appendChild(twoDaysFromNowHumidity);

        let threeDaysFromNowContainer = document.createElement('div');
        threeDaysFromNowContainer.className = 'container';
        threeDaysFromNowContainer.setAttribute('style','padding-right: 50px; position: absolute; left: 400px');
        fiveDayWeatherSection.appendChild(threeDaysFromNowContainer);

        let threeDaysFromNowRow = document.createElement('div');
        threeDaysFromNowRow.className = 'row';
        threeDaysFromNowRow.setAttribute('style', 'border: 1px solid; border-color: black; padding-right: 120px; background-color: #1E90FF');
        threeDaysFromNowContainer.appendChild(threeDaysFromNowRow);

        let threeDaysFromNowCol = document.createElement('div');
        threeDaysFromNowCol.className = 'col';
        threeDaysFromNowCol.setAttribute('style', 'color: white');
        threeDaysFromNowRow.appendChild(threeDaysFromNowCol);

        let threeDaysFromNowDate = document.createElement('p');
        threeDaysFromNowDate.textContent = threeDays;
        threeDaysFromNowDate.setAttribute('style', 'font-weight: bold; text-decoration: underline;');
        threeDaysFromNowCol.appendChild(threeDaysFromNowDate);

        let threeDaysFromNowIcon = document.createElement('img');
        threeDaysFromNowIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[22].weather[0].icon}@2x.png`);
        threeDaysFromNowCol.appendChild(threeDaysFromNowIcon);

        let threeDaysFromNowTemp = document.createElement('p');
        threeDaysFromNowTemp.textContent = `Temp: ${data.list[22].main.temp}ºf`;
        threeDaysFromNowCol.appendChild(threeDaysFromNowTemp);

        let threeDaysFromNowHumidity = document.createElement('p');
        threeDaysFromNowHumidity.textContent = `Humidity: ${data.list[22].main.humidity}%`;
        threeDaysFromNowCol.appendChild(threeDaysFromNowHumidity);

        let fourDaysFromNowContainer = document.createElement('div');
        fourDaysFromNowContainer.className = 'container';
        fourDaysFromNowContainer.setAttribute('style','padding-right: 50px; position: absolute; left: 600px');
        fiveDayWeatherSection.appendChild(fourDaysFromNowContainer);

        let fourDaysFromNowRow = document.createElement('div');
        fourDaysFromNowRow.className = 'row';
        fourDaysFromNowRow.setAttribute('style', 'border: 1px solid; border-color: black; padding-right: 120px; background-color: #1E90FF');
        fourDaysFromNowContainer.appendChild(fourDaysFromNowRow);

        let fourDaysFromNowCol = document.createElement('div');
        fourDaysFromNowCol.className = 'col';
        fourDaysFromNowCol.setAttribute('style', 'color: white');
        fourDaysFromNowRow.appendChild(fourDaysFromNowCol);

        let fourDaysFromNowDate = document.createElement('p');
        fourDaysFromNowDate.textContent = fourDays;
        fourDaysFromNowDate.setAttribute('style', 'font-weight: bold; text-decoration: underline;');
        fourDaysFromNowCol.appendChild(fourDaysFromNowDate);

        let fourDaysFromNowIcon = document.createElement('img');
        fourDaysFromNowIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[30].weather[0].icon}@2x.png`);
        fourDaysFromNowCol.appendChild(fourDaysFromNowIcon);

        let fourDaysFromNowTemp = document.createElement('p');
        fourDaysFromNowTemp.textContent = `Temp: ${data.list[30].main.temp}ºf`;
        fourDaysFromNowCol.appendChild(fourDaysFromNowTemp);

        let fourDaysFromNowHumidity = document.createElement('p');
        fourDaysFromNowHumidity.textContent = `Humidity: ${data.list[30].main.humidity}%`;
        fourDaysFromNowCol.appendChild(fourDaysFromNowHumidity);

        let fiveDaysFromNowContainer = document.createElement('div');
        fiveDaysFromNowContainer.className = 'container';
        fiveDaysFromNowContainer.setAttribute('style','padding-right: 50px; position: absolute; left: 800px');
        fiveDayWeatherSection.appendChild(fiveDaysFromNowContainer);

        let fiveDaysFromNowRow = document.createElement('div');
        fiveDaysFromNowRow.className = 'row';
        fiveDaysFromNowRow.setAttribute('style', 'border: 1px solid; border-color: black; padding-right: 120px; background-color: #1E90FF');
        fiveDaysFromNowContainer.appendChild(fiveDaysFromNowRow);

        let fiveDaysFromNowCol = document.createElement('div');
        fiveDaysFromNowCol.className = 'col';
        fiveDaysFromNowCol.setAttribute('style', 'color: white');
        fiveDaysFromNowRow.appendChild(fiveDaysFromNowCol);

        let fiveDaysFromNowDate = document.createElement('p');
        fiveDaysFromNowDate.textContent = fiveDays;
        fiveDaysFromNowDate.setAttribute('style', 'font-weight: bold; text-decoration: underline;');
        fiveDaysFromNowCol.appendChild(fiveDaysFromNowDate);

        let fiveDaysFromNowIcon = document.createElement('img');
        fiveDaysFromNowIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[38].weather[0].icon}@2x.png`);
        fiveDaysFromNowCol.appendChild(fiveDaysFromNowIcon);

        let fiveDaysFromNowTemp = document.createElement('p');
        fiveDaysFromNowTemp.textContent = `Temp: ${data.list[38].main.temp}ºf`;
        fiveDaysFromNowCol.appendChild(fiveDaysFromNowTemp);

        let fiveDaysFromNowHumidity = document.createElement('p');
        fiveDaysFromNowHumidity.textContent = `Humidity: ${data.list[38].main.humidity}%`;
        fiveDaysFromNowCol.appendChild(fiveDaysFromNowHumidity);
    })
}
