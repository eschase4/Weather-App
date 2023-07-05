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
var submit = document.getElementById("submit")

function findCity() {
    // event.preventDefault()
    var locationInput = document.getElementById("data");
    var city = locationInput.value
    console.log(city)
    return this.urlP1 + city + urlP2
}
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
      const fullLink = apiLink1 + latitude + apiLink2 + longitude + apiLink3
      console.log(fullLink)
      // return this.apiLink1 + latitude + apiLink2 + longitude + apiLink3
        fetch(fullLink)
        .then(function (response) {
          return response.json();
          })
          .then(function (data) {   
            console.log(data)  
          })
        })
      }




submit.addEventListener("click", function() {
  getApi()
})


  //           fetch(fullLink, options)
  //           .then(function (response) {
  //               return response.json();
  //           })
  //           .then(function (data) {
  //               console.log(data);
  //               for (i = 0; i <= 5; i++) {
  //               dataSet = {
  //               cityName: data.city.name,
  //               currentTemp: "Feels Like: " + (data.list[0].main.feels_like * 1.8 -459.67).toFixed(1) + " °F",
  //               lowTemp: "Lows of " + (data.list[0].main.temp_min * 1.8 -459.67).toFixed(1) + " °F",
  //               highTemp: "Highs of " + (data.list[0].main.temp_max * 1.8 -459.67).toFixed(1) + " °F"
  //               }
  //             }
  //               localStorage.setItem('myObject', JSON.stringify(dataSet));
  
  //               console.log(dataSet)
  //               const list = document.createElement('div');

  //                 for (const key in dataSet) {
  //                   if (dataSet.hasOwnProperty(key)) {
  //                   const value = dataSet[key];
  //                   const item = document.createElement('p');
  //                   item.textContent = `${value}`;
  //                    list.appendChild(item);
  //                       }
  //                     }

  //                     listContainer.appendChild(list);
              
  //            });
        

  //       // return this.apiLink1 + latitude + apiLink2 + longitude + apiLink3
  //       });
      
  //     }
      
  //     getApi(findCity())
      
  // });
  // submit.addEventListener("click", function(){
  //   getApi()
  // })