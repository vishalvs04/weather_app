import { codes } from "./codes.js";

// import {codes} from './codes.js'
window.onload = function () {
  let city = "Jaipur";
  get_weather_details(city);
  get_forecast_details(city);
};
let search_btn = document.getElementById("search_btn");
let search_txt = document.getElementById("search");
search_btn.addEventListener("click", () => {
  let city = search_txt.value;
  get_weather_details(city);
  search_txt.value = "";
});
search_txt.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    let city = search_txt.value;
    get_weather_details(city);
    get_forecast_details(city);
    search_txt.value = "";
  }
});
function get_weather_details(city) {
  let weather_xhr = new XMLHttpRequest();
  if (city == "") {
    weather_xhr.open(
      "GET",
      "http://api.weatherapi.com/v1/current.json?key=5033a3357e7c4a27879111340221807&q=Jaipur&days=1&aqi=yes&alerts=no",
      true
    );
  } else {
    weather_xhr.open(
      "GET",
      `http://api.weatherapi.com/v1/current.json?key=5033a3357e7c4a27879111340221807&q=${city}&days=1&aqi=yes`,
      true
    );
  }
  let weather_obj;

  weather_xhr.onload = function () {
    if (this.status == 200) {
      weather_obj = JSON.parse(this.responseText);
      let temp = document.getElementById("temperature");
      let last_updated = document.getElementById("last_updated");
      temp.innerText = `${weather_obj.current.temp_c}°C`;
      last_updated.innerText = `Last Updated On: ${weather_obj.current.last_updated.slice(
        11
      )}`;
      let current_time=document.getElementById('current_time');
      current_time.innerText = `${weather_obj.location.localtime.slice(11)}`;
      document.getElementById(
        "city"
      ).innerText = `${weather_obj.location.name}, ${weather_obj.location.region}`;
      let wind = document.getElementById("wind");
      wind.innerHTML = `
      <table id="wind_information">
      <tr><td>Wind Speed</td><td>Wind Direction</td></tr>
      <tr id="wind_info">
      <td>${weather_obj.current.wind_kph} Km/H</td>
      <td>${weather_obj.current.wind_dir}</td>
      </tr>
      </table>
        `;
      let feels_temp = document.getElementById("feels_temp");
      feels_temp.innerHTML = `
      <table id="feels_like_info">
      <tr><td>Feels Like</td></tr>
      <tr id="feels_like_temp">
      <td>${weather_obj.current.feelslike_c}°C</td>
      <td>${weather_obj.current.feelslike_f}°F</td>
      </tr>
      </table>

        `;
      for (let index = 0; index < codes.length; index++) {
        let element = codes[index];
        // console.log(weather_obj.current.condition.code);
        if (element.code == weather_obj.current.condition.code) {
          if (weather_obj.current.is_day == 1) {
            let image_time = "day";
            let weather_text = document.getElementById("weather_text");
            weather_text.innerText = `${weather_obj.current.condition.text}`;
            let feels_temp = document.getElementById("day_night_temp_icon");
            feels_temp.innerHTML = `<img src="images/${image_time}/${element.icon}.png">`;
          } else {
            let image_time = "night";
            let weather_text = document.getElementById("weather_text");
            weather_text.innerText = `${weather_obj.current.condition.text}`;
            let feels_temp = document.getElementById("day_night_temp_icon");
            feels_temp.innerHTML = `<img src="images/${image_time}/${element.icon}.png" id="day_night_icon">`;
          }
        }
      }

      let weather_text = weather_obj.current.condition.text;
      if (weather_text == "Sunny") {
        document.getElementsByTagName(
          "body"
        )[0].style.backgroundImage = `url('images/sunny_weather.jpg')`;
      } else if (weather_text == "Moderate or heavy rain shower") {
        document.getElementsByTagName(
          "body"
        )[0].style.backgroundImage = `url('images/bg/moderate_or_heavy_rain_with_shower.jpg')`;
      } else if (weather_text == "Moderate or heavy rain with thunder") {
        document.getElementsByTagName(
          "body"
        )[0].style.backgroundImage = `url('images/bg/moderate_or_heavy_rain_with_thunder.jpg')`;
      } else if (weather_text == "Overcast") {
        document.getElementsByTagName(
          "body"
        )[0].style.backgroundImage = `url('images/bg/Overcast.jpg')`;
      } else if (weather_text == "Partly cloudy") {
        document.getElementsByTagName(
          "body"
        )[0].style.backgroundImage = `url('images/bg/partly_cloudy.jpg')`;
      } else if (weather_text == "Patchy rain possible") {
        document.getElementsByTagName(
          "body"
        )[0].style.backgroundImage = `url('images/bg/patchy_rain_possible.jpg')`;
      } else if (weather_text == "Thunder outbreaks possible") {
        document.getElementsByTagName(
          "body"
        )[0].style.backgroundImage = `url('images/bg/thunder_outbreaks_possible.jfif')`;
      } else if (weather_text == "Cloudy") {
        document.getElementsByTagName(
          "body"
        )[0].style.backgroundImage = `url('images/cloudy2.jfif')`;
      } else {
        document.getElementsByTagName(
          "body"
        )[0].style.backgroundImage = `url('images/636070138268132665-ThinkstockPhotos-491701259.webp')`;
      }
    } else {
      alert("some error");
    }
  };
  weather_xhr.send();
}
function get_forecast_details(city) {
  let forecast_xhr = new XMLHttpRequest();
  if (city == "") {
    forecast_xhr.open(
      "GET",
      "https://api.weatherapi.com/v1/forecast.json?key=5033a3357e7c4a27879111340221807&q=Jaipur&days=1&aqi=yes&alerts=no",
      true
    );
  } else {
    forecast_xhr.open(
      "GET",
      `https://api.weatherapi.com/v1/forecast.json?key=5033a3357e7c4a27879111340221807&q=${city}&days=1&aqi=yes&alerts=no`,
      true
    );
  }
  let weather_forcast_obj;
  forecast_xhr.onload = function () {
    if (this.status === 200) {
      weather_forcast_obj = JSON.parse(this.responseText);
      let forecast_by_hr = weather_forcast_obj.forecast.forecastday[0].hour;
      let html = ``;
      for (let i = 0; i < forecast_by_hr.length; i++) {
        let icon_code;
        let icon_time;
        // console.log(forecast_by_hr[i].condition.code)
        for (let j = 0; j < codes.length; j++) {
          if (codes[j].code === forecast_by_hr[i].condition.code) {
            if (forecast_by_hr[i].is_day == 1) {
              icon_code = codes[j].icon;
              icon_time = "day";
            } else {
              icon_code = codes[j].icon;
              icon_time = "night";
            }
            // console.log('Found')
          }
        }
        html += `<div class="card" id="hour_${i}" style="aligh_items:center;font-family:'Aclonica', sans-serif;">${forecast_by_hr[
          i
        ].time.slice(11)}
                    <div class="card-body">
                    <img src="images/${icon_time}/${icon_code}.png" style="height:30px; width:30px; ">
                        <h2 class="card-title" style="text-align:center;font-family:'Aclonica', sans-serif;">${
                          forecast_by_hr[i].temp_c
                        }°C</h2><br>
                        <p style="font-family:'Aclonica', sans-serif;">${
                          forecast_by_hr[i].wind_kph
                        }kmph</p>
                        <p style="font-family:'Aclonica', sans-serif;">AT ${
                          forecast_by_hr[i].wind_degree
                        }°</p>
                    </div>
                    </div>`;
      }
      document.getElementById("day_forecast_container").innerHTML = html;
      for (let i = 0; i < forecast_by_hr.length; i++) {
        document.getElementById(`hour_${i}`).style.marginLeft = "100px";
      }
    } else {
      console.log("Error");
    }
  };

  forecast_xhr.send();
}
