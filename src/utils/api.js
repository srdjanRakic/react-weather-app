import axios from 'axios';
const baseURL = 'http://api.openweathermap.org/data/2.5/';
const apiKey = 'b714ec74bbab5650795063cb0fdf5fbe';

export function prepRouteParams(queryStringData) {
  return Object.keys(queryStringData).map(key =>
     key + '=' + encodeURIComponent(queryStringData[key])).join('&');
}

export function prepUrl(type, queryStringData) {
  return baseURL + type + '?' + prepRouteParams(queryStringData);
}

export function getQueryStringData(city) {
  return {
    q: city,
    units: 'metric',
    APPID: apiKey,
    cnt: 7
  }
}

export function getCurrentWeather(city) {
  let queryStringData = getQueryStringData(city);
  let url = prepUrl('weather', queryStringData)

  return axios.get(url).then(currentWeatherData => currentWeatherData.data)
}

export function getForecast (city) {
  let queryStringData = getQueryStringData(city);
  let url = prepUrl('forecast/daily', queryStringData)

  return axios.get(url).then(forecastData => forecastData.data)
}