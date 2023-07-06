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

function handleDate(unix, i){
  if (i === 0) {
    var date = new Date((unix*1000 + 8.64e+7)).toLocaleDateString()
    return date
  }
  var date = new Date((unix*1000) + i*8.64e+7).toLocaleDateString()
  return date 
}

submit.addEventListener("click", function(event){ 
    event.preventDefault();
    console.log(findCity(event)); //setting to erie, should be 'event'
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
                highTemp: "Highs of " + (data.list[i].main.temp_max * 1.8 -459.67).toFixed(1) + " °F",
                date: handleDate(data.list[i].dt, i)
                }
                forecastData.push(dataSet)
                console.log(forecastData)
              }
                localStorage.setItem('myObject', JSON.stringify(dataSet));

                // const myRow = document.createElement('div');
                // myRow.className = ""

                for (i = 0; i < 5; i++) {
                  const list = document.createElement('div');
                  list.className = "border border-dark rounded  ms-3 text-center d-flex-block flex-column justify-content-center align-items-center "
                  for (const key in forecastData[i]) {
                    if (forecastData[i].hasOwnProperty(key)) {
                    const value = forecastData[i][key];
                    const item = document.createElement('p');
                    item.textContent = `${value}`;
                     list.appendChild(item);
                    //  myRow.appendChild(list)
                    }
                  }
                  listContainer.appendChild(list);
                  // console.log(listContainer)
                  }
              
             });
        

        // return this.apiLink1 + latitude + apiLink2 + longitude + apiLink3
        });
      
      }
      
      getApi()
      
  });
