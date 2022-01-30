var citySearchButtonEl = document.querySelector("#city-search-button");
var cityInputEl = document.querySelector("#search-city");
var cityListEl = document.querySelector("#cities-list");
var searchedCityEl = document.querySelector("#searched-city");
var cities = []
var todayTempEl = document.querySelector("#today-temp");
var todayWindEl = document.querySelector("#today-wind");
var todayHumidityEl = document.querySelector("#today-humidity");
var todayUvEl = document.querySelector("#today-uv"); 

var getTodayWeather = function(city) {
    searchedCityEl.innerHTML = city;
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=ee0df90445baa29f925de9ef4662322f"

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data){
            console.log(data);
            todayTempEl.innerHTML = "Temperature: " + data.main.temp + "*F";
            todayWindEl.innerHTML = "Wind: " + data.wind.speed + " MPH";
            todayHumidityEl.innerHTML = "Humidity: " + data.main.humidity + "%";
            todayUvEl.innerHTML = "UV Index: "  
        })
    });
};




var saveCities = function () {
    localStorage.setItem("cities", JSON.stringify(cities));
};

var loadCities = function() {
    cities = JSON.parse(localStorage.getItem("cities"));

    if (cities === null) {
        cities = [];
        return
    }  else {
        for (var i = 0; i < cities.length; i++) {
           var cityName = cities[i]
           var cityEl = document.createElement("button");
        cityEl.classList = "btn btn-secondary"
    
        cityEl.textContent = cityName
        cityListEl.appendChild(cityEl);

        }
    }
};

loadCities();

var addCity = function(event) {
    event.preventDefault();
    var cityName =cityInputEl.value.trim();
    

    var cityEl = document.createElement("button");
    cityEl.classList = "btn btn-secondary"
    //cityEl.setAttribute("data-cityName", cityName)
    cityEl.textContent = cityName

    cityListEl.appendChild(cityEl);
    cities.push(cityName);
    saveCities();

    getTodayWeather(cityName);
    
};






citySearchButtonEl.addEventListener("click", addCity);