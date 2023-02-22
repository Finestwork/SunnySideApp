import axios from 'axios';

export default class Weather {
  static #DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
  };

  static getWeather(params = {}) {
    const URL = `https://api.open-meteo.com/v1/forecast`;

    const PARAMS = Object.assign({}, params);
    return axios.get(URL, {
      params: PARAMS,
      headers: Weather.#DEFAULT_HEADERS,
    });
  }
}
