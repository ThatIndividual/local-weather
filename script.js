var weather = {},
    currMeasure = 0;

function roundTo(num, place) {
  return +num.toFixed(place);
}

$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(posToURL);
  $("#change").click(changeMeasure);
});

function posToURL(position) {
  const lat = position.coords.latitude,
  lon = position.coords.longitude;

  const url = "https://api.wunderground.com/api/35bb4421c6812f99/forecast/q/" +
    roundTo(lat, 2) + "," + roundTo(lon, 2) + ".json";

  $.getJSON(url, parseWeather);
}

function parseWeather(data) {
  var day = data.forecast.simpleforecast.forecastday[0];
  weather = {
    weekday: day.date.weekday,
    day: day.date.day,
    high: {
      f: day.high.fahrenheit,
      c: day.high.celsius
    },
    low: {
      f: day.low.fehrenheit,
      c: day.low.celsius
    },
    icon: day.icon,
  };
  renderWeather(weather, currMeasure);
}

function renderWeather(weather, measure) {
  $("#day").text(weather.day);
  $("#weekday").text(weather.weekday);
  $("#icon").html("<i class=\"wi wi-wu-" + weather.icon + "\"></i>");

  if (measure === 0) {
    $("#low").text(weather.low.c);
    $("#high").text(weather.high.c);
    $(".measure").text("°C");
    $("#altMeasure").text("°F");
  }
  else {
    $("#low").text(weather.low.f);
    $("#high").text(weather.high.f);
    $(".measure").text("°F");
    $("#altMeasure").text("°C");
  }
}

function changeMeasure() {
  if (currMeasure === 0) {
    renderWeather(weather, 1);
    currMeasure = 1;
  }
  else {
    renderWeather(weather, 0);
    currMeasure = 0;
  }
}