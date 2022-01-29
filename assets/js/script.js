var citySearchButtonEl = document.querySelector("#city-search-button");
var cityInputEl = document.querySelector("#search-city");
var cityListEl = document.querySelector("#cities-list")



var addCity = function(event) {
    event.preventDefault();
    var cityName =cityInputEl.value.trim();
    

    var cityEl = document.createElement("button");
    cityEl.classList = "btn btn-secondary"
    cityEl.textContent = cityName

    cityListEl.appendChild(cityEl);



};






citySearchButtonEl.addEventListener("click", addCity);