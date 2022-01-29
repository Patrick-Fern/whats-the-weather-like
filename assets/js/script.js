var citySearchButtonEl = document.querySelector("#city-search-button");
var cityInputEl = document.querySelector("#search-city");
var cityListEl = document.querySelector("#cities-list")
var cities = []

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
}

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
};






citySearchButtonEl.addEventListener("click", addCity);