import axios from 'axios';

export default class GeoLocation {
  static #DEFAULT_PARAMS = {
    count: 10,
    format: 'json',
    language: 'en',
  };
  static #DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
  };
  static getPlace(params = {}) {
    const URL = `https://geocoding-api.open-meteo.com/v1/search`;

    const PARAMS = Object.assign(GeoLocation.#DEFAULT_PARAMS, params);
    return axios.get(URL, {
      params: PARAMS,
      headers: GeoLocation.#DEFAULT_HEADERS,
    });
  }
}
