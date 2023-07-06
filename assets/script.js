var apiLink1 = "https://api.openweathermap.org/data/2.5/forecast?lat=";
var apiLink2 = "&lon=";
var apiLink3 = "&appid=b12eb8eec107d15e513665d79db6437b";
var urlP1 = "https://api.openweathermap.org/geo/1.0/direct?q=";
var urlP2 = "&limit=5&appid=b12eb8eec107d15e513665d79db6437b";
var options = {
  method: 'GET',
  credentials: 'same-origin',
  redirect: 'follow',
};

var cityName = document.getElementById("cityName");
var currentTemp = document.getElementById("currentTemp");
var lowTemp = document.getElementById("lowTemp");
var highTemp = document.getElementById("highTemp");

var listContainer = document.getElementById("myList");
var locationInput = document.getElementById("data");

function findCity() {
  var city = locationInput.value;
  return urlP1 + city + urlP2;
}

function handleDate(unix, i) {
  var date = new Date((unix * 1000) + i * 8.64e+7).toLocaleDateString();
  return date;
}

function fetchData(url) {
  return fetch(url, options)
    .then(function (response) {
      return response.json();
    });
}

function submitHandler(event) {
  event.preventDefault();
  var url = findCity();

  fetchData(url)
    .then(function (data) {
      var latitude = data[0].lat;
      var longitude = data[0].lon;
      var fullLink = apiLink1 + latitude + apiLink2 + longitude + apiLink3;

      return fetchData(fullLink);
    })
    .then(function (data) {
      var forecastData = [];
      for (var i = 0; i < 5; i++) {
        var dataSet = {
          cityName: data.city.name,
          currentTemp: "Feels Like: " + (data.list[i].main.feels_like * 1.8 - 459.67).toFixed(1) + " °F",
          lowTemp: "Lows of " + (data.list[i].main.temp_min * 1.8 - 459.67).toFixed(1) + " °F",
          highTemp: "Highs of " + (data.list[i].main.temp_max * 1.8 - 459.67).toFixed(1) + " °F",
          date: handleDate(data.list[i].dt, i)
        };
        forecastData.push(dataSet);
      }

      localStorage.setItem('myObject', JSON.stringify(dataSet));
      displayForecastData(forecastData);
    });
}

function displayForecastData(forecastData) {
  listContainer.innerHTML = "";

  for (var i = 0; i < forecastData.length; i += 5) {
    var myRow = document.createElement('div');
    myRow.className = "row mt-2 justify-content-center";

    for (var j = i; j < i + 5; j++) {
      if (j >= forecastData.length) {
        break; // Exit the loop if there are no more forecast data
      }

      var list = document.createElement('div');
      list.className = "border border-dark rounded ms-3 text-center d-flex-block flex-column justify-content-center align-items-center";

      for (var key in forecastData[j]) {
        if (forecastData[j].hasOwnProperty(key)) {
          var value = forecastData[j][key];
          var item = document.createElement('p');
          item.textContent = `${value}`;
          list.appendChild(item);
        }
      }

      myRow.appendChild(list);
    }

    listContainer.appendChild(myRow);
  }
}

submit.addEventListener("click", submitHandler);

