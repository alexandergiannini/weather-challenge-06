

let body = document.querySelector('body')
let searchTextButton = document.querySelector(".search-text-submit")
let searchTextField = document.querySelector(".search-text-field")
let searchedCity = ''
let cityName

let myValue = "" ///testing the save cities function which works but isnt super robust

let container = document.querySelector(".container")
let textColumn1 = document.querySelector(".text-column-1")


searchTextButton.addEventListener("click", function (event) {
    event.preventDefault()
    let cityName = searchTextField.value
    searchedCity = document.createElement('p')
    searchedCity.setAttribute("style", "font-weight: bold; text-align: center;")
    searchedCity.textContent = cityName
   textColumn1.appendChild(searchedCity) /// i need to append this to a different place
    saveCities()
    console.log(searchedCity.textContent)
})

let saveCities = function () {
    localStorage.setItem(searchedCity.textContent, searchedCity.textContent) ///minor hack to getting the local storage to be set properly .textContent
}

let loadCities = function () {
    let cityText = JSON.stringify(localStorage)
    console.log(cityText)
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



