var apiLink1 = "http://api.openweathermap.org/data/2.5/forecast?lat=" 
var apiLink2 = "&lon="
var apiLink3 = "&appid=b12eb8eec107d15e513665d79db6437b"
var geoCode = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=b12eb8eec107d15e513665d79db6437b"
var urlP1 = "http://api.openweathermap.org/geo/1.0/direct?q="
var urlP2 = "&limit=5&appid=b12eb8eec107d15e513665d79db6437b"
var submit = document.getElementById('submit')
var options =  {
    method: 'GET', 
    credentials: 'same-origin', 
    redirect: 'follow', 
}
var cityName = document.getElementById("cityName")
var currentTemp = document.getElementById("currentTemp")
var lowTemp = document.getElementById("lowTemp")
var highTemp = document.getElementById("highTemp")


var locationInput = document.getElementById("data");

var findCity = function() {
    // event.preventDefault()
    var locationInput = document.getElementById("data");
    var city = locationInput.value
    console.log(city)
    return urlP1 + city + urlP2
}

var getApi = function() {
    fetch(findCity, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var latitude = data[0].lat
      var longitude = data[0].lon
      console.log(latitude)
      console.log(longitude)
      var fullLink = apiLink1 + latitude + apiLink2 + longitude + apiLink3
      console.log(fullLink)
        fetch(fullLink, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            cityName.textContent = data.city.name
            currentTemp.textContent = "Feels Like: " + (data.list[0].main.temp * 1.8 -459.67).toFixed(1) + " °F"
            lowTemp.textContent = "Lows of " + (data.list[0].main.temp_min * 1.8 -459.67).toFixed(1) + " °F"
            highTemp.textContent = "Highs of " + (data.list[0].main.temp_max * 1.8 -459.67).toFixed(1) + " °F"
            
         });
         .catch(function (error) {
            console.error('Error:', error);
          });

        })}

submit.addEventListener("click", getApi)