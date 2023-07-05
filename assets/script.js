var apiLink1 = "https://api.openweathermap.org/data/2.5/forecast?lat=" 
var apiLink2 = "&lon="
var apiLink3 = "&appid=b12eb8eec107d15e513665d79db6437b"
var geoCode = "https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=b12eb8eec107d15e513665d79db6437b"
var urlP1 = "https://api.openweathermap.org/geo/1.0/direct?q="
var urlP2 = "&limit=5&appid=b12eb8eec107d15e513665d79db6437b"
var options =  {
    method: 'GET', 
    credentials: 'same-origin', 
    redirect: 'follow', 
}
var cityName = document.getElementById("cityName")
var currentTemp = document.getElementById("currentTemp")
var lowTemp = document.getElementById("lowTemp")
var highTemp = document.getElementById("highTemp")

var listContainer = document.getElementById("myList")
var myDiv = document.getElementById("myDivId")
var divClone = myDiv.cloneNode(true)

var locationInput = document.getElementById("data");

function findCity() {
    // event.preventDefault()
    var locationInput = document.getElementById("data");
    var city = locationInput.value
    console.log(city)
    return this.urlP1 + city + urlP2
}

submit.addEventListener("click", function(event){ 
    event.preventDefault();
    console.log(findCity(event));
    function getApi() {
        fetch(findCity(), options)
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
                var forecastData = []
                for (i = 0; i < 5; i++) {
                dataSet = {
                cityName: data.city.name,
                currentTemp: "Feels Like: " + (data.list[i].main.feels_like * 1.8 -459.67).toFixed(1) + " °F",
                lowTemp: "Lows of " + (data.list[i].main.temp_min * 1.8 -459.67).toFixed(1) + " °F",
                highTemp: "Highs of " + (data.list[i].main.temp_max * 1.8 -459.67).toFixed(1) + " °F"
                }
                forecastData.push(dataSet)
              }
                localStorage.setItem('myObject', JSON.stringify(dataSet));
  
                console.log(forecastData)
                for (i = 0; i < 5; i++) {
                  const list = document.createElement('div');
                  for (const key in forecastData[i]) {
                    if (forecastData[i].hasOwnProperty(key)) {
                    const value = forecastData[i][key];
                    const item = document.createElement('p');
                    item.textContent = `${value}`;
                     list.appendChild(item);
                    }
                  }
                  listContainer.appendChild(list);
                  }
              
             });
        

        // return this.apiLink1 + latitude + apiLink2 + longitude + apiLink3
        });
      
      }
      
      getApi()
      
  });
