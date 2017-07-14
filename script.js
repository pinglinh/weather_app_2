let get_weather = (data) => {
  $("#location").text(data.timezone);
  let celsius = (data.currently.temperature - 32) /1.8
  $("#temperature").text(Math.floor(celsius) + " °C")
  $("#weather-summary").html(data.currently.summary)
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
