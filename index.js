import { codes } from "./codes.js";
window.onload = function () {
  if (localStorage.getItem('home_city')==null){
    localStorage.setItem("home_city", "");
  }else{

    let home_city=localStorage.getItem("home_city")
    let add_city;
    if(home_city=="" || home_city==undefined || home_city=='undefined'){
      add_city=prompt('Enter your home city:')
        let body=document.getElementsByTagName('body');
        body=body[0]
        body.style.fliter='blur(30px)';
        localStorage.setItem('home_city',`${add_city}`)
        body.innerHTML='<h1>Reload and add a city to continue</h1>'
    }else{
      let city = localStorage.home_city;
      get_weather_details(city);
      get_forecast_details(city);
    }
  }
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
      "https://api.weatherapi.com/v1/current.json?key=5033a3357e7c4a27879111340221807&q=Jaipur&days=1&aqi=yes&alerts=no",
      true
    );
  } else {
    weather_xhr.open(
      "GET",
      `https://api.weatherapi.com/v1/current.json?key=5033a3357e7c4a27879111340221807&q=${city}&days=1&aqi=yes`,
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
      let current_time = document.getElementById("current_time");
      current_time.innerText = `${weather_obj.location.localtime.slice(11)}`;
      document.getElementById(
        "city"
      ).innerText = `${weather_obj.location.name}, ${weather_obj.location.region}`;
      let table = document.getElementById("weather_info_table");
      table.innerHTML = `
      <tr class="table_content_row_1">
      <tr class="table_content_inner_row_1">
      <td id="real_feel">Real Feels</td>
      <td id="humidity">Humidity</td>
      </tr>
      <tr class="table_content_inner_row_2">
      <td id="real_feel_value">${weather_obj.current.feelslike_c}°C</td>
      <td id="humidity_value">${weather_obj.current.humidity}%</td>
      </tr>
      </tr>
      <tr class="table_content_row_1">
      <tr class="table_content_inner_row_1">
      <td id="chance_of_rain">Chances of Rain</td>
      <td id="pressure">Pressure</td>
      </tr>
      <tr class="table_content_inner_row_2">
      <td id="chances_of_rain_value"></td>
      <td id="pressure_value">${weather_obj.current.pressure_mb} mbar</td>
      </tr>
      </tr>
      <tr class="table_content_row_1">
      <tr class="table_content_inner_row_1">
      <td id="wind_speed">Wind Speed</td>
      <td id="uv_index">UV Index</td>
      </tr>
      <tr class="table_content_inner_row_2">
      <td id="wind_speed_value">${weather_obj.current.wind_kph}km/h</td>
      <td id="uv_index">${weather_obj.current.uv}</td>
      </tr>
      </tr>
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
      } else if (
        weather_text == "Moderate or heavy rain shower" ||
        weather_text == "Moderate rain"
      ) {
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
      } else if (weather_text == "Light rain") {
        document.getElementsByTagName(
          "body"
        )[0].style.backgroundImage = `url('images/bg/Overcast.jpg')`;
      } else if (weather_text == "Mist") {
        document.getElementsByTagName(
          "body"
        )[0].style.backgroundImage = `url('images/bg/mist.webp')`;
      } else {
        document.getElementsByTagName(
          "body"
        )[0].style.backgroundImage = `url('images/636070138268132665-ThinkstockPhotos-491701259.webp')`;
      }
    } else {
      alert("some error");
      localStorage.setItem("home_city", "");
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
        
        for (let j = 0; j < codes.length; j++) {
          if (codes[j].code === forecast_by_hr[i].condition.code) {
            if (forecast_by_hr[i].is_day == 1) {
              icon_code = codes[j].icon;
              icon_time = "day";
            } else {
              icon_code = codes[j].icon;
              icon_time = "night";
            }
        
          }
        }
        let date = new Date();
        let hour = date.getHours();
        if (i == hour) {
          let chance_of_rain = document.getElementById("chances_of_rain_value");
          chance_of_rain.innerHTML = `${forecast_by_hr[i].chance_of_rain}%`;
        }

        html += `<div class="card" id="hour_${i}" style="align_items:center;font-family:'Aclonica', sans-serif;margin:25px 0;">${forecast_by_hr[
          i
        ].time.slice(11)}
                    <div class="card-body">
                    <img src="images/${icon_time}/${icon_code}.png" style="height:30px; width:30px; ">
                        <h2 class="card-title" 
                        style="text-align:center;padding-top:5px;font-family:'Aclonica', sans-serif;justify-content:center;">${
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
        document.getElementById(`hour_${i}`).style.marginLeft = "60px";
        document.getElementById(`hour_${i}`).style.marginRight = "60px";
      }
    } else {
      console.log("Error");
      localStorage.setItem('home_city','')
      
    }
  };

  forecast_xhr.send();
}
