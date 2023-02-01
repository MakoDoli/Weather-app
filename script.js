"use strict";
let temp;
let type;
let weather;
let wind;
const cityName = document.getElementById("city");
const result = document.querySelector("response");
const apikey = "f5ec64e620fe0ac801968c1167477b95";
const unit = "metric";
const resultTemp = document.querySelector(".resulttemp");
const resultCity = document.querySelector(".resultCity");
const overall = document.querySelector(".overall");
const icons = document.querySelectorAll(".none");
const url =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  cityName +
  "&appid=" +
  apikey +
  "&units=" +
  unit;
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

//async function for fetching weather api and rendering
const getWeather = async function () {
  icons.forEach((elem) => {
    elem.style.display = "none";
  });
  console.log(cityName.value);
  if (cityName.value === "") {
    document.querySelector(".empty").style.display = "block";
  } else {
    document.querySelector(".empty").style.display = "none";
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName.value +
      "&appid=" +
      apikey +
      "&units=" +
      unit;
    //---> withOUT async/await <---//
    //in such case need to remove "async" from getWeather function

    // fetch(url)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {

    // ---> with async/await <--- //
    const apiFetch = await fetch(url);
    console.log(apiFetch);
    const data = await apiFetch.json();
    console.log(data);
    if (data.cod !== 200) {
      document.querySelector(".response").style.display = "none";
      document.querySelector(".wrong").style.display = "block";
    } else {
      document.querySelector(".wrong").style.display = "none";

      weather = data.weather[0].description;
      temp = data.main.temp;
      type = data.weather[0].id;
      wind = data.wind.speed;
      console.log(temp, type);
      document.querySelector(".response").style.display = "block";
      resultTemp.textContent = temp + " ° ";
      resultCity.textContent = cityName.value.toUpperCase();
      overall.textContent =
        "You can expect " + weather + " in " + cityName.value.toUpperCase();
      if (type < 300) {
        document.querySelector(".none1").style.display = "block";
      } else if (type >= 300 && type < 500) {
        document.querySelector(".none3").style.display = "block";
      } else if (type >= 500 && type < 600) {
        document.querySelector(".none3").style.display = "block";
        document.querySelector(".none4").style.display = "block";
      } else if (type >= 600 && type < 700) {
        console.log(type);
        document.querySelector(".none5").style.display = "block";
      } else if (type >= 700 && type < 800) {
        console.log(type);
        document.querySelector(".none8").style.display = "block";
      } else if (type === 800) {
        document.querySelector(".none2").style.display = "block";
      } else if (type > 800) {
        document.querySelector(".none7").style.display = "block";
      }
      if (wind > 8) document.querySelector(".none9").style.display = "block";
      cityName.value = "";
    }
  }
};
