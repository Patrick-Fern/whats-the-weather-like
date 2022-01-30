var citySearchButtonEl = document.querySelector("#city-search-button");
var cityInputEl = document.querySelector("#search-city");
var cityListEl = document.querySelector("#cities-list");
var searchedCityEl = document.querySelector("#searched-city");
var cities = JSON.parse(localStorage.getItem('cities')) || [];
var todayTempEl = document.querySelector("#today-temp");
var todayWindEl = document.querySelector("#today-wind");
var todayHumidityEl = document.querySelector("#today-humidity");
var todayUvEl = document.querySelector("#tdy-uv-index"); 



var getForecast = function(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,current,minutely&units=imperial&appid=ee0df90445baa29f925de9ef4662322f"

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            if (data.daily[0].uvi <= 2) {
                todayUvEl.innerHTML = data.daily[0].uvi;
                todayUvEl.setAttribute('class', "badge bg-success");
            } else if (data.daily[0].uvi > 2 && data.daily[0].uvi < 6 ) {
                todayUvEl.innerHTML = data.daily[0].uvi;
                todayUvEl.setAttribute("class", "badge bg-warning text-dark"); 
            } else {
                todayUvEl.innerHTML = data.daily[0].uvi;
                todayUvEl.setAttribute("class", "badge bg-danger");
            }

            for (var i =1; i < 6; i++){
                
                var cardDiv = document.createElement('div');
                cardDiv.setAttribute('class', 'card')

                var h4 = document.createElement('h4');
                var unixTimestamp = data.daily[i].dt;
                var unixMiliseconds = unixTimestamp * 1000;
                var unixToDate = new Date(unixMiliseconds).toDateString();
                h4.append(unixToDate);
                h4.setAttribute('class', 'card-title date')

     

                var iTag = document.createElement('img');
                iTag.setAttribute('class', 'forecast-icon')
                iTag.setAttribute('src','http://openweathermap.org/img/w/04d.png')


                var temp = document.createElement('p');
                temp.setAttribute('class', 'card-text')
                temp.append(`Temp: ${data.daily[i].temp.day}`);

                var wind = document.createElement('p');
                wind.setAttribute('class', 'card-text')
                wind.append("Wind:");

                var humid = document.createElement('p');
                humid.setAttribute('class', 'card-text')
                humid.append("Humid:");

                cardDiv.append(h4);
                cardDiv.append(iTag);
                cardDiv.append(temp);
                cardDiv.append(wind);
                cardDiv.append(humid);

               document.getElementById('5-day-cards').append(cardDiv)
            }
        })
    })
}


{/* <div class="card" id="5">
<h4 class="card-title date">Date</h4>
<i class="forecast-icon"></i>
<p class="card-text forecast-temp">Temp:</p>
<p class="card-text forecast-wind">Wind: </p>
<p class="card-text forecast-humid">Humidity:</p>
</div> */}

var getTodayWeather = function(city) {
    searchedCityEl.innerHTML = city;
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=ee0df90445baa29f925de9ef4662322f"

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data){
            todayTempEl.innerHTML = "Temperature: " + data.main.temp + "*F";
            todayWindEl.innerHTML = "Wind: " + data.wind.speed + " MPH";
            todayHumidityEl.innerHTML = "Humidity: " + data.main.humidity + "%";  
            var lon = data.coord.lon
            var lat = data.coord.lat
            getForecast(lat, lon);
        
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

    if (!cities.includes(cityName)){
        var cityEl = document.createElement("button");
        cityEl.classList = "btn btn-secondary"
        //cityEl.setAttribute("data-cityName", cityName)
        cityEl.textContent = cityName
    
        cityListEl.appendChild(cityEl);
        cities.push(cityName);
        saveCities();
    
    }
    

    getTodayWeather(cityName);

  
    
};





var secondaryBtns = document.getElementsByClassName("btn-secondary");
for (var i = 0; i < secondaryBtns.length; i++) {
    secondaryBtns[i].addEventListener("click", function(){
      // grab the city name of the button that was clicked
      var savedCity = this.innerHTML;

      document.getElementById("5-day-cards").innerHTML = "";
      
      // pass the city name to the getTodayWEather fucntion
      getTodayWeather(savedCity);
    })
}
citySearchButtonEl.addEventListener("click", addCity);