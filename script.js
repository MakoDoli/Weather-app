"use strict";
// let data = {};
let temp;
let type;
let weather;
const cityName = document.getElementById("city");
const result = document.querySelector("response");
const apikey = "f5ec64e620fe0ac801968c1167477b95";
const unit = "metric";
const resultTemp = document.querySelector(".resulttemp");
const resultCity = document.querySelector(".resultCity");
const overall = document.querySelector(".overall");
const icons = document.querySelectorAll(".invisible");
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
function getWeather() {
  icons.forEach((elem) => {
    elem.style.opacity = "0";
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
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.cod !== 200) {
          document.querySelector(".response").style.display = "none";
          document.querySelector(".wrong").style.display = "block";
        } else {
          document.querySelector(".wrong").style.display = "none";
          document.querySelector("i").style.opacity = "0";
          weather = data.weather[0].description;
          temp = data.main.temp;
          type = data.weather[0].id;
          console.log(temp, type);
          document.querySelector(".response").style.display = "block";
          resultTemp.textContent = temp + " ° ";
          resultCity.textContent = cityName.value.toUpperCase();
          overall.textContent =
            "You can expect " + weather + " in " + cityName.value.toUpperCase();
          if (type < 300) {
            document.querySelector(".ph-cloud-lightning").style.opacity = "1";
          } else if (type >= 300 && type < 500) {
            document.querySelector(".ph-cloud-rain").style.opacity = "1";
          } else if (type >= 500 && type < 600) {
            document.querySelector(".ph-cloud-rain").style.opacity = "1";
            document.querySelector(".ph-umbrella").style.opacity = "1";
          } else if (type >= 600 && type < 700) {
            console.log(type);
            document.querySelector(".ph-snowflake").style.opacity = "1";
          } else if (type >= 700 && type < 800) {
            console.log(type);
            document.querySelector(".ph-cloud-fog").style.opacity = "1";
          } else if (type === 800) {
            document.querySelector(".ph-sun-dim").style.opacity = "1";
          } else if (type > 800) {
            document.querySelector(".ph-cloud").style.opacity = "1";
          }
          cityName.value = "";
        }
      });
  }
}
