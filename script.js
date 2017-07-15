let get_weather = (data) => {
  $("#location").text(data.timezone);
  let celsius = (data.currently.temperature - 32) /1.8
  $("#temperature").text(Math.floor(celsius) + " °C")
  $("#weather-summary").html(data.currently.summary)

  let icon_mapping = {
    "clear-day": "2",
    "clear-night": "3",
    "rain": "18",
    "snow": "24",
    "sleet": "23",
    "wind": "6",
    "fog": "13",
    "cloudy": "14",
    "partly-cloudy-day": "8",
    "partly-cloudy-night": "9"
  }

  let icon_api = data.currently.icon
  let icon_svg = icon_mapping[icon_api]

  $('#weather-icon').append('<img src="/icons/6.svg">')
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
