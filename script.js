let get_weather = (data) => {
  $("#location").html(`<span class="fa fa-map-marker"></span> ` +data.timezone);
  let celsius = (data.currently.temperature - 32) / 1.8
  // $("#temperature").text(Math.floor(celsius) + " °C")

  $("#temperature").html(`<span class="fa fa-thermometer"></span> ` + Math.floor(celsius) + " °C")

  let icon_mapping = {
    "clear-day": "wi-day-sunny",
    "clear-night": "wi-night-clear",
    "rain": "wi-rain",
    "snow": "wi-snow",
    "sleet": "wi-sleet",
    "wind": "wi-windy",
    "fog": "wi-fog",
    "cloudy": "wi-cloudy",
    "partly-cloudy-day": "wi-day-cloudy",
    "partly-cloudy-night": "wi-night-alt-cloudy"
  }

  let icon_api_current = data.currently.icon
  let icon_font_current = icon_mapping[icon_api_current]

  $('#weather-icon-current').html(
    `
    <div class="label">Currently</div>
    <i class="wi ${icon_font_current}"></i>
    `)

  let icon_api_later = data.daily.icon
  let icon_font_later = icon_mapping[icon_api_later]

  $('#weather-icon-later').html(
    `
    <div class="label">Later</div>
    <i class="wi ${icon_font_later}"></i>
    `)

  $("#weather-summary").html(`<span class="fa fa-angle-double-right"></span>` + data.hourly.summary)

  let icon_to_clothing_description = {
    "wi-day-sunny": "Wear a sunscreen.",
    "wi-night-clear": "Enjoy your evening.",
    "wi-rain": "Bring an umbrella.",
    "wi-snow": "Wear a scarf and a pair of gloves.",
    "wi-sleet": "Bring an umbrella and wear something woolly.",
    "wi-windy": "Wear a hoodie.",
    "wi-fog": "Erm, be careful of the roads.",
    "wi-cloudy": "Enjoy your day.",
    "partly-cloudy-day": "Enjoy your day.",
    "partly-cloudy-night": "Enjoy your evening."
  }

  let clothing_advise = icon_to_clothing_description[icon_font_later]

  $("#clothing-advise").html(`
    ${clothing_advise}
    `)
}

let get_location = (lat, lon) => {
  let key = "6fcaa5837756eefff17aa53ab53a2d1c";
  // let latNumber = lat.coords.latitude;
  // let lonNumber = lon.coords.longitude;
  let url = `https://api.darksky.net/forecast/${key}/${lat},${lon}`;
  return url;
}

let current_position = (position) => {
  let url = get_location(
    position.coords.latitude,
    position.coords.longitude
  );
  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: get_weather
  })
  // $.getJSON(url, get_weather)
}

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(current_position);
  }
  else {
    var url = "https://api.darksky.net/forecast/6fcaa5837756eefff17aa53ab53a2d1c/51.5074,0.1278"
    $.ajax({
    url: url,
    dataType: 'jsonp',
    success: get_weather
  })
    // $.getJSON(url, get_weather);
  }
